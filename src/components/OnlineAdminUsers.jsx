import React, { useState, useEffect, useRef } from 'react';

// --- Icon Component for Logout (SVG) ---
// Now defaults to the red color used in the button
const LogoutIcon = ({ size = 16, color = '#EF4444' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} // Use the provided color for the icon stroke
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        {/* Door/Square part */}
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        {/* Arrow part */}
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
);


const dummyAdmins = [
    { name: 'Its You!', os: 'windows', browser: 'chrome', time: '1 s', ip: '103.142.163.180', logInTime: '10:57 AM' },
    { name: 'desk', os: 'android', browser: 'chrome', time: '2 h 26 m 56 s', ip: '103.142.162.68', logInTime: '08:30 AM' },
    { name: 'support', os: 'ios', browser: 'safari', time: '1 h 15 m 30 s', ip: '103.142.162.99', logInTime: '09:42 AM' },
    { name: 'field_agent', os: 'linux', browser: 'brave', time: '30 m 10 s', ip: '103.142.162.150', logInTime: '10:27 AM' },
    { name: 'tech_lead', os: 'windows', browser: 'firefox', time: '2 h 5 m 20 s', ip: '103.142.163.190', logInTime: '08:52 AM' },
    { name: 'qa_engineer', os: 'linux', browser: 'chrome', time: '55 m 45 s', ip: '103.142.162.75', logInTime: '10:01 AM' },
    { name: 'hr_manager', os: 'windows', browser: 'edge', time: '4 h 10 m 5 s', ip: '103.142.163.120', logInTime: '06:47 AM' },
    { name: 'accountant', os: 'ios', browser: 'safari', time: '1 h 40 m 3 s', ip: '103.142.162.88', logInTime: '09:17 AM' },
    { name: 'designer', os: 'macos', browser: 'chrome', time: '2 h 30 m 15 s', ip: '103.142.163.50', logInTime: '08:27 AM' },
    { name: 'it_support', os: 'android', browser: 'brave', time: '5 h 2 m 12 s', ip: '103.142.162.44', logInTime: '05:55 AM' },
    { name: 'analyst', os: 'windows', browser: 'chrome', time: '12 m 1 s', ip: '103.142.163.200', logInTime: '10:45 AM' },
    { name: 'project_manager', os: 'macos', browser: 'safari', time: '3 h 45 m 50 s', ip: '103.142.163.201', logInTime: '07:12 AM' },
    { name: 'network_engineer', os: 'linux', browser: 'firefox', time: '1 h 20 m 15 s', ip: '103.142.162.202', logInTime: '09:37 AM' },
    { name: 'cyber_security', os: 'windows', browser: 'edge', time: '45 m 10 s', ip: '103.142.163.203', logInTime: '10:12 AM' },
];

