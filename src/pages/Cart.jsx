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

  // Calculate total amount in paise (Razorpay expects amount in smallest currency unit)
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const amountInPaise = totalAmount * 100; // Convert to paise
      const res = await axios.post(
        "https://vision-backend-lx5i.onrender.com/api/v1/payment/order",
        { amount: amountInPaise },
        {
          headers: {
            Authorization: auth?.token,
            "content-type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.data.data && res.data.data.id) {
        handlePaymentVerify(res.data);
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Payment initiation failed");
    }
  };

  const handlePaymentVerify = (orderData) => {
    const options = {
      key: "rzp_test_JXUogzUXrfcpxh",
      amount: orderData.amount,
      currency: "INR",
      name: "Vision Media Pvt Ltd",
      order_id: orderData.id,
      handler: async (response) => {
        console.log(response);
        try {
          // Verify all parameters exist
          if (!response.razorpay_payment_id || !response.razorpay_order_id) {
            throw new Error("Incomplete payment response");
          }

          const verificationRes = await axios.post(
            "https://vision-backend-lx5i.onrender.com/api/v1/payment/verify",
            response // Send full response object
          );

          if (verificationRes.data.success) {
            // Clear cart
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/orders");
          }
        } catch (err) {
          console.error("Verification failed:", err);
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
              onClick={handlePayment}
              className="p-3 m-2 bg-red-400 text-xl rounded-md w-full font-semibold font-sans"
              disabled={cart.length === 0}
            >
              Proceed to Buy
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
