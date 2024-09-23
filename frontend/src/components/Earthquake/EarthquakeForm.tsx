"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Earthquake } from "../../types";
import { useEarthquakeForm } from "@/hooks";

interface Props {
  earthquake?: Earthquake;
  onCompleted: () => void;
}

const EarthquakeForm: React.FC<Props> = ({ earthquake, onCompleted }) => {
  const {
    location,
    setLocation,
    magnitude,
    setMagnitude,
    date,
    setDate,
    handleSubmit,
    isEditMode,
    open,
    setOpen,
  } = useEarthquakeForm({ earthquake, onCompleted });

  return (
    <>
      {isEditMode ? (
        <IconButton onClick={() => setOpen(true)} color="primary">
          <Edit />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ marginBottom: 2 }}
        >
          Add Earthquake
        </Button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditMode ? "Update Earthquake" : "Add New Earthquake"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Magnitude"
            type="number"
            fullWidth
            value={magnitude}
            onChange={(e) => setMagnitude(parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EarthquakeForm;
