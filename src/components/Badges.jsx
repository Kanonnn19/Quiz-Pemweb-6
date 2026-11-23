import { CalendarDays } from "lucide-react";
import { priorityLevel, statusClass } from "../utils/meta";
import { deadlineState, formatDate } from "../utils/date";

export function StatusBadge({ status }) {
  return (
    <span className={`badge ${statusClass[status]}`}>
      <span className="dot" />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const level = priorityLevel[priority];
  return (
    <span className={`priority priority-${priority}`}>
      <span className="bars" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i
            key={n}
            className={n <= level ? "on" : ""}
            style={{ height: 4 + n * 3 }}
          />
        ))}
      </span>
      {priority}
    </span>
  );
}

export function DeadlineChip({ todo }) {
  const state = deadlineState(todo);
  const label =
    state === "overdue" ? "Terlambat" : state === "today" ? "Hari ini" : null;
  return (
    <span className={`deadline deadline-${state}`} title={todo.deadline}>
      <CalendarDays size={14} />
      {formatDate(todo.deadline)}
      {label && <em>{label}</em>}
    </span>
  );
}
