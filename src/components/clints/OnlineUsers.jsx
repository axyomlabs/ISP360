import React from 'react';
import '../../css/OnlineUsers.css'; // Import the CSS file

// Dummy data from your uploaded image to populate the user table
const usersData = [
  {
    id: '2025001',
    status: 'Active',
    connStatus: 'Connected',
    username: 'johndoe',
    name: 'John Doe',
    packageName: '20 Mbps Unlimited',
    mobile: '9876543210'
  },
  {
    id: '2025002',
    status: 'Suspended',
    connStatus: 'Disconnected',
    username: 'jane_smith',
    name: 'Jane Smith',
    packageName: '100 Mbps Unlimited',
    mobile: '9988776655'
  },
  {
    id: '2025003',
    status: 'Active',
    connStatus: 'Connected',
    username: 'techcorp',
    name: 'Tech Corp',
    packageName: '500 Mbps Corporate',
    mobile: '9123456789'
  },
  {
    id: '2025004',
    status: 'Terminated',
    connStatus: 'Disconnected',
    username: 'trial_user',
    name: 'Trial User',
    packageName: 'Trial 10 Mbps',
    mobile: '9000000000'
  },
  {
    id: '2025005',
    status: 'Pending',
    connStatus: 'Disconnected',
    username: 'old_user',
    name: 'Old User',
    packageName: '20 Mbps Unlimited',
    mobile: '9765432109'
  },
  {
    id: '2025006',
    status: 'Active',
    connStatus: 'Connected',
    username: 'user06',
    name: 'User Six',
    packageName: '20 Mbps Unlimited',
    mobile: '9123456780'
  },
  {
    id: '2025007',
    status: 'Suspended',
    connStatus: 'Disconnected',
    username: 'user07',
    name: 'User Seven',
    packageName: '100 Mbps Unlimited',
    mobile: '9988776650'
  },
  {
    id: '2025008',
    status: 'Active',
    connStatus: 'Connected',
    username: 'user08',
    name: 'User Eight',
    packageName: '250 Mbps Corporate',
    mobile: '9123456781'
  },
  {
    id: '2025009',
    status: 'Terminated',
    connStatus: 'Disconnected',
    username: 'user09',
    name: 'User Nine',
    packageName: 'Trial 10 Mbps',
    mobile: '9000000001'
  },
  {
    id: '2025010',
    status: 'Terminated',
    connStatus: 'Disconnected',
    username: 'user10',
    name: 'User Ten',
    packageName: '20 Mbps Unlimited',
    mobile: '9765432108'
  },
];

function OnlineUsersDashboard() {
  return (
    <div className="container">
      {/* First Card: Filter Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Filter</h3>
          <span className="settings-icon">⚙️</span>
        </div>
        <div className="card-body">
          <div className="filter-grid">
            <div className="filter-item">
              <label className="label">Select Franchise</label>
              <select className="input">
                <option>--ALL--</option>
              </select>
            </div>
            <div className="filter-item">
              <label className="label">Branch</label>
              <select className="input">
                <option>--ALL--</option>
              </select>
            </div>
            <div className="filter-item">
              <label className="label">Nas</label>
              <select className="input">
                <option>--ALL--</option>
              </select>
            </div>
            <div className="filter-item">
              <label className="label">A/C No</label>
              <input type="text" className="input" />
            </div>
            <div className="filter-item">
              <label className="label">Username</label>
              <input type="text" className="input" />
            </div>
            <div className="filter-item">
              <label className="label">MAC</label>
              <input type="text" className="input" />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="button-green">Show Advance Search</button>
          <button className="button-blue">Search</button>
        </div>
      </div>

      {/* Second Card: User Table */}
      <div className="card">
        <div className="table-header">
          <h3 className="card-title">Online Users</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="th">Id</th>
                <th className="th">Status</th>
                <th className="th">Conn. Status</th>
                <th className="th">Username</th>
                <th className="th">Name</th>
                <th className="th">Package Name</th>
                <th className="th">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index} className="tr">
                  <td className="td">{user.id}</td>
                  <td className="td">{user.status}</td>
                  <td className="td">{user.connStatus}</td>
                  <td className="td">{user.username}</td>
                  <td className="td">{user.name}</td>
                  <td className="td">{user.packageName}</td>
                  <td className="td">{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Total result found {usersData.length}</span>
          <div className="pagination">
            <button className="pagination-btn">Previous</button>
            <span className="page-number">1</span>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineUsersDashboard;