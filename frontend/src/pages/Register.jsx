import React, { useLayoutEffect, useRef } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import gsap from "gsap";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const gsapContext = useRef(null);

  useLayoutEffect(() => {
    gsapContext.current = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 3,
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
        <Button text="Accueil" onClick={() => navigate("/")} />
      </div>
      <h1 ref={titleRef}>Inscription</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Nom"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#ddd" : "#222",
            color: darkMode ? "#000" : "#fff",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#ddd" : "#222",
            color: darkMode ? "#000" : "#fff",
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#ddd" : "#222",
            color: darkMode ? "#000" : "#fff",
          }}
        />
        <br />
        <Button text="S'inscrire" onClick={() => navigate("/todo-app")} />
      </form>
      <p style={{ marginTop: "20px" }}>
        Déjà un compte ?{" "}
        <a
          href="/login"
          style={{
            color: darkMode ? "#000" : "#fff",
            textDecoration: "underline",
          }}
        >
          Se connecter
        </a>
      </p>
    </div>
  );
}

export default Register;
