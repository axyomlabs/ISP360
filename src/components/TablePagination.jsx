// src/components/TablePagination.jsx
import React from "react";
import { Pagination } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";

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

  // ✅ Status color legend
  const statusColors = {
    Active: "text-success",
    Suspended: "text-secondary",
    Pending: "text-warning",
    Terminated: "text-danger",
  };

  return (
    <div className="d-flex flex-column mt-3">
      {/* 🔹 Row 2: Legend */}
      <div className="d-flex gap-3 px-2 flex-wrap">
        {Object.entries(statusColors).map(([status, colorClass]) => (
          <div key={status} className="d-flex align-items-center">
            <BsCircleFill className={colorClass + " me-1"} />
            <span>{status}</span>
          </div>
        ))}
      </div>
      {/* 🔹 Row 1: Pagination + results */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-muted p-2">Total result found {totalResults}</div>
        <div className="d-flex align-items-center">
          <Pagination>
            <Pagination.Prev
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Pagination.Prev>
            {getPaginationItems()}
            <Pagination.Next
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Pagination.Next>
          </Pagination>
        </div>
      </div>

    </div>
  );
};

export default TablePagination;
