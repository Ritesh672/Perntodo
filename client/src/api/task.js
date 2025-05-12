import axios from 'axios';
// This file contains the API calls to the backend for task management.s
const BASE_URL = 'http://localhost:5000';

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);
export const getTask = (id) => axios.get(`${BASE_URL}/tasks/${id}`);
export const createTask = (description) => axios.post(`${BASE_URL}/tasks`, { description });
export const updateTask = (id , description) => axios.put(`${BASE_URL}/task/${id}`, { description });
export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);



