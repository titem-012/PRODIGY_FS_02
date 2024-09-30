import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { AppBar, Toolbar, Button } from "@mui/material";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        {isAuthenticated ? (
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        ) : (
          <Button color="inherit" disabled>
            Dashboard
          </Button>
        )}

        {isAuthenticated ? (
          <Button color="inherit" component={Link} to="/employees">
            Employee
          </Button>
        ) : (
          <Button color="inherit" disabled>
            Employee
          </Button>
        )}

        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
