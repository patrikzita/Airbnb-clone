export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}
