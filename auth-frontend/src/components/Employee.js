import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Ensure only one default export, and remove any other potential conflicting exports
const Employee = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    _id: null,
    firstName: "",
    lastName: "",
    hourlyRate: "",
    dateOfJoining: null,
  });

  // Fetch Employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle Sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Open Dialog for Adding or Editing Employee
  const handleClickOpen = (employee = null) => {
    if (employee) {
      setNewEmployee({
        ...employee,
        dateOfJoining: employee.dateOfJoining
          ? new Date(employee.dateOfJoining)
          : null,
      });
    } else {
      setNewEmployee({
        _id: null,
        firstName: "",
        lastName: "",
        hourlyRate: "",
        dateOfJoining: null,
      });
    }
    setOpen(true);
  };

  // Close Dialog
  const handleClose = () => {
    setOpen(false);
    setNewEmployee({
      _id: null,
      firstName: "",
      lastName: "",
      hourlyRate: "",
      dateOfJoining: null,
    });
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  // Handle Date Change
  const handleDateChange = (date) => {
    setNewEmployee({
      ...newEmployee,
      dateOfJoining: date,
    });
  };

  // Add or Update Employee
  const handleAddEmployee = async () => {
    if (newEmployee._id) {
      // Update Employee
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/${newEmployee._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
          }
        );

        if (response.ok) {
          const updatedEmployee = await response.json();
          setRows(
            rows.map((row) =>
              row._id === updatedEmployee._id ? updatedEmployee : row
            )
          );
        } else {
          console.error("Failed to update employee");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Add New Employee
      try {
        const response = await fetch("http://localhost:5000/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmployee),
        });

        if (response.ok) {
          const savedEmployee = await response.json();
          setRows([...rows, savedEmployee]);
        } else {
          console.error("Failed to add employee");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    handleClose();
  };

  // Delete Employee
  const handleDeleteClick = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/${_id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setRows(rows.filter((row) => row._id !== _id));
        } else {
          console.error("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={() => handleClickOpen()}>
          + Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <TableHead>
            <TableRow>
              {["firstName", "lastName", "hourlyRate", "dateOfJoining"].map(
                (headCell) => (
                  <TableCell
                    key={headCell}
                    align="center"
                    sortDirection={orderBy === headCell ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, headCell)}
                    >
                      {headCell
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row._id}>
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.hourlyRate || "0"}</TableCell>
                <TableCell align="center">
                  {row.dateOfJoining
                    ? new Date(row.dateOfJoining).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen(row)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Employee */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {newEmployee._id ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              value={newEmployee.firstName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              value={newEmployee.lastName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="hourlyRate"
              label="Hourly Rate"
              type="number"
              fullWidth
              variant="outlined"
              value={newEmployee.hourlyRate || ""}
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Joining"
                value={newEmployee.dateOfJoining}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEmployee}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Ensure this is the only default export
export default Employee;
