// OnlineUsersTable.jsx

import React from "react";
import { BsLink45Deg, BsXLg, BsGraphUp } from "react-icons/bs"; // Added BsGraphUp for Live Graph
// Assuming TablePagination is in a sibling directory or imported via index.js/main
// For this example, we'll use a placeholder/mocked component structure.

// NOTE: Please ensure you import the actual TablePagination component from your file path.
// For demonstration, I will use a simple representation of it here.
const TablePagination = ({ totalResults, currentPage, totalPages, onPageChange }) => {
    // ... (Your existing TablePagination logic goes here) ...
    // Using a basic div structure for brevity in this file:
    return (
        <div className="d-flex justify-content-end align-items-center pt-0 pb-3 border-0">
            <div className="text-muted p-2">Total result found {totalResults}</div>
            <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">{currentPage}</a></li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </div>
    );
};


// Sample Data - You would typically fetch this data.
const sampleData = [
    { id: 2025001, status: 'Active', conn: 'Connected', username: 'johndoe', name: 'John Doe', package: '20 Mbps Unlimited', basePackage: '20 Mbps', runningPackage: '20 Mbps', runningInvoice: 'INV1234', ip: '192.168.1.100', staticIp: 'No', mac: '00:1A:2B:3C:4D:5E', macBind: 'Yes', nasIp: '10.0.0.1', serverName: 'SRV-01', nasPortBind: 'Yes', sessionId: 'S12345', protocol: 'PPPoE', nasPortId: 'P1/1', franchise: 'Franchise A', accountType: 'Prepaid', startTime: '09:00:00', onlineTime: '2h 15m', dl: '1 GB', ul: '200 MB', total: '1.2 GB' },
    { id: 2025002, status: 'Suspended', conn: 'Disconnected', username: 'jane_smith', name: 'Jane Smith', package: '100 Mbps Unlimited', basePackage: '100 Mbps', runningPackage: '100 Mbps', runningInvoice: 'INV1235', ip: '192.168.1.101', staticIp: 'No', mac: '00:1A:2B:3C:4D:5F', macBind: 'No', nasIp: '10.0.0.2', serverName: 'SRV-02', nasPortBind: 'No', sessionId: 'S12346', protocol: 'Hotspot', nasPortId: 'P2/2', franchise: 'Franchise B', accountType: 'Postpaid', startTime: '08:30:00', onlineTime: '3h 30m', dl: '5 GB', ul: '500 MB', total: '5.5 GB' },
    // ... add more data rows as needed
];

// Helper function to get status color class
const getStatusClass = (status) => {
    switch (status) {
        case 'Active': return 'text-success';
        case 'Suspended': return 'text-warning';
        case 'Terminated': return 'text-danger';
        default: return 'text-secondary';
    }
};

const OnlineUsersTable = ({ data, currentPage, itemsPerPage, totalResults, totalPages, onPageChange }) => {
    // Logic to paginate the data for the current view
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    // List of table headers as provided by the user
    const headers = [
        'Live Graph', 'A/C No', 'Franchise Name', 'Account Type', 'Username', 'Name', 
        'Start Time', 'Online Time', 'Download', 'Upload', 'Total', 
        'Base Package', 'Running Package', 'Running Invoice No', 'IpAddress', 
        'Static Ip Bind', 'MAC', 'MAC Bind', 'NAS IP', 'Server Name', 
        'NAS Port Bind', 'SessionId', 'Protocal', 'Nas Port Id', 
    ];

    return (
        <div className="card shadow-sm mt-3 mx-2" style={{ maxWidth: '100%' }}> 
            <div className="card-body p-3">
                {/* Table Header/Controls */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="text-muted">
                        Showing {startIndex + 1} to {Math.min(endIndex, totalResults)} of {totalResults} entries
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">Show</span>
                        <select className="form-select form-select-sm w-auto me-2">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <span className="me-2">rows</span>
                    </div>
                </div>

                {/* Table Structure */}
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    // Use a smaller font for the th text and add a down arrow for sorting
                                    <th key={index} className="small">{header} <span className="text-muted small">↓</span></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    {/* Live Graph Icon */}
                                    <td className="text-center"><BsGraphUp className="text-primary cursor-pointer" title="Live Graph" /></td>
                                    <td>{item.id}</td>
                                    <td>{item.franchise}</td>
                                    <td>{item.accountType}</td>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.onlineTime}</td>
                                    <td>{item.dl}</td>
                                    <td>{item.ul}</td>
                                    <td>{item.total}</td>
                                    <td>{item.basePackage}</td>
                                    <td>{item.runningPackage}</td>
                                    <td>{item.runningInvoice}</td>
                                    <td>{item.ip}</td>
                                    {/* Static Ip Bind */}
                                    <td>{item.staticIp === 'Yes' ? <BsLink45Deg className="text-success fs-5" /> : <BsXLg className="text-danger fs-5" />}</td>
                                    <td>{item.mac}</td>
                                    {/* MAC Bind */}
                                    <td>{item.macBind === 'Yes' ? <BsLink45Deg className="text-success fs-5" /> : <BsXLg className="text-danger fs-5" />}</td>
                                    <td>{item.nasIp}</td>
                                    <td>{item.serverName}</td>
                                    {/* NAS Port Bind */}
                                    <td>{item.nasPortBind === 'Yes' ? <BsLink45Deg className="text-success fs-5" /> : <BsXLg className="text-danger fs-5" />}</td>
                                    <td>{item.sessionId}</td>
                                    <td>{item.protocol}</td>
                                    <td>{item.nasPortId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table Pagination Integration in card-footer */}
            <div className="card-footer d-flex justify-content-end align-items-center pt-0 pb-3 border-0">
                <TablePagination
                    totalResults={totalResults}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default OnlineUsersTable;