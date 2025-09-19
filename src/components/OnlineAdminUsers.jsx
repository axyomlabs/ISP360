import React, { useState, useEffect, useRef } from 'react';

const dummyAdmins = [
    { name: 'Its You!', os: 'windows', browser: 'chrome', time: '1 s', ip: '103.142.163.180' },
    { name: 'desk', os: 'android', browser: 'chrome', time: '2 h 26 m 56 s', ip: '103.142.162.68' },
    { name: 'support', os: 'ios', browser: 'safari', time: '1 h 15 m 30 s', ip: '103.142.162.99' },
    { name: 'field_agent', os: 'linux', browser: 'brave', time: '30 m 10 s', ip: '103.142.162.150' },
    { name: 'tech_lead', os: 'windows', browser: 'firefox', time: '2 h 5 m 20 s', ip: '103.142.163.190' },
    { name: 'qa_engineer', os: 'linux', browser: 'chrome', time: '55 m 45 s', ip: '103.142.162.75' },
    { name: 'hr_manager', os: 'windows', browser: 'edge', time: '4 h 10 m 5 s', ip: '103.142.163.120' },
    { name: 'accountant', os: 'ios', browser: 'safari', time: '1 h 40 m 3 s', ip: '103.142.162.88' },
    { name: 'designer', os: 'macos', browser: 'chrome', time: '2 h 30 m 15 s', ip: '103.142.163.50' },
    { name: 'it_support', os: 'android', browser: 'brave', time: '5 h 2 m 12 s', ip: '103.142.162.44' },
    { name: 'analyst', os: 'windows', browser: 'chrome', time: '12 m 1 s', ip: '103.142.163.200' },
    { name: 'project_manager', os: 'macos', browser: 'safari', time: '3 h 45 m 50 s', ip: '103.142.163.201' },
    { name: 'network_engineer', os: 'linux', browser: 'firefox', time: '1 h 20 m 15 s', ip: '103.142.162.202' },
    { name: 'cyber_security', os: 'windows', browser: 'edge', time: '45 m 10 s', ip: '103.142.163.203' },
];

function OnlineAdminUsers() {
    const [currentPage, setCurrentPage] = useState(0);
    const intervalRef = useRef(null);
    const usersPerPage = 4;
    const totalPages = Math.ceil(dummyAdmins.length / usersPerPage);

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        }, 10000);
    };

    useEffect(() => {
        if (totalPages > 1) {
            resetInterval();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [totalPages]);

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

    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        resetInterval();
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
        resetInterval();
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 relative flex flex-col max-w-4xl w-full font-inter">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Online Admin Users</h2>
                <p className="text-center text-lg text-gray-600 mb-8">
                    Total Online Admin / Staff Users Found: <span className="font-semibold text-gray-800">{dummyAdmins.length}</span>
                </p>

                <div className="flex items-center justify-between gap-6 px-2 py-4 min-h-[440px]">
                    <button
                        onClick={handlePrev}
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-2 border-gray-400 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                        disabled={totalPages <= 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    
                    <div className="w-full relative overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out gap-x-6" 
                            style={{ transform: `translateX(calc(-${currentPage * 100}% - ${currentPage * 24}px))` }}
                        >
                            {Array.from({ length: totalPages }, (_, pageIndex) => (
                                <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-6 min-h-[440px]">
                                    {dummyAdmins.slice(pageIndex * usersPerPage, (pageIndex + 1) * usersPerPage).map((admin, i) => (
                                        <div 
                                            key={i} 
                                            className="rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-indigo-100 to-purple-100 transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className={`w-3 h-3 rounded-full mr-3 ${admin.name === 'Its You!' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    <span className={`text-xl font-semibold ${admin.name === 'Its You!' ? 'text-gray-800' : 'text-gray-600'}`}>
                                                        {admin.name}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2 text-3xl">
                                                    <span>{getIcon(admin.os)}</span>
                                                    <span>{getIcon(admin.browser)}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-500">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">Online Time</span>
                                                    <span className="font-semibold text-gray-700">{admin.time}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">IP Address</span>
                                                    <span className="font-semibold text-gray-700">{admin.ip}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <button
                        onClick={handleNext}
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-2 border-gray-400 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                        disabled={totalPages <= 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentPage(i);
                                resetInterval();
                            }}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                currentPage === i
                                    ? 'bg-indigo-500'
                                    : 'bg-gray-400'
                            }`}
                        >
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OnlineAdminUsers;