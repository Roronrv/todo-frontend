import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const createTodo = async (data) => {
  const response = await axios.post(`${API_URL}/todos`, { data });
  return response.data;
};

export const updateTodo = async (id, data) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, { data });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`);
  return response.data;
};
