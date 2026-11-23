import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";

function TodoDetail({ todos, updateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="detail">
        <p>Tugas tidak ditemukan.</p>
        <Link to="/" className="btn blue">
          Kembali
        </Link>
      </div>
    );
  }

  function handleUpdate(data) {
    updateTodo(todo.id, data);
    setShowEdit(false);
  }

  return (
    <div className="detail">
      <div className="detail-left">
        <h3>Judul</h3>
        <p>{todo.title}</p>

        <h3>Deskripsi</h3>
        <p className="desc-box">{todo.description}</p>
      </div>

      <div className="detail-right">
        <h3>Status</h3>
        <p>
          <span className={"status " + todo.status.replace(" ", "-")}>
            {todo.status}
          </span>
        </p>

        <h3>Prioritas</h3>
        <p>
          <span className={"priority " + todo.priority}>{todo.priority}</span>
        </p>

        <h3>Deadline</h3>
        <p>{todo.deadline}</p>

        <div className="buttons">
          <button className="btn red" onClick={() => navigate("/")}>
            Kembali
          </button>
          <button className="btn blue" onClick={() => setShowEdit(true)}>
            Update
          </button>
        </div>
      </div>

      {showEdit && (
        <TodoForm
          todo={todo}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default TodoDetail;
