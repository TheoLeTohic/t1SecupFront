import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TodoApp from "./pages/TodoApp.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Router de l'application, nesté avec le hook pour gérer le dark mode sur l'ensemble de l'application.
function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo-app" element={<PrivateRoute element={<TodoApp />} />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
