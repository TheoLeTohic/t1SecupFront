import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TodoApp from "./pages/TodoApp.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/todo-app" element={<TodoApp />} />
          </Route>
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
