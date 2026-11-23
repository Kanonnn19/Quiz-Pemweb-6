import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dummyTodos } from "./data/dummyTodos";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [message, setMessage] = useState("");

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  }

  function addTodo(data) {
    setTodos([{ id: Date.now(), ...data }, ...todos]);
    showMessage("Tugas berhasil ditambahkan");
  }

  function updateTodo(id, data) {
    setTodos(todos.map((t) => (t.id === id ? data : t)));
    showMessage("Tugas berhasil diupdate");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
    showMessage("Tugas berhasil dihapus");
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<Home todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} />}
        />
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} updateTodo={updateTodo} />}
        />
      </Routes>

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default App;
