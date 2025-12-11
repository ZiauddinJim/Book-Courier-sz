import React from 'react';
import { FileText } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import { TbCurrencyTaka } from 'react-icons/tb';

const Invoices = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: invoices = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
            <div className="flex items-center gap-2 mb-6 text-2xl font-bold text-base-content">
                <FileText className="text-primary" />
                <h2>Invoices & Payments</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Book</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length > 0 ? (
                            invoices.map((inv) => (
                                <tr key={inv._id} className="hover">
                                    <td className="font-mono text-xs opacity-70" title={inv.transactionId}>
                                        {inv.transactionId ? inv.transactionId.substring(0, 15) + '...' : 'N/A'}
                                    </td>
                                    <td>
                                        {inv.paidAt ? new Date(inv.paidAt).toLocaleDateString() : 'N/A'}
                                        <div className="text-xs opacity-50">
                                            {inv.paidAt ? new Date(inv.paidAt).toLocaleTimeString() : ''}
                                        </div>
                                    </td>
                                    <td className="font-medium">{inv.bookTitle}</td>
                                    <td className="font-bold flex items-center">
                                        <TbCurrencyTaka className="inline text-lg" />
                                        {(inv.amount).toFixed(2)}
                                    </td>
                                    <td>
                                        <div className="badge badge-success text-white badge-sm capitalize">
                                            {inv.paymentStatus}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-base-content/50">
                                    No invoices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
