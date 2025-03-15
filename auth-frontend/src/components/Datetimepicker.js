import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

const DateTimePickerComponent = ({ value, onChange, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(params) => <TextField {...params} fullWidth />}
        value={value || null} // Default to null if value is not provided
        onChange={(newDate) => onChange(newDate)} // Ensure the date returned is properly handled
        label={label}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComponent;
