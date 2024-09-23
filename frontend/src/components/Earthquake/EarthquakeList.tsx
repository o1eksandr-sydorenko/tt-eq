"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useEarthquakes, usePagination } from "../../hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import EarthquakeForm from "./EarthquakeForm";
import Loading from "../common/Loading";
import { formatDate } from "../../utils/formatDate";
import BasePagination from "../common/Pagination";

const EarthquakeList: React.FC = () => {
  const [totalItems, setTotalItems] = useState<number>(0);

  const pagination = usePagination({
    initialPage: 1,
    initialItemsPerPage: 10,
    totalItems,
  });

  const { loading, error, earthquakes, totalCount, deleteEarthquake, refetch } =
    useEarthquakes({
      limit: pagination.itemsPerPage,
      offset: pagination.getOffset(),
    });

  useEffect(() => {
    setTotalItems(totalCount);
  }, [totalCount]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this earthquake?")) {
      try {
        await deleteEarthquake(id);
        refetch();
      } catch (err) {
        console.error(err);
        alert("Failed to delete earthquake.");
      }
    }
  };

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    pagination.setPage(value);
  };

  const handleItemsPerPageChange = (count: number) => {
    pagination.setItemsPerPage(count);
    refetch();
  };

  if (loading) return <Loading />;
  if (error) return <Alert severity="error">Error loading earthquakes.</Alert>;

  return (
    <Box>
      <EarthquakeForm onCompleted={refetch} />
      <Table>
        <TableHead sx={{ bgcolor: "secondary.main" }}>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Magnitude</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {earthquakes.map((earthquake) => (
            <TableRow key={earthquake.id}>
              <TableCell>{formatDate(earthquake.date)}</TableCell>
              <TableCell>{earthquake.location}</TableCell>
              <TableCell>{earthquake.magnitude}</TableCell>
              <TableCell align="center">
                <EarthquakeForm earthquake={earthquake} onCompleted={refetch} />
                <IconButton
                  onClick={() => handleDelete(earthquake.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BasePagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handleChangePage}
        itemsPerPage={pagination.itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};

export default EarthquakeList;
