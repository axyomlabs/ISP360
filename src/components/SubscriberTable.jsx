// src/components/SubscriberTable.jsx
import React, { useState, useMemo } from "react";
import { Table } from "react-bootstrap";
import { FaSort, FaLink, FaUnlink } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SubscriberTable.css";

const SubscriberTable = ({ subscribers }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...subscribers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [subscribers, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const statusColors = {
    Active: "text-success",
    Suspended: "text-secondary",
    Pending: "text-warning",
    Terminated: "text-danger",
  };

  return (
    <div>
      <div className="table-responsive">
        <Table responsive hover className="subscriber-datatable">
          <thead>
            <tr className="table-header">
              <th onClick={() => requestSort("id")}>
                Id <FaSort />
              </th>
              <th onClick={() => requestSort("status")}>
                Status <FaSort />
              </th>
              <th onClick={() => requestSort("connStatus")}>
                Conn. status <FaSort />
              </th>
              <th onClick={() => requestSort("accountType")}>
                Account type <FaSort />
              </th>
              <th onClick={() => requestSort("franchiseName")}>
                Franchise's name <FaSort />
              </th>
              <th onClick={() => requestSort("branch")}>
                Branch <FaSort />
              </th>
              <th onClick={() => requestSort("username")}>
                Username <FaSort />
              </th>
              <th onClick={() => requestSort("name")}>
                Name <FaSort />
              </th>
              <th onClick={() => requestSort("gstin")}>
                GSTIN <FaSort />
              </th>
              <th onClick={() => requestSort("packageName")}>
                Package Name <FaSort />
              </th>
              <th onClick={() => requestSort("subPackage")}>
                Sub Package <FaSort />
              </th>
              <th onClick={() => requestSort("mobile")}>
                Mobile <FaSort />
              </th>
              <th onClick={() => requestSort("lastLogoff")}>
                Last logoff <FaSort />
              </th>
              <th onClick={() => requestSort("dateAdded")}>
                Date Added <FaSort />
              </th>
              <th onClick={() => requestSort("expiryDate")}>
                Expiry date <FaSort />
              </th>
              <th onClick={() => requestSort("ipAddress")}>
                IpAddress <FaSort />
              </th>
              <th onClick={() => requestSort("city")}>
                City <FaSort />
              </th>
              <th onClick={() => requestSort("node")}>
                Node <FaSort />
              </th>
              <th onClick={() => requestSort("pop")}>
                POP <FaSort />
              </th>
              <th onClick={() => requestSort("switch")}>
                Switch <FaSort />
              </th>
              <th onClick={() => requestSort("installationAddress")}>
                Installation Address <FaSort />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>{subscriber.id}</td>
                <td>
                  <span
                    className={statusColors[subscriber.status]}
                    title={subscriber.status}
                  >
                    <BsCircleFill />
                  </span>
                </td>
                <td>
                  <span
                    className={`conn-status-icon p-1 ${
                      subscriber.connStatus === "Connected" ? "text-success" : "text-danger"
                    }`}
                  >
                    {subscriber.connStatus === "Connected" ? <FaLink /> : <FaUnlink />}
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
    </div>
  );
};

export default SubscriberTable;