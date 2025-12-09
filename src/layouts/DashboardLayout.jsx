import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex bg-base-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
