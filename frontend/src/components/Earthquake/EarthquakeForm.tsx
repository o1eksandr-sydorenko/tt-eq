"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_EARTHQUAKE,
  UPDATE_EARTHQUAKE,
} from "../../graphql/earthquakes";
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
import {
  Earthquake,
  CreateEarthquakeInput,
  UpdateEarthquakeInput,
} from "../../types";
import { formatDateForInput } from "@/utils/formatDate";

interface Props {
  earthquake?: Earthquake;
  onCompleted: () => void;
}

const EarthquakeForm: React.FC<Props> = ({ earthquake, onCompleted }) => {
  const isEditMode = Boolean(earthquake);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(earthquake?.location || "");
  const [magnitude, setMagnitude] = useState<number>(
    earthquake?.magnitude || 0
  );
  const [date, setDate] = useState<string>(
    earthquake ? formatDateForInput(new Date(earthquake.date)) : ""
  );

  const [createEarthquake] = useMutation(CREATE_EARTHQUAKE);
  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE);

  useEffect(() => {
    if (earthquake) {
      setLocation(earthquake.location);
      setMagnitude(earthquake.magnitude);
      setDate(formatDateForInput(new Date(earthquake.date)));
    } else {
      setLocation("");
      setMagnitude(0);
      setDate(formatDateForInput(new Date()));
    }
  }, [earthquake, isEditMode, open]);

  const handleSubmit = async () => {
    if (!date) {
      alert("Please select a valid date and time.");
      return;
    }

    const isoDate = new Date(date).toISOString();

    const input: CreateEarthquakeInput | UpdateEarthquakeInput = {
      location,
      magnitude,
      date: isoDate,
    };

    try {
      if (isEditMode && earthquake) {
        await updateEarthquake({
          variables: { id: earthquake.id, input },
        });
      } else {
        await createEarthquake({ variables: { input } });
      }
      setOpen(false);
      onCompleted();
    } catch (err) {
      console.error(err);
      alert("Operation failed.");
    }
  };

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
