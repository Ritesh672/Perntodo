import React, { use, useState } from "react";
import "./register.css";
import { getRegister } from "../api/task";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Paper, Typography } from "@mui/material";

function Register() {

    // set the use navigate to a constant 
    const navigate = useNavigate();

    // state handling for the input fields
    const [registerInput, setRegisterInput] = useState({
        username: "",
        email: "",
        password: ""
    });


    // functino to handle the change in the input 

    function handleChange(event){
        const {name , value} = event.target;
        setRegisterInput(preValue => ({
            ...preValue,
            [name] : value
        }))
    }

    // function to login the user 

     async function getUserRegister(event) {
        event.preventDefault();
        try{
            const result = await getRegister(registerInput.username, registerInput.email, registerInput.password);
            console.log("user registered sucessfully");
            // navigate the user to the home page
            navigate("/home");
        }catch (error){
            console.log("error while login", error);
        }
     }

  return (
    <div className="register-wrapper">
      <Paper elevation={3} className="register-card">
        <Typography variant="h5" className="register-title">Register</Typography>
        <form className="register-form" onSubmit={getUserRegister}>
          <TextField
            onChange={handleChange}
            label="Username"
            name="username"
            value={registerInput.username}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="off"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={registerInput.email}
            onChange={handleChange}
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="off"
            required
          />
          <TextField
            label="Password"
            name="password"
            value={registerInput.password}
            onChange={handleChange}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="off"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
