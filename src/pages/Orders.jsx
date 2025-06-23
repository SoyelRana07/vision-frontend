import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/v1/order/user-orders', {
                    headers: {
                        Authorization: auth?.token
                    }
                });
                setOrders(data?.orders || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to load orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [auth, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

                {!orders || orders.length === 0 ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
                        <button
                            onClick={() => navigate('/category')}
                            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                Order #{order._id?.slice(-6).toUpperCase()}
                                            </h2>
                                            <p className="text-gray-600">
                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Order Details</h3>
                                        <div className="space-y-4">
                                            {order.products?.map((product) => (
                                                <div key={product._id} className="flex items-center space-x-4">
                                                    <img
                                                        src={product.product?.images?.[0] || 'https://via.placeholder.com/80'}
                                                        alt={product.product?.name || 'Product'}
                                                        className="w-20 h-20 object-cover rounded-md"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-gray-900 font-medium">{product.product?.name || 'Product'}</h4>
                                                        <p className="text-gray-600">Quantity: {product.quantity || 0}</p>
                                                        <p className="text-gray-600">Price: ₹{product.price || 0}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-600">Shipping Address:</p>
                                                <p className="text-gray-900">{order.shippingAddress?.address || 'N/A'}</p>
                                                <p className="text-gray-900">
                                                    {order.shippingAddress?.city || 'N/A'}, {order.shippingAddress?.state || 'N/A'}
                                                </p>
                                                <p className="text-gray-900">{order.shippingAddress?.pincode || 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-600">Total Amount:</p>
                                                <p className="text-xl font-semibold text-gray-900">₹{order.totalAmount || 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders; 