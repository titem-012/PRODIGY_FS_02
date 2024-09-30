import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setSuccess(false); // Reset success

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      // API request to change the password

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => navigate("/login"), 3000); // Redirect after success
    } catch (error) {
      setError(error.response?.data?.message || "Password change failed.");
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
          Reset Password
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            {success}
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
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
