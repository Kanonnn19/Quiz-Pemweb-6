export const STATUSES = ["to-do", "in progress", "done"];
export const PRIORITIES = ["low", "medium", "high"];

export const statusClass = {
  "to-do": "status-todo",
  "in progress": "status-progress",
  done: "status-done",
};

export const priorityLevel = {
  low: 1,
  medium: 2,
  high: 3,
};

export const FILTERS = [
  { value: "semua", label: "Semua" },
  { value: "to-do", label: "To-do" },
  { value: "in progress", label: "In progress" },
  { value: "done", label: "Done" },
];
