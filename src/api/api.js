const API_URL = "https://my-todo-backend-31f944975365.herokuapp.com/api";

// Récupérer le token CSRF avant les requêtes sensibles (POST, PUT, DELETE)
const getCsrfToken = async () => {
  const response = await fetch(`${API_URL}/csrf-token`, {
    credentials: "include",
  });
  const data = await response.json();
  return data.csrfToken;
};

// Endpoint d'inscription
export const register = async (username, password) => {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken, // Ajout du token CSRF
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
};

// Endpoint de connexion utilisateur
export const login = async (username, password) => {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken, // Ajout du token CSRF
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
};

// Endpoint pour récupérer les todos
export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "GET",
    credentials: "include", // Prend le cookie automatiquement
  });
  return response.json();
};

// Endpoint pour créer un todo
export const createTodo = async (title) => {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  return response.json();
};

// Endpoint pour mettre à jour un todo
export const updateTodo = async (id, title, completed) => {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ title, completed }),
  });
  return response.json();
};

// Endpoint pour supprimer un todo
export const deleteTodo = async (id) => {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
  });
  return response.json();
};
