import React from 'react';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import { Outlet } from 'react-router';

const MainRoute = () => {
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