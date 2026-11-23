function ConfirmDelete({ todo, onCancel, onConfirm }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Hapus Tugas</h2>
        <p className="confirm-text">
          Yakin ingin menghapus tugas <b>{todo.title}</b>?
        </p>
        <div className="buttons">
          <button className="btn gray" onClick={onCancel}>
            Batal
          </button>
          <button className="btn red" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
