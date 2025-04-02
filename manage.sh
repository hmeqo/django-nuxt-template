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
    uv sync --frozen
    uv run ./manage.py migrate
    uv run ./manage.py compilemessages --ignore=.venv
    uv run ./manage.py collectstatic --noinput --clear -v=0
    cd ..
}

sync_frontend() {
    cd frontend || exit
    pnpm install --frozen-lockfile
    pnpm build

    cd ../backend || exit
    uv run ./manage.py collectstatic --noinput -v=0
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
    node .output/backend/index.mjs
    cd ..
}

stop_frontend() {
    if pgrep -f 'node .output/backend/index.mjs'; then
        pkill -f 'node .output/backend/index.mjs'
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
    tmux new-session -d -s dev -n backend 'cd backend && uv run dev'
    tmux new-window -t dev:1 -n frontend 'cd frontend && pnpm dev'
    tmux attach -t dev
}

deploy() {
    sync
    install_service
    restart_service
}

cd "$(dirname "${BASH_SOURCE[0]}")" || exit

"$@"
