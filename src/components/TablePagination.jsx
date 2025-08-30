// src/components/TablePagination.jsx

import React from 'react';
import { Pagination } from 'react-bootstrap';

const TablePagination = ({ totalResults, currentPage, totalPages, onPageChange }) => {
  const getPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div className="text-muted p-2">
        Total result found {totalResults}
      </div>
      <div className="d-flex align-items-center">
        <Pagination>
          <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            previous
          </Pagination.Prev>
          {getPaginationItems()}
          <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

// This is the correct export statement to fix the error.
export default TablePagination;