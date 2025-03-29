#!/usr/bin/bash

set -e

# database

backupdb() {
    echo "Backing up database..."
    cd server || exit
    uv run ./manage.py dbbackup --clean
    uv run ./manage.py mediabackup --clean
    cd ..
    echo "Backup complete!"
}

# sync

sync_server() {
    cd server || exit
    uv sync --frozen
    uv run ./manage.py migrate
    uv run ./manage.py compilemessages --ignore=.venv
    uv run ./manage.py collectstatic --noinput --clear -v=0
    cd ..
}

sync_client() {
    cd client || exit
    pnpm install --frozen-lockfile
    pnpm build

    cd ../server || exit
    uv run ./manage.py collectstatic --noinput -v=0
    cd ..
}

sync() {
    sync_server
    sync_client
}

# batch

start_server() {
    cd server || exit
    uv run serve
    cd ..
}

start_client() {
    cd client || exit
    node .output/server/index.mjs
    cd ..
}

stop_client() {
    if pgrep -f 'node .output/server/index.mjs'; then
        pkill -f 'node .output/server/index.mjs'
    fi
    wait
}

stop_server() {
    if pgrep -f granian; then
        pkill -f granian
    fi
    wait
}

stop() {
    stop_client &
    stop_server &
    wait
}

start() {
    start_server &
    start_client &
    wait
}

start_bg() {
    start_server &
    disown %1
    start_client &
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
    tmux new-session -d -s dev -n server 'cd server && uv run dev'
    tmux new-window -t dev:1 -n client 'cd client && pnpm dev'
    tmux attach -t dev
}

deploy() {
    sync
    install_service
    restart_service
}

cd "$(dirname "${BASH_SOURCE[0]}")" || exit

"$@"
