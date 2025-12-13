import React, { useEffect } from 'react';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import { Outlet } from 'react-router';
import useRole from '../hooks/useRole';

const MainRoute = () => {
    const { role } = useRole()
    useEffect(() => {
        if (!role) return;

        const roleTitleMap = {
            user: 'User',
            librarian: 'Librarian',
            admin: 'Admin',
        };

        document.title = `Book Courier | ${roleTitleMap[role] || 'Dashboard'}`;
    }, [role]);

    return (
        <section className='min-h-screen flex flex-col'>
            <div>
                <Navbar />
            </div>
            <section className='flex-1 mt-16'>
                <Outlet />
            </section>
            <Footer />
        </section>
    );
};

export default MainRoute;