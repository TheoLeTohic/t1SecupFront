import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../components/Button";
import { useDarkMode } from "../context/DarkModeContext";

// Page d'accueil de l'application
function Home() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const gsapContext = useRef(null);
  const { darkMode, setDarkMode } = useDarkMode();

  // Gestion des animations des textes avec la librairie GSAP
  useLayoutEffect(() => {
    gsapContext.current = gsap.context(() => {
      gsap.set([titleRef.current, textRef.current], { opacity: 0 });

      gsap.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
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
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        {/* Bouton pour gérer l'état du DarkMode sur la page */}
        <Button
          text={darkMode ? "🌞" : "🌙"}
          onClick={() => setDarkMode((prev) => !prev)}
        />
      </div>
      {/* Bouton de redirection vers page Login ou Register */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <Button
          text="Se connecter / S‘inscrire"
          onClick={() => (window.location.href = "/login")}
        />
      </div>

      <h1
        ref={titleRef}
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(255,255,255,0.6)",
        }}
      >
        Bienvenue sur notre To-Do App
      </h1>
      <p
        ref={textRef}
        style={{ fontSize: "1.5rem", maxWidth: "600px", marginTop: "10px" }}
      >
        Gérez vos tâches facilement et efficacement.
      </p>
    </div>
  );
}

export default Home;
