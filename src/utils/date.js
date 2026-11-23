export function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(iso) {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseISO(iso));
}

export function formatLongToday() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function daysLeft(iso) {
  const start = parseISO(todayISO());
  const end = parseISO(iso);
  return Math.round((end - start) / 86400000);
}

export function deadlineState(todo) {
  if (todo.status === "done") return "done";
  const diff = daysLeft(todo.deadline);
  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  return "upcoming";
}
