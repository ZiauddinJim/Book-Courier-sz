import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { RiSecurePaymentFill } from "react-icons/ri";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId) {
                setError("Missing session ID. Payment cannot be verified.");
                setLoading(false);
                return;
            }
            try {
                const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
                if (res.data.success) {
                    setPaymentInfo({
                        trackingId: res.data.trackingId,
                        transactionId: res.data.transactionId,
                    });
                } else { setError("Payment verification failed."); }
            } catch (err) {
                console.error(err);
                setError("Unable to verify payment.");
            } finally { setLoading(false); }
        }

        verifyPayment();
    }, [sessionId, axiosSecure]);

    if (loading) return <Loading />
    if (error) return <div className="py-20 text-center text-red-500 text-xl font-semibold">{error}</div>

    return (
        <div className="py-20 m-10 px-20 rounded-3xl flex flex-col justify-center items-center mb-10">
            <RiSecurePaymentFill size={200} className="text-gray-700 dark:text-gray-300" />

            <p className="text-3xl font-bold my-5 text-gray-700 dark:text-gray-300">Payment Successful!</p>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Transaction ID: {paymentInfo?.transactionId}</p>
            <p className="text-xl font-semibold mb-5 text-gray-700 dark:text-gray-300">Tracking ID: {paymentInfo?.trackingId}</p>
            <div className="flex gap-5 justify-center">
                <Link to="/dashboard/orders" className="btn btn-primary font-bold">Back to My Orders</Link></div>
        </div>
    );
};

export default PaymentSuccess;
