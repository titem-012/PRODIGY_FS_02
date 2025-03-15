import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AlertTitle,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Ensure this is correctly imported
import axios from "../api/axiosConfig";  // Ensure axiosConfig is correctly set up

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submission

    try {
      const response = await axios.post("/login", {  // Ensure correct endpoint
        email: username,  // Assuming you're sending the email as username
        password,
      });

      // Assuming the response contains tokens and using them for login
      if (response.data.access && response.data.refresh) {
        login(response.data.access, response.data.refresh);  // Ensure the login function is correctly implemented in context
        navigate("/dashboard");
      } else {
        setError({ message: "Invalid response from server" });
      }
    } catch (err) {
      setError({
        message: err.response?.data?.message || err.message || "An error occurred",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            <AlertTitle>Error</AlertTitle>
            {error.message}  {/* Use error.message instead of error response */}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username (Email)"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <MuiLink component={Link} to="/register">
              Register
            </MuiLink>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Forgot your password?{" "}
            <MuiLink component={Link} to="/forgot-password">
              Reset it here
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
