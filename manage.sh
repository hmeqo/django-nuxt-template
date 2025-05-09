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
    uv run ./manage.py collectresources --clear --all
    cd ..
}

sync_frontend() {
    cd frontend || exit
    pnpm install --frozen-lockfile
    pnpm build

    cd ../backend || exit
    uv run ./manage.py collectresources --all
    cd ..
}

sync() {
    sync_backend
    sync_frontend
}

# batch

start_backend() {
    cd backend || exit
    uv run serve
    cd ..
}

start_frontend() {
    cd frontend || exit
    env $(cat .env) node .output/server/index.mjs
    cd ..
}

stop_frontend() {
    if pgrep -f 'node .output/server/index.mjs'; then
        pkill -f 'node .output/server/index.mjs'
    fi
    wait
}

stop_backend() {
    if pgrep -f granian; then
        pkill -f granian
    fi
    wait
}

stop() {
    stop_frontend &
    stop_backend &
    wait
}

start() {
    start_backend &
    start_frontend &
    wait
}

start_bg() {
    start_backend &
    disown %1
    start_frontend &
    disown %1
}

restart() {
    stop
    start
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
    tmux new-session -d -s dev -n backend
    tmux new-window -t dev:1 -n frontend

    sleep 0.5

    tmux send-keys -t dev:0 'cd backend' C-m
    tmux send-keys -t dev:0 'uv run dev' C-m

    tmux send-keys -t dev:1 'cd frontend' C-m
    tmux send-keys -t dev:1 'pnpm dev' C-m

    tmux attach -t dev
}

deploy() {
    sync
    install_service
    restart_service
}

cd "$(dirname "${BASH_SOURCE[0]}")" || exit

"$@"
