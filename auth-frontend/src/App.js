import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // Import Dashboard
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute"; // Ensure PrivateRoute is used
import ForgotPassword from "./components/ForgotPassword";
import { Employee } from "./components/Employee"; // Named import

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
