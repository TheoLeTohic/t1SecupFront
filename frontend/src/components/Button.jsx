import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useDarkMode } from "../context/DarkModeContext";

const Button = ({ text, onClick }) => {
  const buttonRef = useRef(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    gsap.set(buttonRef.current, {
      boxShadow: darkMode
        ? "0px 0px 10px rgba(255, 255, 255, 0.3)"
        : "0px 0px 10px rgba(0, 0, 0, 0.3)",
    });

    gsap.to(buttonRef.current, {
      boxShadow: darkMode
        ? "0px 0px 50px rgba(255, 255, 255, 0.8)"
        : "0px 0px 50px rgba(0, 0, 0, 0.8)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, [darkMode]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      style={{
        backgroundColor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
        padding: "10px 20px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "1rem",
        border: "none",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={() =>
        gsap.to(buttonRef.current, { scale: 1.1, duration: 0.2 })
      }
      onMouseLeave={() =>
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2 })
      }
    >
      {text}
    </button>
  );
};

export default Button;
