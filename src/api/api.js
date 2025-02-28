const API_URL = "https://my-todo-backend-31f944975365.herokuapp.com/api";

export const register = async (username, password) => {

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getTodos = async (token) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: { Authorization: token },
  });
  return response.json();
};

export const createTodo = async (token, title) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ title }),
  });
  return response.json();
};

export const updateTodo = async (token, id, title, completed) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ title, completed }),
  });
  return response.json();
};

export const deleteTodo = async (token, id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return response.json();
};
