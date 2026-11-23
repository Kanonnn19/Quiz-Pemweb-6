import { useState } from "react";

function TodoForm({ todo, onClose, onSave }) {
  const [form, setForm] = useState(
    todo || {
      title: "",
      description: "",
      status: "to-do",
      priority: "low",
      deadline: "",
    }
  );
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.title.trim() === "" || form.deadline === "") {
      setError("Judul dan deadline harus diisi");
      return;
    }
    onSave(form);
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>{todo ? "Update Todo" : "Tambah Todo"}</h2>

        <label>Judul</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Deskripsi</label>
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />

        <div className="two-col">
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="to-do">to-do</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
          </div>
          <div>
            <label>Prioritas</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>

        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <div className="buttons">
          <button type="button" className="btn red" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn blue">
            {todo ? "Update" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
