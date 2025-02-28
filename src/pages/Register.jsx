import React, { useState, useLayoutEffect, useRef } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import gsap from "gsap";
import Button from "../components/Button";
import Cookies from "js-cookie";

function Register() {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await register(username, password);

      if (response.data) {
        navigate("/todo-app");
      } else {
        setError(response.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer plus tard.");
    }
  };

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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "250px" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "250px" }}
        />
        <Button text="S'inscrire" type="submit" />
      </form>
      <p>
        Déjà inscrit ? <a href="/login">Se connecter</a>
      </p>
    </div>
  );
}

export default Register;
