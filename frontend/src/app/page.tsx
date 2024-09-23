"use client";

import React from "react";
import EarthquakeList from "../components/Earthquake/EarthquakeList";
import { Typography, Box } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Earthquake List
      </Typography>
      <EarthquakeList />
    </Box>
  );
};

export default HomePage;
