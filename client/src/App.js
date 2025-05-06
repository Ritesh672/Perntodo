import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './components/TaskItem';

import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  Stack,
} from '@mui/material';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (!description.trim()) return;
    try {
      const res = await axios.post(API_URL, { description });
      setTasks([...tasks, res.data]);
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.todo_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, newDescription) => {
    try {
      await axios.put(`http://localhost:5000/task/${id}`, { description: newDescription });
      setTasks(tasks.map(task =>
        task.todo_id === id ? { ...task, description: newDescription } : task
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="New Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={addTask}>
          Add
        </Button>
      </Stack>
      <List>
        {tasks.map(task => (
          <TaskItem
            key={task.todo_id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </List>
    </Container>
  );
}

export default App;
