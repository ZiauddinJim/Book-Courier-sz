import React from 'react';
import { CreditCard, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../components/Spinner';
import { TbCurrencyTaka } from 'react-icons/tb';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { user } = useAuth();
    const axios = useAxios();

    // Fetch Orders
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/orders/${user?.email}`);
            return res.data;
        }
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send status 'cancelled'
                    const res = await axios.patch(`/orders/${id}`, { status: 'cancelled' });
                    if (res.data.modifiedCount > 0 || res.data.success) {
                        refetch();
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your order has been cancelled.",
                            icon: "success"
                        });
                    } else {
                        toast.error("Could not cancel order");
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to cancel order");
                }
            }
        });
    };


    if (isLoading) return <Spinner />;

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
            <h2 className="text-2xl font-bold mb-6">My Orders ({orders.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Book Details</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={order.bookImage} alt={order.bookTitle} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{order.bookTitle}</div>
                                                <div className="text-sm opacity-50">Qty: 1</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${order.status === 'paid' ? 'badge-success' :
                                            order.status === 'pending' ? 'badge-warning' : 'badge-error'
                                            } badge-sm capitalize text-white`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td><TbCurrencyTaka className='inline' />{order.price}</td>
                                    <td className="flex gap-2 items-center h-full my-auto">
                                        {order.status === 'pending' && (
                                            <>
                                                <button
                                                    className="btn btn-xs btn-success text-white"
                                                    title="Pay Now"
                                                    onClick={() => toast.success("Payment gateway integration required")}
                                                >
                                                    <CreditCard size={14} /> Pay
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-error text-white"
                                                    title="Cancel Order"
                                                    onClick={() => handleCancel(order._id)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
