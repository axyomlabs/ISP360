import React from 'react'
import "../../css/Dashboard.css"

function middle() {
  return (
   <>
     {/* Online Admin Users Card (updated) */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Online Admin Users</strong>
            </div>
            <div className="card-body p-2">
              <p className="mb-2">
                Total Online Admin / Staff Users Found :{" "}
                {onlineAdminUsers.length}
              </p>

              <table className="table table-sm mb-0">
                <tbody>
                  {onlineAdminUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={`align-middle ${
                        user.isCurrent ? "text-success" : ""
                      }`}
                    >
                      <td>
                        {user.isCurrent ? (
                          <strong>Its You!</strong>
                        ) : (
                          <button className="btn btn-lg ">
                            <IoIosLogOut style={{ color: "red" }} />
                          </button>
                        )}
                      </td>
                      <td>
                        <img
                          src={getDeviceIcon(user.device)}
                          alt={user.device}
                          className="me-1"
                        />
                        <img
                          src={getBrowserIcon(user.browser)}
                          alt={user.browser}
                        />
                      </td>
                      <td>{user.user}</td>
                      <td>{user.duration}</td>
                      <td>{user.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Complaints Stats */}
          <div className="card mb-4 border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold text-dark mb-0">⚠️ Complaints Stats</h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() => setShowComplaintFilter(!showComplaintFilter)}
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>

            {showComplaintFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={complaintDateRange.from}
                      onChange={(e) =>
                        setComplaintDateRange({
                          ...complaintDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={complaintDateRange.to}
                      onChange={(e) =>
                        setComplaintDateRange({
                          ...complaintDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("complaint")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredComplaintData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="complaintsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#e41717ff" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#a50d0dff"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 5"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="complaints"
                    fill="url(#complaintsGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="complaints"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leads Stats */}
          <div className="card mb-4 border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold text-dark mb-0">Leads Stats</h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() => setShowLeadsFilter(!showLeadsFilter)}
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>

            {showLeadsFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={leadsDateRange.from}
                      onChange={(e) =>
                        setLeadsDateRange({
                          ...leadsDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={leadsDateRange.to}
                      onChange={(e) =>
                        setLeadsDateRange({
                          ...leadsDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("leads")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredLeadsData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="leadsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6f42c1" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#8640a1ff"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  {/* Removed CartesianGrid */}
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 5"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="leads"
                    fill="url(#leadsGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="leads"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

         
          {/* Nas wise Current Online Users Card */}
          <div className="card mb-4 border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold text-dark mb-0">
                NAS Wise Online Users
              </h6>
            </div>

            {/* Chart body */}
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredNasWiseData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="nasWiseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#975620ff" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#8B6F4E"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="nas"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#6c757d" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="users"
                    fill="url(#nasWiseGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="users"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
   </>
  )
}

export default middle
