// src/components/SubscriberTable.jsx
import React, { useState, useMemo } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { FaSort, FaLink, FaUnlink } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SubscriberTable.css';

const SubscriberTable = ({ subscribers, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...subscribers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [subscribers, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const totalSubscribers = sortedData.length;
  const totalPages = Math.ceil(totalSubscribers / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="table-responsive">
        <Table responsive hover className="subscriber-datatable">
          <thead>
            <tr className="table-header">
              <th onClick={() => requestSort('id')}>Id <FaSort /></th>
              <th onClick={() => requestSort('status')}>Status <FaSort /></th>
              <th onClick={() => requestSort('connStatus')}>Conn. status <FaSort /></th>
              <th onClick={() => requestSort('accountType')}>Account type <FaSort /></th>
              <th onClick={() => requestSort('franchiseName')}>Franchise's name <FaSort /></th>
              <th onClick={() => requestSort('branch')}>Branch <FaSort /></th>
              <th onClick={() => requestSort('username')}>Username <FaSort /></th>
              <th onClick={() => requestSort('name')}>Name <FaSort /></th>
              <th onClick={() => requestSort('gstin')}>GSTIN <FaSort /></th>
              <th onClick={() => requestSort('packageName')}>Package Name <FaSort /></th>
              <th onClick={() => requestSort('subPackage')}>Sub Package <FaSort /></th>
              <th onClick={() => requestSort('mobile')}>Mobile <FaSort /></th>
              <th onClick={() => requestSort('lastLogoff')}>Last logoff <FaSort /></th>
              <th onClick={() => requestSort('dateAdded')}>Date Added <FaSort /></th>
              <th onClick={() => requestSort('expiryDate')}>Expiry date <FaSort /></th>
              <th onClick={() => requestSort('ipAddress')}>IpAddress <FaSort /></th>
              <th onClick={() => requestSort('city')}>City <FaSort /></th>
              <th onClick={() => requestSort('node')}>Node <FaSort /></th>
              <th onClick={() => requestSort('pop')}>POP <FaSort /></th>
              <th onClick={() => requestSort('switch')}>Switch <FaSort /></th>
              <th onClick={() => requestSort('installationAddress')}>Installation Address <FaSort /></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>{subscriber.id}</td>
                <td>
                  <span className={`status-icon ${subscriber.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                    <BsCircleFill />
                  </span>
                  {subscriber.status}
                </td>
                <td>
                  <span className={`conn-status-icon ${subscriber.connStatus === 'Connected' ? 'text-success' : 'text-danger'}`}>
                    {subscriber.connStatus === 'Connected' ? <FaLink /> : <FaUnlink />}
                  </span>
                  {subscriber.connStatus}
                </td>
                <td>{subscriber.accountType}</td>
                <td>{subscriber.franchiseName}</td>
                <td>{subscriber.branch}</td>
                <td>{subscriber.username}</td>
                <td>{subscriber.name}</td>
                <td>{subscriber.gstin}</td>
                <td>{subscriber.packageName}</td>
                <td>{subscriber.subPackage}</td>
                <td>{subscriber.mobile}</td>
                <td>{subscriber.lastLogoff}</td>
                <td>{subscriber.dateAdded}</td>
                <td>{subscriber.expiryDate}</td>
                <td>{subscriber.ipAddress}</td>
                <td>{subscriber.city}</td>
                <td>{subscriber.node}</td>
                <td>{subscriber.pop}</td>
                <td>{subscriber.switch}</td>
                <td>{subscriber.installationAddress}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      {/* Table Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Showing {indexOfFirstItem + 1} to {indexOfLastItem > totalSubscribers ? totalSubscribers : indexOfLastItem} of {totalSubscribers} entries
        </div>
        <div className="d-flex align-items-center">
          <Pagination className="mb-0">
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              previous
            </Pagination.Prev>
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Pagination.Next>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default SubscriberTable;