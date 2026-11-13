import { escapeHtml } from "../fn/format.js";

export function renderNotification(message, type = "info") {
  return `<div class="notification is-${type}">${escapeHtml(message)}</div>`;
}
