import { Trash2 } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmModal({ todo, onCancel, onConfirm }) {
  return (
    <Modal title="Hapus tugas?" onClose={onCancel} size="small">
      <div className="confirm-body">
        <span className="confirm-icon">
          <Trash2 size={22} />
        </span>
        <p>
          Tugas <strong>{todo.title}</strong> akan dihapus dan tidak bisa
          dikembalikan.
        </p>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Batal
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Hapus tugas
        </button>
      </div>
    </Modal>
  );
}
