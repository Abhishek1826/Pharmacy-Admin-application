import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "qaifi" && password === "qaifi") {
      login();  // Call the login function passed from App.js
      navigate("/products"); // Redirect to orders page
    } else {
      setError("Username and password should be the same");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" mb={2} fontWeight="bold">
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ textTransform: "none", py: 1 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
