export const isTauri = import.meta.client ? '__TAURI__' in window : false
