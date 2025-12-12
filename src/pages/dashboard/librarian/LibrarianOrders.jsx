import React from 'react';
import { Package, Truck, CheckCircle, Ban } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';

const LibrarianOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch Orders for this Librarian's Books
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['librarian-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/librarian-orders/${user?.email}`);
            return res.data;
        }
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/handleStatusChange/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`Order status updated to ${newStatus}`);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const handleCancelOrder = async (id) => {
        if (confirm("Are you sure you want to cancel this order?")) {
            try {
                const res = await axiosSecure.patch(`/handleCancelOrder/${id}`, { status: 'cancelled' });
                if (res.data.modifiedCount > 0) {
                    toast.success("Order Cancelled");
                    refetch();
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to cancel order");
            }
        }
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
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="text-primary" /> Manage Orders ({orders.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Book Title</th>
                            <th>Date</th>
                            <th>payment Status</th>
                            <th>Current Status</th>
                            <th>Change Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="hover">
                                    <td className="font-mono text-xs opacity-70" title={order._id}>
                                        {order._id.substring(0, 8)}...
                                    </td>
                                    <td className="font-semibold">
                                        <div>{order.userName}</div>
                                        <div className="text-xs font-normal opacity-50">{order.userEmail}</div>
                                    </td>
                                    <td>{order.bookTitle}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td><span className={`badge ${order.paymentStatus === 'paid' ? 'badge-primary' : 'badge-info'} `}>{order.paymentStatus}</span></td>
                                    <td>
                                        <div className={`badge text-white gap-1 capitalize ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm w-full max-w-xs"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={order.status === 'delivered' || order.status === 'cancelled'}
                                        >
                                            <option value="pending" disabled>Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled" disabled>Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleCancelOrder(order._id)}
                                            className="btn btn-xs btn-error text-white"
                                            disabled={order.status === 'delivered' || order.status === 'shipped' || order.status === 'cancelled'}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-base-content/50">
                                    No orders found for your books.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibrarianOrders;
