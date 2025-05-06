import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(task.description);

  const handleUpdate = () => {
    onUpdate(task.todo_id, desc);
    setIsEditing(false);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <>
          {isEditing ? (
            <IconButton edge="end" onClick={handleUpdate}>
              <SaveIcon color="success" />
            </IconButton>
          ) : (
            <IconButton edge="end" onClick={() => setIsEditing(true)}>
              <EditIcon color="primary" />
            </IconButton>
          )}
          <IconButton edge="end" onClick={() => onDelete(task.todo_id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      }
    >
      {isEditing ? (
        <TextField
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          size="small"
          fullWidth
        />
      ) : (
        <ListItemText primary={task.description} />
      )}
    </ListItem>
  );
}

export default TaskItem;
