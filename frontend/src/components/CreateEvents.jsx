import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/slice/eventsSlice";

const departments =  ["Civil Engineering",
  "Mechanical Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Computer Science Engineering", 
  "Information Technology", 
  "Artificial Intelligence & Data Science", 
  "Bio Medical Engineering", 
  "Bio Technology", 
  "Architecture",
  "MCA", 
  "MBA", 
  ];

const CreateEvents = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({
    name: "",
    department: "",
    description: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addEvent(eventData));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Create Event
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Event Name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
        />
        
        {/* Dropdown for Department */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Department</InputLabel>
          <Select
            name="department"
            value={eventData.department}
            onChange={handleChange}
          >
            {departments.map((dept, index) => (
              <MenuItem key={index} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          multiline
          rows={3}
          value={eventData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Date"
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Time"
          name="time"
          type="time"
          value={eventData.time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEvents;
