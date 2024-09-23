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

    const isoDate = new Date(date).toISOString();
    const input: CreateEarthquakeInput | UpdateEarthquakeInput = {
      location,
      magnitude,
      date: isoDate,
    };

    try {
      if (isEditMode && earthquake) {
        await updateEarthquake({ id: earthquake.id, input });
      } else {
        await createEarthquake({ input: input as CreateEarthquakeInput });
      }
      setOpen(false);
      onCompleted();
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
