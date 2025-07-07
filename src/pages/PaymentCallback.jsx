import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentCallback() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Parse query params from URL (HDFC may POST or redirect with params)
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("order_id") || params.get("orderId");
        // Optionally, you may want to parse more params (status, txn_id, etc.)

        if (orderId) {
            // Call backend to verify payment
            axios.post("/api/v1/payment/hdfc/callback", { order_id: orderId })
                .then(res => {
                    if (res.data && res.data.status && res.data.status.status === "CHARGED") {
                        setStatus("success");
                        setMessage("Payment successful! Thank you for your order.");
                        setTimeout(() => navigate("/"), 3000);
                    } else {
                        setStatus("failed");
                        setMessage("Payment failed or not completed. Please try again.");
                        setTimeout(() => navigate("/cart"), 4000);
                    }
                })
                .catch(() => {
                    setStatus("failed");
                    setMessage("Payment verification failed. Please contact support.");
                    setTimeout(() => navigate("/cart"), 4000);
                });
        } else {
            setStatus("failed");
            setMessage("Missing order information. Please contact support.");
            setTimeout(() => navigate("/cart"), 4000);
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className={`text-3xl font-bold mb-4 ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                {status === "success" ? "Payment Success" : "Payment Failed"}
            </h1>
            <p className="text-lg mb-8">{message}</p>
            <div className="text-gray-500">You will be redirected shortly...</div>
        </div>
    );
}

export default PaymentCallback; 