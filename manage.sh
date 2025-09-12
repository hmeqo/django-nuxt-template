#!/usr/bin/bash

set -e

cd "$(dirname "${BASH_SOURCE[0]}")" || exit

[ -f .env ] && . .env

BASE_DIR=$(pwd)

SERVICE_NAME="${SERVICE_NAME:-"website"}"
SESSION_NAME="${SESSION_NAME:-"$SERVICE_NAME-dev"}"

BACKEND_PATH="${BACKEND_PATH:-"$BASE_DIR/backend"}"

FRONTEND_PATH="${FRONTEND_PATH:-"$BASE_DIR/frontend"}"
FRONTEND_APPS=$(ls "${FRONTEND_APPS_DIR:-"$FRONTEND_PATH/apps"}")

# database

backupdb() {
    cd "$BACKEND_PATH" || exit
    echo "Backing up database..."
    uv run ./manage.py dbbackup --clean
    uv run ./manage.py mediabackup --clean
    echo "Backup complete!"
}

# sync

sync_backend() {
    cd "$BACKEND_PATH" || exit
    uv sync --frozen --group=db --group=prod
    uv run ./manage.py migrate
    uv run ./manage.py compilemessages --ignore=.venv
    uv run ./manage.py collectresources --all
}

sync_frontend() {
    cd "$FRONTEND_PATH" || exit
    pnpm install --frozen-lockfile
    pnpm build
}

sync() {
    sync_frontend
    sync_backend
}

# launch scripts

dev() {
    BACKEND_PORT=${BACKEND_PORT:-"8000"}
    FRONTEND_PORT=${FRONTEND_PORT:-"3000"}

    tmux new-session -d -s "$SESSION_NAME" -n backend -c backend -e APP_PORT="$BACKEND_PORT"

    local frontend_no=1
    local i=0
    for app in $FRONTEND_APPS; do
        tmux new-window -t "$SESSION_NAME:$((i + frontend_no))" -n "frontend:$app" -c frontend -e PORT=$((FRONTEND_PORT + i)) -e NUXT_PUBLIC_API_BASE="http://127.0.0.1:$BACKEND_PORT/api"
        i=$((i + 1))
    done

    sleep 0.5

    tmux send-keys -t "$SESSION_NAME:0" 'uv run dev' C-m

    local i=0
    for app in $FRONTEND_APPS; do
        tmux send-keys -t "$SESSION_NAME:$((i + frontend_no))" "pnpm dev:$app" C-m
        i=$((i + 1))
    done

    tmux attach -t "$SESSION_NAME"
}

serve_backend() {
    cd "$BACKEND_PATH" || exit
    uv run serve &
    wait
}

serve_frontend() {
    cd "$FRONTEND_PATH" || exit
    for app in $FRONTEND_APPS; do
        pnpm "serve:$app" &
    done
    wait
}

serve() {
    serve_backend &
    serve_frontend &
    wait
}

# extra commands

[ -d "$BASE_DIR"/scripts ] &&
for f in "$BASE_DIR"/scripts/*; do
    [[ ".sh" == "${f##*.}" ]] && source "$f"
done

"$@"
