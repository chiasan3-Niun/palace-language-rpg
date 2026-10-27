export function renderFeedback(message, tone = 'neutral') {
  if (!message) return '';
  return `<div class="feedback ${tone}" role="status">${message}</div>`;
}
