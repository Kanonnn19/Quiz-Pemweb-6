import { createContext, useCallback, useContext, useState } from "react";
import { dummyTodos } from "../data/dummyTodos";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addTodo = (data) => {
    const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos((prev) => [{ ...data, id: nextId }, ...prev]);
    notify("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    notify("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    notify("Tugas berhasil dihapus", "danger");
  };

  const moveTodo = (id, status) => {
    const target = todos.find((t) => t.id === id);
    if (!target || target.status === status) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    notify(`Dipindahkan ke ${status}`);
  };

  const toggleDone = (id) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    const status = target.status === "done" ? "to-do" : "done";
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    notify(status === "done" ? "Tugas ditandai selesai" : "Tugas dibuka kembali");
  };

  const value = {
    todos,
    toasts,
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
    toggleDone,
    dismissToast,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos harus dipakai di dalam TodoProvider");
  return ctx;
}
