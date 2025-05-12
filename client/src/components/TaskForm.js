import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

function TaskForm(props) {
  const [description, setDescription] = useState("");

  function handleChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (description.trim()) {
      props.check(description);
      setDescription("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
      <TextField
        fullWidth
        variant="outlined"
        label="New Task"
        value={description}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" endIcon={<AddBoxIcon />}>
        Add
      </Button>
    </form>
  );
}

export default TaskForm;