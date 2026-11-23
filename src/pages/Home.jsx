import { useState } from "react";
import { Link } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import ConfirmDelete from "../components/ConfirmDelete";
import { EyeIcon, TrashIcon } from "../components/Icons";

function Home({ todos, addTodo, deleteTodo }) {
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const today = new Date().toLocaleDateString("en-CA");

  function handleAdd(data) {
    addTodo(data);
    setShowForm(false);
  }

  function handleDelete() {
    deleteTodo(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1>Todo List</h1>
          <p className="subtitle">{todos.length} tugas</p>
        </div>
        <button className="btn blue" onClick={() => setShowForm(true)}>
          Tambah Todo
        </button>
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              const telat = todo.status !== "done" && todo.deadline < today;
              return (
                <tr key={todo.id}>
                  <td>
                    <div className="title-text" title={todo.title}>
                      {todo.title}
                    </div>
                  </td>
                  <td>
                    <span className={"status " + todo.status.replace(" ", "-")}>
                      {todo.status}
                    </span>
                  </td>
                  <td>
                    <span className={"priority " + todo.priority}>
                      {todo.priority}
                    </span>
                  </td>
                  <td className={telat ? "late" : ""}>{todo.deadline}</td>
                  <td className="center">
                    <Link to={"/todo/" + todo.id} className="icon-btn blue">
                      <EyeIcon />
                    </Link>
                    <button
                      className="icon-btn red"
                      onClick={() => setDeleteTarget(todo)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {todos.length === 0 && (
          <p className="empty">Belum ada tugas. Klik Tambah Todo untuk membuat.</p>
        )}
      </div>

      {showForm && (
        <TodoForm onClose={() => setShowForm(false)} onSave={handleAdd} />
      )}

      {deleteTarget && (
        <ConfirmDelete
          todo={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Home;
