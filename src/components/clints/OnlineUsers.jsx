// OnlineUsers.jsx

import React, { useState, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
// IMPORTANT: Adjust paths if your file structure is different
import SubscriberTable from "../../components/SubscriberTable.jsx"; 
import TablePagination from "../../components/TablePagination.jsx"; 

// --- ONLINE USERS SAMPLE DATA ---
// Data structure aligned with all user-requested columns
const onlineUsersSampleData = [
    { 
        id: '2025001', status: 'Active', conn: 'Connected', username: 'johndoe', name: 'John Doe', basePackage: '20 Mbps', runningPackage: '20 Mbps', runningInvoice: 'INV1234', ip: '192.168.1.100', staticIp: 'No', mac: '00:1A:2B:3C:4D:5E', macBind: 'Yes', nasIp: '10.0.0.1', serverName: 'SRV-01', nasPortBind: 'Yes', sessionId: 'S12345', protocol: 'PPPoE', nasPortId: 'P1/1', franchise: 'Franchise A', accountType: 'Prepaid', startTime: '09:00:00', onlineTime: '2h 15m', dl: '1 GB', ul: '200 MB', total: '1.2 GB' 
    },
    { 
        id: '2025002', status: 'Suspended', conn: 'Disconnected', username: 'jane_smith', name: 'Jane Smith', basePackage: '100 Mbps', runningPackage: '100 Mbps', runningInvoice: 'INV1235', ip: '192.168.1.101', staticIp: 'No', mac: '00:1A:2B:3C:4D:5F', macBind: 'No', nasIp: '10.0.0.2', serverName: 'SRV-02', nasPortBind: 'No', sessionId: 'S12346', protocol: 'Hotspot', nasPortId: 'P2/2', franchise: 'Franchise B', accountType: 'Postpaid', startTime: '08:30:00', onlineTime: '3h 30m', dl: '5 GB', ul: '500 MB', total: '5.5 GB' 
    },
    { id: '2025003', status: 'Active', conn: 'Connected', username: 'user03', name: 'User Three', basePackage: '50 Mbps', runningPackage: '50 Mbps', runningInvoice: 'INV1236', ip: '192.168.1.102', staticIp: 'No', mac: '00:1A:2B:3C:4D:6E', macBind: 'Yes', nasIp: '10.0.0.1', serverName: 'SRV-01', nasPortBind: 'Yes', sessionId: 'S12347', protocol: 'PPPoE', nasPortId: 'P1/2', franchise: 'Franchise A', accountType: 'Prepaid', startTime: '07:00:00', onlineTime: '4h 50m', dl: '2 GB', ul: '400 MB', total: '2.4 GB' },
    { id: '2025004', status: 'Active', conn: 'Connected', username: 'user04', name: 'User Four', basePackage: '20 Mbps', runningPackage: '20 Mbps', runningInvoice: 'INV1237', ip: '192.168.1.103', staticIp: 'No', mac: '00:1A:2B:3C:4D:7E', macBind: 'No', nasIp: '10.0.0.3', serverName: 'SRV-03', nasPortBind: 'No', sessionId: 'S12348', protocol: 'Hotspot', nasPortId: 'P3/1', franchise: 'Franchise C', accountType: 'Postpaid', startTime: '10:00:00', onlineTime: '1h 45m', dl: '800 MB', ul: '100 MB', total: '900 MB' },
    { id: '2025005', status: 'Suspended', conn: 'Disconnected', username: 'user05', name: 'User Five', basePackage: '100 Mbps', runningPackage: '100 Mbps', runningInvoice: 'INV1238', ip: '192.168.1.104', staticIp: 'Yes', mac: '00:1A:2B:3C:4D:8E', macBind: 'Yes', nasIp: '10.0.0.4', serverName: 'SRV-04', nasPortBind: 'Yes', sessionId: 'S12349', protocol: 'PPPoE', nasPortId: 'P4/1', franchise: 'Franchise D', accountType: 'Corporate', startTime: '06:00:00', onlineTime: '5h 50m', dl: '10 GB', ul: '1 GB', total: '11 GB' },
    { id: '2025006', status: 'Active', conn: 'Connected', username: 'user06', name: 'User Six', basePackage: '20 Mbps', runningPackage: '20 Mbps', runningInvoice: 'INV1239', ip: '192.168.1.105', staticIp: 'No', mac: '00:1A:2B:3C:4D:9E', macBind: 'Yes', nasIp: '10.0.0.1', serverName: 'SRV-01', nasPortBind: 'Yes', sessionId: 'S12350', protocol: 'PPPoE', nasPortId: 'P1/3', franchise: 'Franchise A', accountType: 'Prepaid', startTime: '09:00:00', onlineTime: '2h 10m', dl: '1 GB', ul: '200 MB', total: '1.2 GB' },
    { id: '2025007', status: 'Active', conn: 'Connected', username: 'user07', name: 'User Seven', basePackage: '50 Mbps', runningPackage: '50 Mbps', runningInvoice: 'INV1240', ip: '192.168.1.106', staticIp: 'No', mac: '00:1A:2B:3C:4D:AE', macBind: 'No', nasIp: '10.0.0.3', serverName: 'SRV-03', nasPortBind: 'No', sessionId: 'S12351', protocol: 'Hotspot', nasPortId: 'P3/2', franchise: 'Franchise C', accountType: 'Postpaid', startTime: '08:30:00', onlineTime: '3h 20m', dl: '3 GB', ul: '300 MB', total: '3.3 GB' },
    { id: '2025008', status: 'Suspended', conn: 'Disconnected', username: 'user08', name: 'User Eight', basePackage: '100 Mbps', runningPackage: '100 Mbps', runningInvoice: 'INV1241', ip: '192.168.1.107', staticIp: 'No', mac: '00:1A:2B:3C:4D:BE', macBind: 'Yes', nasIp: '10.0.0.2', serverName: 'SRV-02', nasPortBind: 'Yes', sessionId: 'S12352', protocol: 'PPPoE', nasPortId: 'P2/1', franchise: 'Franchise B', accountType: 'Postpaid', startTime: '07:00:00', onlineTime: '4h 10m', dl: '6 GB', ul: '500 MB', total: '6.5 GB' },
    { id: '2025009', status: 'Active', conn: 'Connected', username: 'user09', name: 'User Nine', basePackage: '20 Mbps', runningPackage: '20 Mbps', runningInvoice: 'INV1242', ip: '192.168.1.108', staticIp: 'No', mac: '00:1A:2B:3C:4D:CE', macBind: 'No', nasIp: '10.0.0.4', serverName: 'SRV-04', nasPortBind: 'No', sessionId: 'S12353', protocol: 'Hotspot', nasPortId: 'P4/2', franchise: 'Franchise D', accountType: 'Corporate', startTime: '10:00:00', onlineTime: '1h 0m', dl: '500 MB', ul: '50 MB', total: '550 MB' },
    { id: '2025010', status: 'Pending', conn: 'Disconnected', username: 'user10', name: 'User Ten', basePackage: '50 Mbps', runningPackage: '50 Mbps', runningInvoice: 'INV1243', ip: '192.168.1.109', staticIp: 'Yes', mac: '00:1A:2B:3C:4D:DE', macBind: 'Yes', nasIp: '10.0.0.1', serverName: 'SRV-01', nasPortBind: 'Yes', sessionId: 'S12354', protocol: 'PPPoE', nasPortId: 'P1/4', franchise: 'Franchise A', accountType: 'Prepaid', startTime: '06:00:00', onlineTime: '5h 0m', dl: '4 GB', ul: '800 MB', total: '4.8 GB' },
];

// Define initial columns using data keys, with 'connStatus' for 'Live Graph'
const initialOnlineColumns = [
    'connStatus',      // Mapped from 'conn' for Live Graph/Connection Icon
    'id',              // A/C No
    'franchise',       // Franchise Name
    'accountType',     // Account Type
    'username',        // Username
    'name',            // Name
    'startTime',       // Start Time
    'onlineTime',      // Online Time
    'dl',              // Download
    'ul',              // Upload
    'total',           // Total
    'basePackage',     // Base Package
    'runningPackage',  // Running Package
    'runningInvoice',  // Running Invoice No
    'ip',              // IpAddress (key is 'ip')
    'staticIp',        // Static Ip Bind (key is 'staticIp')
    'mac',             // MAC
    'macBind',         // MAC Bind
    'nasIp',           // NAS IP (key is 'nasIp')
    'serverName',      // Server Name
    'nasPortBind',     // NAS Port Bind
    'sessionId',       // SessionId
    'protocol',        // Protocal
    'nasPortId'        // Nas Port Id
];


function OnlineUsers() {
    // State for pagination and table configuration
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const [visibleColumns, setVisibleColumns] = useState(initialOnlineColumns);
    
    // Logic for calculating pagination metrics
    const filteredData = onlineUsersSampleData; // Assume this is where data would be filtered by form inputs
    const totalResults = filteredData.length; 
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Memoize the data for the current page and map 'conn' to 'connStatus'
    const subscribersToShow = useMemo(() => {
        const currentData = filteredData.slice(startIndex, endIndex);

        // Map the source data's 'conn' key to 'connStatus' for SubscriberTable's logic
        return currentData.map(user => ({
            ...user,
            connStatus: user.conn, 
            id: String(user.id), // Ensure ID is string for stable keys
        }));
    }, [startIndex, endIndex, filteredData]);

    const handleColumnOrderChange = useCallback((newOrder) => {
        setVisibleColumns(newOrder);
    }, []);

    // Handler for changing rows per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing page size
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container-fluid">
            
            {/* ======================================= */}
            {/* FIRST CARD (Filter) */}
            {/* ======================================= */}
            <div className="card shadow-sm mt-1 p-3 mx-2" style={{ maxWidth: '100%' }}> 
                <div className="card-header fw-bold">Filter</div>
                <div className="card-body">
                    {/* Filter Inputs Row */}
                    <div className="row g-3">
                        {/* Select Franchise */}
                        <div className="col-md-2"><label className="form-label">Select Franchise</label><select className="form-select"><option>--ALL--</option><option>Franchise 1</option><option>Franchise 2</option></select></div>
                        {/* Branch */}
                        <div className="col-md-2"><label className="form-label">Branch</label><select className="form-select"><option>--ALL--</option><option>Branch 1</option><option>Branch 2</option></select></div>
                        {/* Nas */}
                        <div className="col-md-2"><label className="form-label">Nas</label><select className="form-select"><option>--ALL--</option><option>NAS 1</option><option>NAS 2</option></select></div>
                        {/* A/C No - FIXED: Added unique ID */}
                        <div className="col-md-2"><label className="form-label">A/C No</label><input id="fld_acNo" type="text" className="form-control" placeholder="Enter A/C No" /></div>
                        {/* Username - FIXED: Added unique ID */}
                        <div className="col-md-2"><label className="form-label">Username</label><input id="fld_username" type="text" className="form-control" placeholder="Enter Username" /></div>
                        {/* MAC - FIXED: Added unique ID */}
                        <div className="col-md-2"><label className="form-label">MAC</label><input id="fld_mac" type="text" className="form-control" placeholder="Enter MAC" /></div>
                    </div>

                    {/* Search Buttons */}
                    <div className="mt-3 d-flex justify-content-end gap-2">
                        <button className="btn btn-success">Show Advance Search</button>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            
            {/* ======================================= */}
            {/* PAGINATION SUMMARY AND ROWS PER PAGE CONTROL */}
            {/* ======================================= */}
            <div
                className="d-flex justify-content-between align-items-center mx-2 mt-2"
                style={{ backgroundColor: "#fff" }} 
            >
                {/* Pagination Summary */}
                <div className="text-muted me-3">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalResults)} of{" "}
                    {totalResults} entries
                </div>
                {/* Rows Per Page Control */}
                <div className="d-flex align-items-center gap-2 mx-2">
                    <div className="d-flex align-items-center mb-1">
                        <span>Show</span>
                        <Form.Select
                            className="mx-2"
                            style={{ width: "80px" }}
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </Form.Select>
                        <span>rows</span>
                    </div>
                </div>
            </div>
            
            {/* ======================================= */}
            {/* SECOND CARD (Table) - Using SubscriberTable */}
            {/* ======================================= */}
            <div className="card m-1" style={{ height: "63vh", overflow: "hidden" }}>
                <div
                    className="card-body"
                    // FIXED: Removed overflowY: "auto" to prevent DND nested scroll error
                    style={{ height: "calc(100% - 80px)" }} 
                >
                    <SubscriberTable 
                        subscribers={subscribersToShow} 
                        visibleColumns={visibleColumns}   
                        onColumnOrderChange={handleColumnOrderChange} 
                    />
                </div>
                {/* Pagination Controls */}
                <div className="mx-2">
                    <TablePagination
                        totalResults={totalResults}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            
        </div>
    );
}

export default OnlineUsers;