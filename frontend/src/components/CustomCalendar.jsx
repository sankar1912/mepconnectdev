import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    getDaysInMonth(currentMonth)
  );
  const startDay = startOfMonth.getDay();
  const totalDays = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };
  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;  // ✅ prevent error
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };
  

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button size="small" onClick={handlePrevMonth}>
          {"<"}
        </Button>
        <Typography variant="h6">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <Button size="small" onClick={handleNextMonth}>
          {">"}
        </Button>
      </Box>

      <Grid container spacing={1}>
        {daysOfWeek.map((day) => (
          <Grid item xs={1.71} key={day}>
            <Typography align="center" variant="subtitle2" color="textSecondary">
              {day}
            </Typography>
          </Grid>
        ))}

        {Array.from({ length: startDay }).map((_, index) => (
          <Grid item xs={1.71} key={`empty-${index}`} />
        ))}

        {Array.from({ length: totalDays }).map((_, index) => {
          const dayDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            index + 1
          );
          const isSelected = isSameDay(dayDate, selectedDate);

          return (
            <Grid item xs={1.71} key={index}>
              <Button
                fullWidth
                size="small"
                variant={isSelected ? "contained" : "text"}
                onClick={() => onDateChange(dayDate)}
                sx={{
                  minWidth: 0,
                  padding: 1,
                  borderRadius: "50%",
                }}
              >
                {index + 1}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CustomCalendar;
