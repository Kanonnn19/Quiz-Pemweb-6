import { useState } from "react";
import { Link } from "react-router-dom";
import { GripVertical, Trash2 } from "lucide-react";
import { useTodos } from "../context/TodoContext";
import { STATUSES, statusClass } from "../utils/meta";
import { DeadlineChip, PriorityBadge } from "./Badges";

export default function KanbanBoard({ todos, onDelete }) {
  const { moveTodo } = useTodos();
  const [dragId, setDragId] = useState(null);
  const [overColumn, setOverColumn] = useState(null);

  const handleDrop = (status) => {
    if (dragId !== null) moveTodo(dragId, status);
    setDragId(null);
    setOverColumn(null);
  };

  return (
    <div className="board">
      {STATUSES.map((status) => {
        const items = todos.filter((t) => t.status === status);
        return (
          <section
            key={status}
            className={`column ${overColumn === status ? "over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOverColumn(status);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOverColumn(null);
            }}
            onDrop={() => handleDrop(status)}
          >
            <header className={`column-head ${statusClass[status]}`}>
              <span className="dot" />
              <h3>{status}</h3>
              <span className="count">{items.length}</span>
            </header>

            <div className="column-body">
              {items.map((todo) => (
                <article
                  key={todo.id}
                  className={`card ${dragId === todo.id ? "dragging" : ""}`}
                  draggable
                  onDragStart={() => setDragId(todo.id)}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverColumn(null);
                  }}
                >
                  <div className="card-top">
                    <GripVertical size={14} className="grip" />
                    <Link to={`/todo/${todo.id}`} className="card-title">
                      {todo.title}
                    </Link>
                    <button
                      type="button"
                      className="card-delete"
                      aria-label={`Hapus ${todo.title}`}
                      onClick={() => onDelete(todo)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="card-desc">{todo.description}</p>
                  <div className="card-meta">
                    <PriorityBadge priority={todo.priority} />
                    <DeadlineChip todo={todo} />
                  </div>
                </article>
              ))}
              {items.length === 0 && (
                <p className="column-empty">Seret tugas ke sini</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
