import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../context/CartContext";

function Cart() {
  const [auth] = useAuth();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, setCart } =
    useCart();
  const navigate = useNavigate();
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Calculate total amount (assume price is in paise, convert to INR for HDFC)
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // HDFC Payment Handler
  const handleHdfcPayment = async () => {
    try {
      console.log("Clicked HDFC Pay");
      if (!auth?.user) {
        toast.error("Please login to proceed with payment");
        navigate("/login");
        return;
      }
      if (cart.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      // Generate unique customer_id
      let customer_id = auth.user._id || auth.user.email || ("guest_" + Math.random().toString(36).substring(2, 10));
      // Generate unique orderId <= 21 chars
      const ts = Date.now().toString(36);
      const rand = Math.random().toString(36).substring(2, 6);
      const orderId = ("ORD" + ts + rand).substring(0, 21);
      // Prepare customer details
      const customer = {
        customer_id,
        customer_email: auth.user.email,
        customer_phone: auth.user.phone || "", // fallback if phone not present
        customer_name: auth.user.name,
      };
      // Calculate total amount (HDFC expects in INR, not paise)
      const amount = totalAmount; // Send as INR, do not convert
      // Set your backend callback URL as the return_url so the payment gateway POSTs to the backend, not the frontend
      // The backend will then redirect to the frontend callback page with order_id as a query param
      const redirectUrl = "https://vision-backend-328443733915.asia-south2.run.app/api/v1/payment/hdfc/callback";
      // Prepare product details for logging
      const products = cart.map(item => ({
        product_id: item._id,
        name: item.name || item.title || item.productName || "Unknown Product",
        price: item.price,
        quantity: item.quantity,
      }));
      console.log("Products to send:", products);
      // Call backend to initiate HDFC payment
      const res = await axios.post(
        "https://vision-backend-328443733915.asia-south2.run.app/api/v1/payment/hdfc/initiate",
        { amount, customer, orderId, redirectUrl, products },
        {
          headers: {
            Authorization: auth?.token,
            "content-type": "application/json",
          },
        }
      );
      console.log("HDFC response:", res.data);
      const paymentUrl = res.data.payment_url || (res.data.session && res.data.session.payment_links && res.data.session.payment_links.web);
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("HDFC Payment initiation error:", error);
      toast.error("HDFC Payment initiation failed");
    }
  };

  const handleCartItem = (pid) => {
    try {
      const myCart = [...cart];
      let idx = myCart.findIndex((item) => item._id === pid);
      myCart.splice(idx, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Product removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">
          {`Hello ${auth?.user?.name ? auth.user.name : ""}, you have ${cart?.length
            } Products in your cart`}
        </h1>
        {!auth?.token && (
          <button
            className="mt-5 btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login to Checkout
          </button>
        )}
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Cart Section */}
          <div className="md:col-span-2 lg:col-span-8 bg-blue-50 p-6 rounded-lg shadow-md">
            {cart.length === 0 ? (
              <p className="text-center text-xl">Your cart is empty</p>
            ) : (
              <div className="grid md:grid-cols-1 grid-cols-2 gap-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center sm:flex-row sm:items-start bg-white p-4 rounded-lg shadow-md"
                  >
                    {/* Image Section */}
                    <img
                      src={item.photo[0].split(",")[0]}
                      alt={item.name}
                      className="w-28 h-28 object-cover mb-4 sm:mb-0 sm:mr-4"
                    />

                    {/* Product Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <p>
                        {item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      <div className="flex justify-center sm:justify-start items-center mt-2">
                        {/* Quantity Controls */}
                        <button
                          className="p-2 border rounded-l"
                          onClick={() => decreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        <span className="px-4 border-t border-b">
                          {item.quantity}
                        </span>
                        <button
                          className="p-2 border rounded-r"
                          onClick={() => increaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="p-2 bg-red-500 text-white rounded mt-4 sm:mt-0 sm:ml-4"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="md:col-span-2 lg:col-span-4 bg-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Product Summary</h2>
            <p className="text-lg">
              <span className="font-semibold">Total Product:</span>{" "}
              {cart.length}
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Total Price:</span>{" "}
              {totalAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </p>

            <button
              onClick={handleHdfcPayment}
              className="p-3 m-2 bg-blue-600 text-xl rounded-md w-full font-semibold font-sans text-white"
              disabled={cart.length === 0}
            >
              Proceed to Pay (HDFC)
            </button>
            {auth?.user?.address ? (
              <div className="mt-4">
                <h4 className="text-xl font-semibold">Delivery Address:</h4>
                <h5 className="text-md">{auth?.user?.address}</h5>
              </div>
            ) : (
              <div className="mt-4">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning w-full"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning w-full"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
