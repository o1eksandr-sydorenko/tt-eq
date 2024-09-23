import React, { ChangeEvent } from "react";
import {
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Stack } from "@mui/system";

interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
  itemsPerPageOptions?: number[];
}

const BasePagination: React.FC<BasePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50],
}) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      marginTop={2}
    >
      <FormControl variant="outlined" size="small">
        <InputLabel id="items-per-page-label">Items per page</InputLabel>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          label="Items per page"
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default BasePagination;
