import React from 'react';
import { Users, UserPlus, ShieldPlus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const changeRole = async (user, newRole) => {
        const roleText = newRole === 'admin' ? 'Admin' : 'Librarian';

        // Show confirmation dialog
        const result = await Swal.fire({
            title: `Make ${roleText}?`,
            html: `Are you sure you want to make <strong>${user.displayName}</strong> a ${roleText}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: newRole === 'admin' ? '#3b82f6' : '#a855f7',
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, make ${roleText}!`,
            cancelButtonText: 'Cancel'
        });
        if (result.isConfirmed) {
            try {
                // Update role via API
                await axiosSecure.patch(`/users/${user.email}/role`, { role: newRole });

                // Show success message
                Swal.fire({
                    title: 'Updated!',
                    text: `${user.displayName} is now a ${roleText}`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                // Refetch users to update the list
                refetch();
            } catch (error) {
                console.error('Failed to update role:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update user role. Please try again.',
                    icon: 'error'
                });
            }
        }
    };

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="text-primary" /> All Users
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id || user.email} className="hover">
                                <td className="font-bold">{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className={`badge capitalize ${user.role === 'admin' ? 'badge-primary' :
                                        user.role === 'librarian' ? 'badge-secondary' :
                                            'badge-ghost'
                                        }`}>
                                        {user.role || 'user'}
                                    </div>
                                </td>
                                <td className="flex gap-2">
                                    {user.role !== 'librarian' && user.role !== 'admin' && (
                                        <button
                                            onClick={() => changeRole(user, 'librarian')}
                                            className="btn btn-xs btn-outline btn-secondary text-black dark:text-secondary"
                                            title="Make Librarian"
                                        >
                                            <UserPlus size={14} /> Make Librarian
                                        </button>
                                    )}
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => changeRole(user, 'admin')}
                                            className="btn btn-xs btn-outline btn-primary dark:text-white"
                                            title="Make Admin">
                                                
                                            <ShieldPlus size={14} /> Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;