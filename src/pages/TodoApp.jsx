import React, { useLayoutEffect, useRef } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import gsap from "gsap";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function TodoApp() {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const gsapContext = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useLayoutEffect(() => {
    gsapContext.current = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.to(titleRef.current, {
        opacity: 1,
        scale: 2,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
      });
    });
    return () => gsapContext.current.revert();
  }, []);

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
      <Button text="Se Déconnecter" onClick={handleLogout} />
      </div>
      <h1 ref={titleRef}>Ma To-Do List</h1>
      <ul ref={listRef} style={{ listStyle: "none", padding: 0 }}>
        <li
          style={{
            margin: "10px 0",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: darkMode ? "#ddd" : "#222",
            color: darkMode ? "#000" : "#fff",
          }}
        >
          Tâche 1
        </li>
        <li
          style={{
            margin: "10px 0",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: darkMode ? "#ddd" : "#222",
            color: darkMode ? "#000" : "#fff",
          }}
        >
          Tâche 2
        </li>
        <li
          style={{
            margin: "10px 0",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: darkMode ? "#ddd" : "#222",
            color: darkMode ? "#000" : "#fff",
          }}
        >
          Tâche 3
        </li>
      </ul>
    </div>
  );
}

export default TodoApp;
