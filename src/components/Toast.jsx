import { CheckCircle2, Trash2, X } from "lucide-react";
import { useTodos } from "../context/TodoContext";

export default function ToastContainer() {
  const { toasts, dismissToast } = useTodos();

  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.type === "danger" ? <Trash2 size={18} /> : <CheckCircle2 size={18} />}
          <span>{t.message}</span>
          <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={() => dismissToast(t.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
