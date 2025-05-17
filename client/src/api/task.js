import axios from 'axios';
import Register from '../pages/Register';

// This file contains the API calls to the backend for task management.s
const BASE_URL =  process.env.REACT_APP_API_URL

console.log('▶️ BASE_URL =', process.env.REACT_APP_API_URL);


// for the authenication local 

const AUTH_URL = 'http://localhost:5000/auth';



export const getTasks = () => axios.get(`${BASE_URL}/tasks`);
export const getTask = (id) => axios.get(`${BASE_URL}/tasks/${id}`);
export const createTask = (description) => axios.post(`${BASE_URL}/tasks`, { description });
export const updateTask = (id , description) => axios.put(`${BASE_URL}/task/${id}`, { description });
export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);


// post request to identify the user

export const getLogin = (email, password) => axios.post(`${AUTH_URL}/login`, { email, password});
export const getRegister = (username , email, password) => axios.post(`${AUTH_URL}/register`, {username, email, password});


