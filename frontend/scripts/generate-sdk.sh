#!/usr/bin/bash

[ -f .env ] && . .env

BASE_DIR=$(pwd)

SDK_PATH="${SDK_PATH:-packages/backend/lib/sdk}"
SCHEMA_PATH="${SCHEMA_PATH:-$SDK_PATH/schema.json}"
BACKEND_PATH="${BACKEND_PATH:-../backend}"

if [ -e "$SDK_PATH" ]; then
    rm -rf "$SDK_PATH"
fi

cd "$BACKEND_PATH" || exit
uv run $BACKEND_PATH/manage.py exportschema "../frontend/$SCHEMA_PATH"
cd "$BASE_DIR"

pnpm run openapi -i "$SCHEMA_PATH" --exportSchemas true -o "$SDK_PATH"

pnpm postinstall
