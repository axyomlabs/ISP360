// OnlineUsers.jsx

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Assuming you save the new component in the same directory or adjust the path
import OnlineUsersTable from "../../components/tables/OnlineUsersTable.jsx"; 

// Note: This is the sample data definition, also used in OnlineUsersTable.jsx
const sampleData = [
    { id: 2025001, status: 'Active', conn: 'Connected', username: 'johndoe', name: 'John Doe', package: '20 Mbps Unlimited', basePackage: '20 Mbps', runningPackage: '20 Mbps', runningInvoice: 'INV1234', ip: '192.168.1.100', staticIp: 'No', mac: '00:1A:2B:3C:4D:5E', macBind: 'Yes', nasIp: '10.0.0.1', serverName: 'SRV-01', nasPortBind: 'Yes', sessionId: 'S12345', protocol: 'PPPoE', nasPortId: 'P1/1', franchise: 'Franchise A', accountType: 'Prepaid', startTime: '09:00:00', onlineTime: '2h 15m', dl: '1 GB', ul: '200 MB', total: '1.2 GB' },
    { id: 2025002, status: 'Suspended', conn: 'Disconnected', username: 'jane_smith', name: 'Jane Smith', package: '100 Mbps Unlimited', basePackage: '100 Mbps', runningPackage: '100 Mbps', runningInvoice: 'INV1235', ip: '192.168.1.101', staticIp: 'No', mac: '00:1A:2B:3C:4D:5F', macBind: 'No', nasIp: '10.0.0.2', serverName: 'SRV-02', nasPortBind: 'No', sessionId: 'S12346', protocol: 'Hotspot', nasPortId: 'P2/2', franchise: 'Franchise B', accountType: 'Postpaid', startTime: '08:30:00', onlineTime: '3h 30m', dl: '5 GB', ul: '500 MB', total: '5.5 GB' },
    // Add more data rows to fill up the table as needed...
];


function OnlineUsers() {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalResults = sampleData.length;
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container-fluid">
            
            {/* ======================================= */}
            {/* FIRST CARD (Filter) - Remains here      */}
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
                        {/* A/C No */}
                        <div className="col-md-2"><label className="form-label">A/C No</label><input type="text" className="form-control" placeholder="Enter A/C No" /></div>
                        {/* Username */}
                        <div className="col-md-2"><label className="form-label">Username</label><input type="text" className="form-control" placeholder="Enter Username" /></div>
                        {/* MAC */}
                        <div className="col-md-2"><label className="form-label">MAC</label><input type="text" className="form-control" placeholder="Enter MAC" /></div>
                    </div>

                    {/* Search Buttons */}
                    <div className="mt-3 d-flex justify-content-end gap-2">
                        <button className="btn btn-success">Show Advance Search</button>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            
            {/* ======================================= */}
            {/* SECOND CARD (Table) - Now a component   */}
            {/* ======================================= */}
            <OnlineUsersTable 
                data={sampleData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalResults={totalResults}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            
        </div>
    );
}

export default OnlineUsers;