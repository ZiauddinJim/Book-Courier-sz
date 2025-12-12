import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const { role, roleLoading } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard-stats', user?.email, role],
        enabled: !authLoading && !roleLoading && !!user?.email,
        queryFn: async () => {
            if (role === 'admin') {
                const res = await axiosSecure.get('/admin-stats');
                return res.data;
            } else if (role === 'librarian') {
                const res = await axiosSecure.get(`/librarian-stats/${user.email}`);
                return res.data;
            } else {
                const res = await axiosSecure.get(`/user-stats/${user.email}`);
                return res.data;
            }
        }
    });

    if (authLoading || roleLoading || statsLoading) {
        return <Loading />;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}!</h2>

            <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                    <h3 className="card-title text-2xl">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <p className="font-semibold text-lg">Name:</p>
                            <p className="text-gray-600">{user?.displayName}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-lg">Email:</p>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-lg">Role:</p>
                            <p className="text-gray-600 capitalize">{role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {role === 'admin' && (
                    <>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value text-primary">{stats.totalUsers || 0}</div>
                        </div>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <div className="stat-title">Total Books</div>
                            <div className="stat-value text-secondary">{stats.totalBooks || 0}</div>
                        </div>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <div className="stat-title">Total Orders</div>
                            <div className="stat-value text-accent">{stats.totalOrders || 0}</div>
                        </div>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-success">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="stat-title">Revenue</div>
                            <div className="stat-value text-success">৳{stats.revenue || 0}</div>
                        </div>
                    </>
                )}

                {role === 'librarian' && (
                    <>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <div className="stat-title">My Books</div>
                            <div className="stat-value text-secondary">{stats.myBooksCount || 0}</div>
                        </div>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <div className="stat-title">My Orders</div>
                            <div className="stat-value text-accent">{stats.myOrdersCount || 0}</div>
                        </div>
                    </>
                )}

                {role === 'user' && (
                    <>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <div className="stat-title">My Orders</div>
                            <div className="stat-value text-accent">{stats.myOrdersCount || 0}</div>
                        </div>
                        <div className="stat bg-base-100 shadow-xl rounded-2xl">
                            <div className="stat-figure text-error">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <div className="stat-title">My Wishlist</div>
                            <div className="stat-value text-error">{stats.myWishlistCount || 0}</div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default Dashboard;