// Reusable Modal Component for Messages/Alerts
const MessageModal = ({ show, message, onClose }) => {
    if (!show) return null;

    return (
        <div 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                zIndex: 1000,
                padding: '1rem' 
            }}
        >
            <div 
                style={{ 
                    backgroundColor: 'white', 
                    padding: '2rem', 
                    borderRadius: '0.75rem', 
                    maxWidth: '350px', 
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1rem' }}>Admin Action</h3>
                <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '1.5rem' }}>{message}</p>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3B82F6'}
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const OnlineAdminUsersCard = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false); 
    const [modalContent, setModalContent] = useState(''); 
    const intervalRef = useRef(null);
    const containerRef = useRef(null);
    const usersPerPage = 4;
    const totalPages = Math.ceil(dummyAdmins.length / usersPerPage);

    useEffect(() => {
        if (containerRef.current) {
            const pageOffset = containerRef.current.offsetWidth * currentPage;
            containerRef.current.scrollTo({
                left: pageOffset,
                behavior: 'smooth'
            });
        }
    }, [currentPage]);

    useEffect(() => {
        const resetInterval = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (totalPages > 1) {
                intervalRef.current = setInterval(() => {
                    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
                }, 10000);
            }
        };

        resetInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [totalPages]);

    // Handler for clicking the main card body (for location info)
    const handleInfoClick = () => {
        setModalContent("Location: India");
        setShowModal(true);
    };

    // Handler for clicking the Force Logout button
    const handleForceLogout = (adminName, e) => {
        // Stop propagation so the card's info click handler isn't also triggered
        e.stopPropagation(); 
        setModalContent(`Force Logout initiated for user: ${adminName}`);
        setShowModal(true);
    }

    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'windows': return '🪟';
            case 'android': return '🤖';
            case 'ios': return '📱';
            case 'linux': return '🐧';
            case 'macos': return '🍎';
            case 'chrome': return '🌐';
            case 'safari': return '🧭';
            case 'brave': return '🦁';
            case 'firefox': return '🦊';
            case 'edge': return '🟦';
            default: return '❓';
        }
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .card-container-outer {
                    width: 100%;
                    padding: 1.5rem; 
                    background-color: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                .scroll-container {
                    display: flex;
                    overflow-x: hidden;
                    white-space: nowrap;
                    scroll-behavior: smooth;
                    width: 100%;
                }

                .page-container {
                    flex-shrink: 0;
                    width: 100%;
                    display: grid;
                    word-break: break-word; 
                    grid-template-columns: repeat(1, 1fr); 
                    gap: 0.5rem;
                    padding-right: 0; 
                }

                /* Responsive design for larger screens (e.g., Tablet and up) */
                @media (min-width: 640px) {
                    .page-container {
                        grid-template-columns: repeat(2, 1fr); 
                    }
                }

                .user-card {
                    /* Adjusted height to 100px to fit 3 lines */
                    height: 100px; 
                    padding: 0.6rem; 
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    background: linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(219, 234, 254, 0.8));
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-sizing: border-box; 
                    cursor: pointer; /* Indicate it's clickable */
                    transition: transform 0.1s ease-in-out;
                }

                .user-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 10px -1px rgba(0, 0, 0, 0.15);
                }
                
                .info-text-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap; 
                    word-break: break-word; 
                    min-width: 0; 
                }

                .name-and-button {
                    /* Align items in the center and add spacing */
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .info-text {
                    font-size: 0.75rem;
                    color: #4B5563;
                    margin-top: 0.1rem; 
                }

                .info-label {
                    font-weight: 500;
                    margin-right: 0.5rem;
                }

                .info-value {
                    font-weight: 700;
                    min-width: 0; 
                    text-align: right;
                }

                /* Styling for the icon button (Transparent background, Red foreground) */
                .force-logout-btn {
                    background-color: transparent; /* No background color */
                    width: 1.8rem; /* Slightly larger area for better touch target */
                    height: 1.8rem;
                    padding: 0; 
                    border-radius: 50%; 
                    border: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: background-color 0.2s, transform 0.1s; 
                    box-shadow: none; /* No shadow */
                    flex-shrink: 0; 
                }

                .force-logout-btn:hover {
                    background-color: rgba(239, 68, 68, 0.1); /* Light red background on hover */
                    transform: scale(1.1);
                }

                .nav-dots {
                    display: flex;
                    justify-content: center;
                    margin-top: 0.5rem;
                    gap: 0.5rem;
                }

                .nav-dot {
                    width: 0.75rem;
                    height: 0.75rem;
                    border: none;
                    padding: 0;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                }
                
                .nav-dot.active {
                    background-color: #3B82F6;
                }
                
                .nav-dot.inactive {
                    background-color: #D1D5DB;
                }
                `}
            </style>
            <div className="card-container-outer">
                <h6 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Online Admin Users</h6>
                <p style={{ textAlign: 'left', color: '#6B7280', marginBottom: '0.8rem', fontSize: '0.75rem' }}>Total Online Admin / Staff Users Found: <span style={{ fontWeight: 'bold' }}>{dummyAdmins.length}</span></p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <div ref={containerRef} className="scroll-container">
                        {Array.from({ length: totalPages }, (_, pageIndex) => (
                            <div key={pageIndex} className="page-container">
                                {dummyAdmins.slice(pageIndex * usersPerPage, (pageIndex + 1) * usersPerPage).map((admin, i) => (
                                    <div 
                                        key={i} 
                                        className="user-card"
                                        onClick={handleInfoClick} // Card body click handler for location info
                                        role="button" 
                                        tabIndex={0} 
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div className="name-and-button">
                                                {/* Force Logout Icon Button (Transparent BG, Red Icon) */}
                                                <button
                                                    className="force-logout-btn"
                                                    onClick={(e) => handleForceLogout(admin.name, e)}
                                                    title={`Force logout ${admin.name}`}
                                                >
                                                    <LogoutIcon />
                                                </button>
                                                {/* Admin Name */}
                                                <span style={{ fontWeight: '600', fontSize: '0.8rem', color: '#1F2937', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {admin.name}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '0.9rem', display: 'flex', gap: '3px', flexShrink: 0 }}>
                                                <span>{getIcon(admin.os)}</span>
                                                <span>{getIcon(admin.browser)}</span>
                                            </div>
                                        </div>
                                        <div className="info-text">
                                            <div className="info-text-row">
                                                <span className="info-label">Log In Time</span>
                                                <span className="info-value">{admin.logInTime}</span>
                                            </div>
                                            <div className="info-text-row">
                                                <span className="info-label">Online Time</span>
                                                <span className="info-value">{admin.time}</span>
                                            </div>
                                            <div className="info-text-row">
                                                <span className="info-label">IP Address</span>
                                                <span className="info-value">{admin.ip}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="nav-dots">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentPage(i);
                            }}
                            className={`nav-dot ${currentPage === i ? 'active' : 'inactive'}`}
                        >
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Message Modal Component */}
            <MessageModal 
                show={showModal}
                message={modalContent}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};


const OnlineAdminUsers = () => {
    return (
        <>
           <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <OnlineAdminUsersCard />
        </>
    );
};

export default OnlineAdminUsers;







// import React, { useState, useEffect, useRef } from 'react';

// const dummyAdmins = [
//     { name: 'Its You!', os: 'windows', browser: 'chrome', time: '1 s', ip: '103.142.163.180' },
//     { name: 'desk', os: 'android', browser: 'chrome', time: '2 h 26 m 56 s', ip: '103.142.162.68' },
//     { name: 'support', os: 'ios', browser: 'safari', time: '1 h 15 m 30 s', ip: '103.142.162.99' },
//     { name: 'field_agent', os: 'linux', browser: 'brave', time: '30 m 10 s', ip: '103.142.162.150' },
//     { name: 'tech_lead', os: 'windows', browser: 'firefox', time: '2 h 5 m 20 s', ip: '103.142.163.190' },
//     { name: 'qa_engineer', os: 'linux', browser: 'chrome', time: '55 m 45 s', ip: '103.142.162.75' },
//     { name: 'hr_manager', os: 'windows', browser: 'edge', time: '4 h 10 m 5 s', ip: '103.142.163.120' },
//     { name: 'accountant', os: 'ios', browser: 'safari', time: '1 h 40 m 3 s', ip: '103.142.162.88' },
//     { name: 'designer', os: 'macos', browser: 'chrome', time: '2 h 30 m 15 s', ip: '103.142.163.50' },
//     { name: 'it_support', os: 'android', browser: 'brave', time: '5 h 2 m 12 s', ip: '103.142.162.44' },
//     { name: 'analyst', os: 'windows', browser: 'chrome', time: '12 m 1 s', ip: '103.142.163.200' },
//     { name: 'project_manager', os: 'macos', browser: 'safari', time: '3 h 45 m 50 s', ip: '103.142.163.201' },
//     { name: 'network_engineer', os: 'linux', browser: 'firefox', time: '1 h 20 m 15 s', ip: '103.142.162.202' },
//     { name: 'cyber_security', os: 'windows', browser: 'edge', time: '45 m 10 s', ip: '103.142.163.203' },
// ];

// function OnlineAdminUsers() {
//     const [currentPage, setCurrentPage] = useState(0);
//     const intervalRef = useRef(null);
//     const usersPerPage = 4;
//     const totalPages = Math.ceil(dummyAdmins.length / usersPerPage);

//     const resetInterval = () => {
//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }
//         intervalRef.current = setInterval(() => {
//             setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
//         }, 10000);
//     };

//     useEffect(() => {
//         if (totalPages > 1) {
//             resetInterval();
//         }
//         return () => {
//             if (intervalRef.current) {
//                 clearInterval(intervalRef.current);
//             }
//         };
//     }, [totalPages]);

//     const getIcon = (type) => {
//         switch (type.toLowerCase()) {
//             case 'windows': return '🪟';
//             case 'android': return '🤖';
//             case 'ios': return '📱';
//             case 'linux': return '🐧';
//             case 'macos': return '🍎';
//             case 'chrome': return '🌐';
//             case 'safari': return '🧭';
//             case 'brave': return '🦁';
//             case 'firefox': return '🦊';
//             case 'edge': return '🟦';
//             default: return '❓';
//         }
//     };

//     const handleNext = () => {
//         setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
//         resetInterval();
//     };

//     const handlePrev = () => {
//         setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
//         resetInterval();
//     };

//     return (
//         <div className="flex items-center justify-center p-4">
//             <div className="bg-white rounded-xl shadow-2xl p-6 relative flex flex-col max-w-4xl w-full font-inter">
//                 <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Online Admin Users</h2>
//                 <p className="text-center text-lg text-gray-600 mb-8">
//                     Total Online Admin / Staff Users Found: <span className="font-semibold text-gray-800">{dummyAdmins.length}</span>
//                 </p>

//                 <div className="flex items-center justify-between gap-6 px-2 py-4 min-h-[440px]">
//                     <button
//                         onClick={handlePrev}
//                         className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-2 border-gray-400 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
//                         disabled={totalPages <= 1}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//                         </svg>
//                     </button>
                    
//                     <div className="w-full relative overflow-hidden">
//                         <div 
//                             className="flex transition-transform duration-500 ease-in-out gap-x-6" 
//                             style={{ transform: `translateX(calc(-${currentPage * 100}% - ${currentPage * 24}px))` }}
//                         >
//                             {Array.from({ length: totalPages }, (_, pageIndex) => (
//                                 <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-6 min-h-[440px]">
//                                     {dummyAdmins.slice(pageIndex * usersPerPage, (pageIndex + 1) * usersPerPage).map((admin, i) => (
//                                         <div 
//                                             key={i} 
//                                             className="rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-indigo-100 to-purple-100 transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
//                                         >
//                                             <div className="flex items-start justify-between mb-4">
//                                                 <div className="flex items-center">
//                                                     <div className={`w-3 h-3 rounded-full mr-3 ${admin.name === 'Its You!' ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                                                     <span className={`text-xl font-semibold ${admin.name === 'Its You!' ? 'text-gray-800' : 'text-gray-600'}`}>
//                                                         {admin.name}
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex space-x-2 text-3xl">
//                                                     <span>{getIcon(admin.os)}</span>
//                                                     <span>{getIcon(admin.browser)}</span>
//                                                 </div>
//                                             </div>
//                                             <div className="space-y-2 text-sm text-gray-500">
//                                                 <div className="flex justify-between items-center">
//                                                     <span className="font-medium">Online Time</span>
//                                                     <span className="font-semibold text-gray-700">{admin.time}</span>
//                                                 </div>
//                                                 <div className="flex justify-between items-center">
//                                                     <span className="font-medium">IP Address</span>
//                                                     <span className="font-semibold text-gray-700">{admin.ip}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
    
//                     <button
//                         onClick={handleNext}
//                         className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-2 border-gray-400 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
//                         disabled={totalPages <= 1}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//                         </svg>
//                     </button>
//                 </div>

//                 <div className="flex items-center justify-center mt-6 space-x-2">
//                     {Array.from({ length: totalPages }, (_, i) => (
//                         <button
//                             key={i}
//                             onClick={() => {
//                                 setCurrentPage(i);
//                                 resetInterval();
//                             }}
//                             className={`w-3 h-3 rounded-full transition-colors duration-200 ${
//                                 currentPage === i
//                                     ? 'bg-indigo-500'
//                                     : 'bg-gray-400'
//                             }`}
//                         >
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default OnlineAdminUsers;