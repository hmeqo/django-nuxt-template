export const isTauri = import.meta.client ? '__TAURI_INTERNALS__' in window : false
