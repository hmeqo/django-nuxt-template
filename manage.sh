#!/usr/bin/bash

set -e

# database

backupdb() {
    echo "Backing up database..."
    cd backend || exit
    uv run ./manage.py dbbackup --clean
    uv run ./manage.py mediabackup --clean
    cd ..
    echo "Backup complete!"
}

# sync

sync_backend() {
    cd backend || exit
    uv sync --frozen --group=types --group=cache --group=postgresql --group=prod
    uv run ./manage.py migrate
    uv run ./manage.py compilemessages --ignore=.venv
    uv run ./manage.py collectresources --all
    cd ..
}

sync_frontend() {
    cd frontend || exit
    pnpm install --frozen-lockfile
    pnpm build
    cd ..
}

sync() {
    sync_frontend
    sync_backend
}

# batch

start_backend() {
    cd backend || exit
    uv run serve
    cd ..
}

start_frontend() {
    cd frontend/apps/admin || exit
    env $(cat .env) node .output/server/index.mjs
    cd ../../..
}

start() {
    start_backend &
    start_frontend &
    wait
}

# service

install_service() {
    sudo bash -c "
        cp -f ./website.service /etc/systemd/system/website.service
        systemctl daemon-reload
        systemctl enable website
    "
}

uninstall_service() {
    sudo bash -c "
        systemctl disable website
        rm /etc/systemd/system/website.service
        systemctl daemon-reload
    "
}

start_service() {
    sudo systemctl start website
}

stop_service() {
    sudo systemctl stop website
}

restart_service() {
    sudo systemctl restart website
}

# launch scripts

dev() {
    local session_name="dev"
    local backend_port=8000
    local frontend_port=3000

    while getopts ":n:b:f:" opt; do
        case $opt in
        n)
            session_name="$OPTARG"
            ;;
        b)
            backend_port="$OPTARG"
            ;;
        f)
            frontend_port="$OPTARG"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
        :)
            echo "Option -$OPTARG requires an argument." >&2
            exit 1
            ;;
        esac
    done

    tmux new-session -d -s $session_name -n backend -c backend -e DJANGO_PORT=$backend_port
    tmux new-window -t $session_name:1 -n frontend -c frontend -e PORT=$frontend_port -e NUXT_PUBLIC_API_BASE=http://127.0.0.1:$backend_port

    sleep 0.5

    tmux send-keys -t $session_name:0 'uv run dev' C-m
    tmux send-keys -t $session_name:1 'pnpm dev:admin' C-m

    tmux attach -t $session_name
}

deploy() {
    sync
    install_service
    restart_service
}

cd "$(dirname "${BASH_SOURCE[0]}")" || exit

"$@"
