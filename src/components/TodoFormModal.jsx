import { useState } from "react";
import Modal from "./Modal";
import { PRIORITIES, STATUSES } from "../utils/meta";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoFormModal({ todo, onClose, onSubmit }) {
  const isEdit = Boolean(todo);
  const [form, setForm] = useState(
    todo
      ? {
          title: todo.title,
          description: todo.description,
          status: todo.status,
          priority: todo.priority,
          deadline: todo.deadline,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.title.trim()) next.title = "Judul wajib diisi";
    if (!form.deadline) next.deadline = "Pilih tanggal deadline";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <Modal title={isEdit ? "Update Todo" : "Tambah Todo"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Judul</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={setField("title")}
            placeholder="Contoh: Menyelesaikan laporan praktikum"
            autoFocus
            className={errors.title ? "invalid" : ""}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={setField("description")}
            placeholder="Tulis detail tugas di sini"
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" value={form.status} onChange={setField("status")}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="priority">Prioritas</label>
            <select
              id="priority"
              value={form.priority}
              onChange={setField("priority")}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            value={form.deadline}
            onChange={setField("deadline")}
            className={errors.deadline ? "invalid" : ""}
          />
          {errors.deadline && <span className="error">{errors.deadline}</span>}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Simpan perubahan" : "Tambah"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
