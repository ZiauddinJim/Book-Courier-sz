import React from 'react';
import { Ban, CheckCircle, CreditCard, Package, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { TbCurrencyTaka } from 'react-icons/tb';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch Orders
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${user?.email}`);
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
                    const res = await axiosSecure.patch(`/orders/${id}`, { status: 'cancelled' });
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

    const handlePayment = async (order) => {
        // console.log(order);
        const response = await axiosSecure.post('/payment-checkout-session', order)
        window.location.assign(response.data.url);
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'shipped': return <Truck size={14} />;
            case 'delivered': return <CheckCircle size={14} />;
            case 'cancelled': return <Ban size={14} />;
            default: return <Package size={14} />;
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'badge-success';
            case 'shipped': return 'badge-info';
            case 'cancelled': return 'badge-error';
            default: return 'badge-warning';
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
            <h2 className="text-2xl font-bold mb-6">My Orders ({orders.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>No</th>
                            <th>Book Details</th>
                            <th>Order Date</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
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
                                    <td><span className={`badge ${order.paymentStatus === 'paid' ? 'badge-primary' : 'badge-info'} `}>{order.paymentStatus}</span></td>
                                    <td>
                                        <div className={`badge text-white gap-1 capitalize ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td><TbCurrencyTaka className='inline' />{order.price}</td>
                                    <td className="flex gap-2 items-center h-full my-auto">

                                        {/* Show buttons ONLY when unpaid + pending */}
                                        {order.paymentStatus === "unpaid" && order.status === "pending" && (
                                            <>
                                                {/* Pay Button */}
                                                <button
                                                    className="btn btn-xs btn-success text-white flex items-center gap-1"
                                                    onClick={() => handlePayment(order)}
                                                >
                                                    <CreditCard size={14} /> Pay Now
                                                </button>

                                                {/* Cancel Button */}
                                                <button
                                                    className="btn btn-xs btn-error text-white"
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
