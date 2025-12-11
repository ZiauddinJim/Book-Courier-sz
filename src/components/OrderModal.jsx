import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';

const OrderModal = ({ book, isOpen, onClose }) => {
    const { user } = useAuth();
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phone || !address) {
            return toast.error("Please fill all required fields");
        }

        const orderData = {
            bookId: book._id,
            bookTitle: book.title,
            bookImage: book.image,
            price: book.price,
            userEmail: user?.email,
            userName: user?.displayName,
            phone,
            address,
            status: "pending",
            paymentStatus: "unpaid",
            orderDate: new Date(),
            transactionId: "" // Will be filled after payment
        };

        try {
            setLoading(true);
            const res = await axiosSecure.post('/orders', orderData);
            if (res.data.insertedId) {
                toast.success('Order placed successfully! Please pay to confirm.');
                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal modal-bottom sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button>

                <h3 className="font-bold text-lg mb-2">Place Order</h3>
                <h4 className="text-sm font-semibold text-gray-500 mb-6">{book.title}</h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* User Info (Read-only) */}
                    <div>
                        <label className="label py-1"><span className="label-text">Name</span></label>
                        <input type="text" value={user?.displayName || ''} readOnly className="input input-sm input-bordered w-full bg-gray-100" />
                    </div>
                    <div>
                        <label className="label py-1"><span className="label-text">Email</span></label>
                        <input type="text" value={user?.email || ''} readOnly className="input input-sm input-bordered w-full bg-gray-100" />
                    </div>

                    {/* Inputs */}
                    <div>
                        <label className="label py-1"><span className="label-text">Phone Number *</span></label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="input input-sm input-bordered w-full"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label py-1"><span className="label-text">Address *</span></label>
                        <textarea
                            placeholder="Enter your delivery address"
                            className="textarea textarea-bordered w-full"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="modal-action mt-6">
                        <button type="button" onClick={onClose} className="btn" disabled={loading}>Close</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Place Order"}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </div>
    );
};

export default OrderModal;
