import express from 'express';
import cors from 'cors';
import db from './data.js';
import dotenv from 'dotenv';



const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


//get all tasks
app.get('/tasks', async (req, res) => {

    try {
        const result = await db.query('SELECT * FROM todo');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get a task by id
app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// post a task
app.post('/tasks', async (req, res) => {
    try{
        const description = req.body.description;
        const result = await db.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    };

});

//update a task

app.put('/task/:id', async (req, res) => {

    const id = req.params.id;
    const description = req.body.description;
     try{
        const result = await db.query('UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *', [description, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json("task updated successfully");
     } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
        
     }
})




// delete a task    
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})