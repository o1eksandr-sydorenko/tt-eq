import { useState, useEffect } from "react";
import {
  Earthquake,
  CreateEarthquakeInput,
  UpdateEarthquakeInput,
} from "../types";
import { useEarthquakes } from "./useEarthquakes";
import { formatDateForInput } from "@/utils/formatDate";

interface UseEarthquakeFormProps {
  earthquake?: Earthquake;
  onCompleted: () => void;
}

export const useEarthquakeForm = ({
  earthquake,
  onCompleted,
}: UseEarthquakeFormProps) => {
  const { createEarthquake, updateEarthquake } = useEarthquakes();

  const [open, setOpen] = useState(false);
  const isEditMode = Boolean(earthquake);
  const [location, setLocation] = useState(earthquake?.location || "");
  const [magnitude, setMagnitude] = useState<number>(
    earthquake?.magnitude || 0
  );
  const [date, setDate] = useState<string>(
    earthquake ? formatDateForInput(new Date(earthquake.date)) : ""
  );

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
  }, [earthquake]);

  const handleSubmit = async () => {
    if (!date) {
      alert("Please select a valid date and time.");
      return;
    }

    const input: CreateEarthquakeInput | UpdateEarthquakeInput = {
      location,
      magnitude,
      date: new Date(date).toISOString(),
    };

    try {
      if (isEditMode && earthquake) {
        const hasChanges =
          earthquake.location !== location ||
          earthquake.magnitude !== magnitude ||
          formatDateForInput(new Date(earthquake.date)) !== date;

        if (hasChanges) {
          await updateEarthquake({ id: earthquake.id, input });
          onCompleted();
        }
      } else {
        if (!location || !magnitude || !date) {
          alert("All fields are required");
          return;
        }

        await createEarthquake({ input: input as CreateEarthquakeInput });
        onCompleted();
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Operation failed.");
    }
  };

  return {
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
  };
};
