import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Button from "../components/Button";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/api";

function TodoApp() {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const gsapContext = useRef(null);

  const token = localStorage.getItem("token");

  const refreshTodos = async () => {
    try {
      const response = await getTodos(token);
      if (response && Array.isArray(response)) {
        setTodos(response);
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des todos :", error);
    }
  };

  useEffect(() => {
    refreshTodos();
  }, [token]);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      await createTodo(token, newTodo);
      setNewTodo("");
      refreshTodos();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTodo(token, id, "", !completed);
      refreshTodos();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(token, id);
      refreshTodos();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  useLayoutEffect(() => {
    gsapContext.current = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: -20,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (listRef.current && listRef.current.children.length > 0) {
        gsap.from([...listRef.current.children], {
          opacity: 0,
          y: 10,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });

    return () => gsapContext.current.revert();
  }, [todos]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: darkMode ? "#fff" : "#000",
        color: darkMode ? "#000" : "#fff",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <Button
          text={darkMode ? "🌞" : "🌙"}
          onClick={() => setDarkMode((prev) => !prev)}
        />
      </div>
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <Button
          text="Se déconnecter"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      </div>

      <h1 ref={titleRef}>Ma To-Do List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ajouter une tâche..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "solid",
            outline: "none",
            width: "250px",
            marginRight: "10px",
          }}
        />
        <Button text="➕ Ajouter" onClick={handleAddTodo} />
      </div>

      <ul ref={listRef} style={{ listStyle: "none", padding: 0, width: "50%" }}>
        {todos.map((todo) => (
          <li
            key={todo.id || todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: darkMode ? "#222" : "#ddd",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <span
              onClick={() =>
                handleToggleComplete(todo.id || todo._id, todo.completed)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontSize: "18px",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#bbb" : "inherit",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: "24px",
                  height: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: todo.completed ? "green" : "gray",
                  borderRadius: "5px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {todo.completed ? "✔" : "⬜"}
              </span>
              {todo.title}
            </span>

            <button
              onClick={() => handleDeleteTodo(todo.id || todo._id)}
              style={{
                background: darkMode ? "white" : "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
