import { useEffect, useState } from "react";

interface IUsePaginationProps {
  initialPage?: number;
  initialItemsPerPage?: number;
  totalItems: number;
}

interface UsePaginationReturn {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  resetPagination: () => void;
  getOffset: () => number;
}

export const usePagination = ({
  initialPage = 1,
  initialItemsPerPage = 10,
  totalItems,
}: IUsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {}, [currentPage, itemsPerPage]);

  const setPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const setItemsPerPageHandler = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  const resetPagination = () => {
    setCurrentPage(initialPage);
    setItemsPerPage(initialItemsPerPage);
  };

  const getOffsetHandler = (): number => {
    return (currentPage - 1) * itemsPerPage;
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    setPage,
    setItemsPerPage: setItemsPerPageHandler,
    resetPagination,
    getOffset: getOffsetHandler,
  };
};
