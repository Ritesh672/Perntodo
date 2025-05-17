
// Home.js
import React, { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from './api/task';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  async function addTask(description) {
    try {
      const response = await createTask(description);
      setTasks(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  // Delete a task
  async function deleteItem(id) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.todo_id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  // Update a task
  async function editItem(id, description) {
    try {
      console.log(description, id);
      const response = await updateTask(id, description);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.todo_id === id ? { ...task, description } : task
        ));
    } catch (err) {
      console.log("error while making put request ", err);
    }
  }
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        To-Do List
      </Typography>
      <TaskForm check={addTask} />
      <Stack spacing={2} mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.todo_id}
              id={task.todo_id}
              description={task.description}
              delete={deleteItem}
              update={editItem}
            />
          ))
        )}
      </Stack>
    </Container>
  );
}

export default Home;




