import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentCallback() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("order_id") || params.get("orderId");

        if (orderId) {
            axios.get(`https://vision-backend-lx5i.onrender.com/api/v1/payment/status?order_id=${orderId}`)
                .then(res => {
                    if (
                        res.data &&
                        res.data.status === "success" &&
                        res.data.order &&
                        res.data.order.status === "CHARGED"
                    ) {
                        setOrderDetails(res.data.order);
                        setStatus("success");
                        setMessage("Payment processed! Thank you for your order.");
                    } else {
                        setStatus("failed");
                        setMessage("Payment failed or not completed. Please try again.");
                    }
                })
                .catch(() => {
                    setStatus("failed");
                    setMessage("Payment verification failed. Please contact support.");
                });
        } else {
            setStatus("failed");
            setMessage("Missing order information. Please contact support.");
        }
    }, [navigate]);

    const handleOk = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className={`text-3xl font-bold mb-4 ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                {status === "success" ? "Payment Success" : "Payment Failed"}
            </h1>
            <p className="text-lg mb-4">{message}</p>
            {status === "success" && orderDetails && (
                <div className="mb-6 p-4 border rounded bg-gray-50 w-full max-w-md">
                    <div><b>Order ID:</b> {orderDetails.order_id}</div>
                    <div><b>Status:</b> {orderDetails.status}</div>
                    <div><b>Amount:</b> {orderDetails.amount}</div>
                    <div><b>Payment ID:</b> {orderDetails.id}</div>
                    <div><b>Payment Method:</b> {orderDetails.payment_method || 'N/A'}</div>
                    {/* Add more fields as needed */}
                </div>
            )}
            <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={handleOk}
            >
                OK
            </button>
        </div>
    );
}

export default PaymentCallback; 