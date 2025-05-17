import React, { useState } from "react";
import "./login.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button, TextField, Paper, Typography, InputAdornment, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getLogin } from "../api/task";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginInput((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  }

  async function logUser(event) {
    event.preventDefault();
    try {
      const response = await getLogin(loginInput.email, loginInput.password);
      if (response?.data?.token) {
        console.log("Successful login");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        console.log("Login failed: No token returned");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleGoogleLogin() {
    console.log("Google login clicked");
    // Later: redirect to backend's Google OAuth URL
  }

  return (
    <div className="login-wrapper">
      <Paper elevation={3} className="login-card">
        <Typography variant="h5" className="login-title">Login</Typography>
        <form className="login-form" onSubmit={logUser}>
          <TextField
            onChange={handleChange}
            value={loginInput.email}
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            onChange={handleChange}
            value={loginInput.password}
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link to="/register">Register</Link>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>

        <Typography align="center" style={{ margin: "1rem 0" }}>
          — or —
        </Typography>

        <Button
          onClick={handleGoogleLogin}
          variant="outlined"
          fullWidth
          style={{ color: "#4285F4", borderColor: "#4285F4", marginBottom: "1rem" }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: 20, marginRight: 10 }}
          />
          Sign in with Google
        </Button>
      </Paper>
    </div>
  );
}

export default Login;