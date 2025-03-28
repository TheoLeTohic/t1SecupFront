import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = "https://my-todo-backend-31f944975365.herokuapp.com";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/check-auth`, {
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'auth :", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Chargement...</p>;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
