import React from "react";

const UserStatsDashboard = () => {
  return (
    <div className="user-stats-dashboard">
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

                .user-stats-dashboard {
                    font-family: 'Roboto', sans-serif;
                    // padding: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .user-stats-dashboard {
                        // padding: 2rem;
                    }
                }

                .user-stats-dashboard .card {
                    max-width: 96rem;
                    margin: 0;
                    background-color: white;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                
                @media (min-width: 768px) {
                    .user-stats-dashboard .card {
                        padding: 2rem;
                    }
                }

                .user-stats-dashboard .title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 1.5rem;
                }

                .user-stats-dashboard .metrics-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1rem;
                }

                @media (min-width: 640px) {
                    .user-stats-dashboard .metrics-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .user-stats-dashboard .metric-tile {
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transition: transform 0.2s ease-in-out;
                }

                .user-stats-dashboard .metric-tile:hover {
                    transform: translateY(-0.25rem);
                }

                .user-stats-dashboard .total-tile {
                    background: linear-gradient(to bottom right, #3b82f6, #4f46e5);
                }

                .user-stats-dashboard .active-tile {
                    background: linear-gradient(to bottom right, #34d399, #10b981);
                }

                .user-stats-dashboard .online-tile {
                    background: linear-gradient(to bottom right, #fcd34d, #f97316);
                }

                .user-stats-dashboard .metric-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    opacity: 0.8;
                }

                .user-stats-dashboard .metric-number {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-top: 0.5rem;
                }

                .user-stats-dashboard .info-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                @media (min-width: 640px) {
                    .user-stats-dashboard .info-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 768px) {
                    .user-stats-dashboard .info-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .user-stats-dashboard .info-tile {
                    padding: 1rem;
                    border-width: 2px;
                    border-radius: 0.5rem;
                    color: white;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .user-stats-dashboard .info-label {
                    margin-right: 0.5rem;
                }

                .user-stats-dashboard .info-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .user-stats-dashboard .expired-tile {
                    border-color: #ef4444;
                    background-color: #f87171;
                }

                .user-stats-dashboard .pending-tile {
                    border-color: #fbbf24;
                    background-color: #fcd34d;
                }

                .user-stats-dashboard .suspended-tile {
                    border-color: #a855f7;
                    background-color: #c084fc;
                }

                .user-stats-dashboard .on-hold-tile {
                    border-color: #348b7eff;
                    background-color: #348b7eff;
                }

                .user-stats-dashboard .offline-tile {
                    border-color: #64748b;
                    background-color: #94a3b8;
                }

                .user-stats-dashboard .disconnected-tile {
                    border-color: #4b5563;
                    background-color: #6b7280;
                }

                /* ========================================= */
                /* LAPTOP STYLES */
                /* ========================================= */
                @media (min-width: 992px) and (max-width: 1366px) {
                    .user-stats-dashboard .title {
                        font-size: 1.25rem;
                    }

                    .user-stats-dashboard .card {
                        padding: 1rem;
                    }
                
                    .user-stats-dashboard .metrics-grid {
                        gap: 1rem;
                    }
                    
                    .user-stats-dashboard .metric-tile {
                        padding: 1rem;
                    }

                    .user-stats-dashboard .metric-label {
                        font-size: 0.75rem;
                    }

                    .user-stats-dashboard .metric-number {
                        font-size: 2rem;
                    }

                    .user-stats-dashboard .info-grid {
                        gap: 0.75rem;
                    }

                    .user-stats-dashboard .info-tile {
                        padding: 0.75rem;
                    }
                    
                   .user-stats-dashboard .info-label {
                         font-size: 10px;
                    }
                
                    .user-stats-dashboard .info-number {
                        font-size: 1.25rem;
                    }
                }
                `}
      </style>
      <div className="card">
        <h2 className="title">User Stats</h2>

        <div className="metrics-grid">
          <div className="metric-tile total-tile">
            <p className="metric-label">Total</p>
            <p className="metric-number">74</p>
          </div>
          <div className="metric-tile active-tile">
            <p className="metric-label">Active</p>
            <p className="metric-number">64</p>
          </div>
          <div className="metric-tile online-tile">
            <p className="metric-label">Online</p>
            <p className="metric-number">59</p>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-tile expired-tile">
            <span className="info-label">Expired</span>
            <span className="info-number">0</span>
          </div>
          <div className="info-tile pending-tile">
            <span className="info-label">Pending</span>
            <span className="info-number">0</span>
          </div>
          <div className="info-tile suspended-tile">
            <span className="info-label">Suspended</span>
            <span className="info-number">0</span>
          </div>
          <div className="info-tile on-hold-tile">
            <span className="info-label">On Hold</span>
            <span className="info-number">2</span>
          </div>
          <div className="info-tile offline-tile">
            <span className="info-label">Offline</span>
            <span className="info-number">15</span>
          </div>
          <div className="info-tile disconnected-tile">
            <span className="info-label">Disconnected</span>
            <span className="info-number">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsDashboard;
