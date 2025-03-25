import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Gestion et vérification de la route "privée"
const PrivateRoute = ({ element }) => {
    return Cookies.get("token") ? element : <Navigate to="/login" />;
  };

export default PrivateRoute;
