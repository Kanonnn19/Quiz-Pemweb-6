import { Link, useNavigate } from "react-router-dom";
import { Check, Eye, Trash2 } from "lucide-react";
import { useTodos } from "../context/TodoContext";
import { DeadlineChip, PriorityBadge, StatusBadge } from "./Badges";

export default function TodoTable({ todos, onDelete }) {
  const navigate = useNavigate();
  const { toggleDone } = useTodos();

  return (
    <div className="table-wrap">
      <div className="table" role="table">
        <div className="row row-head" role="row">
          <span role="columnheader" />
          <span role="columnheader">Judul</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Prioritas</span>
          <span role="columnheader">Deadline</span>
          <span role="columnheader" className="align-right">
            Aksi
          </span>
        </div>

        {todos.map((todo) => (
          <div
            key={todo.id}
            role="row"
            className={`row ${todo.status === "done" ? "is-done" : ""}`}
          >
            <span role="cell">
              <button
                type="button"
                className={`check ${todo.status === "done" ? "checked" : ""}`}
                aria-label={
                  todo.status === "done"
                    ? "Buka kembali tugas"
                    : "Tandai tugas selesai"
                }
                onClick={() => toggleDone(todo.id)}
              >
                <Check size={14} strokeWidth={3} />
              </button>
            </span>
            <span role="cell" className="cell-title">
              <Link to={`/todo/${todo.id}`} title={todo.title}>
                {todo.title}
              </Link>
            </span>
            <span role="cell">
              <StatusBadge status={todo.status} />
            </span>
            <span role="cell">
              <PriorityBadge priority={todo.priority} />
            </span>
            <span role="cell">
              <DeadlineChip todo={todo} />
            </span>
            <span role="cell" className="actions">
              <button
                type="button"
                className="action action-view"
                aria-label={`Lihat detail ${todo.title}`}
                onClick={() => navigate(`/todo/${todo.id}`)}
              >
                <Eye size={16} />
              </button>
              <button
                type="button"
                className="action action-delete"
                aria-label={`Hapus ${todo.title}`}
                onClick={() => onDelete(todo)}
              >
                <Trash2 size={16} />
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
