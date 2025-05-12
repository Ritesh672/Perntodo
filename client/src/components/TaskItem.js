import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function TaskItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(props.description);

  const handleEditClick = () => {
    if (isEditing) {
      props.update(props.id, editDescription);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Paper elevation={2} style={{ padding: '1rem' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        {isEditing ? (
          <TextField
            variant="standard"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography 
          variant="h6" 
          style={{ flexGrow: 1, color: '#333', fontWeight: 500 }}
        >
          {props.description}
        </Typography>
        
        
        )}

        <Button
          variant="contained"
          color={isEditing ? 'success' : 'primary'}
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => props.delete(props.id)}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
}

export default TaskItem;
