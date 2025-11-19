export function formatDateTime(dateString) {
  const date = new Date(dateString)

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
