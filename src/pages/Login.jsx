import React, { useState, useLayoutEffect, useRef } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import gsap from "gsap";
import Button from "../components/Button";
import Cookies from "js-cookie";

function Login() {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login(email, password);
      if (response.token) {
        navigate("/todo-app");
      } else {
        setError(response.message || "Erreur lors de la connexion");
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
      <h1 ref={titleRef}>Connexion</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "250px" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "250px" }}
        />
        <Button text="Se connecter" type="submit" />
      </form>
      <p>
        Pas encore inscrit ? <a href="/register">S'inscrire</a>
      </p>
    </div>
  );
}
export default Login;
