import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBox, FaMapMarkerAlt, FaCreditCard, FaCheckCircle, FaShoppingBag } from "react-icons/fa";

const paymentLabel = {
  cod: "Cash on Delivery",
  card: "Credit / Debit Card",
  upi: "UPI",
};

const paymentColor = {
  cod: "bg-orange-50 text-orange-700 border-orange-200",
  card: "bg-blue-50 text-blue-700 border-blue-200",
  upi: "bg-green-50 text-green-700 border-green-200",
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setOrders([]); setLoading(false); return; }
        const res = await axios.get("https://ecommerce-backend-6mko.onrender.com/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .order-card { animation: fadeUp 0.4s ease both; }

        .amz-btn-yellow {
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          color: #111;
          padding: 9px 24px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .amz-btn-yellow:hover {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="bg-white rounded-sm shadow-sm p-5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-amber-500" size={20} />
            <h1 className="text-2xl font-normal text-[#0F1111]">Your Orders</h1>
          </div>
          {!loading && orders.length > 0 && (
            <span className="text-sm text-gray-500">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-sm shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-sm" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No orders */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-sm shadow-sm p-14 text-center">
            <FaBox size={56} className="mx-auto text-gray-200 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-500 text-sm mb-6">Looks like you haven't placed any orders. Log in or start shopping!</p>
            <div className="flex gap-3 justify-center">
              <button className="amz-btn-yellow" onClick={() => navigate("/")}>Start Shopping</button>
              <button
                onClick={() => navigate("/login")}
                className="border border-[#d5d9d9] px-6 py-2 rounded-sm text-sm font-medium text-[#0F1111] hover:bg-gray-50 transition-all"
              >
                Sign in
              </button>
            </div>
          </div>
        )}

        {/* Orders list */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const orderTotal = order.products?.reduce((t, p) => t + p.price, 0) || 0;
              return (
                <div
                  key={index}
                  className="order-card bg-white rounded-sm shadow-sm overflow-hidden"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  {/* Order header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                      <div>
                        <p className="uppercase font-semibold tracking-wide text-gray-400 mb-0.5">Order Placed</p>
                        <p className="text-[#0F1111] font-medium">Order #{index + 1}</p>
                      </div>
                      <div>
                        <p className="uppercase font-semibold tracking-wide text-gray-400 mb-0.5">Total</p>
                        <p className="text-[#0F1111] font-medium">₹{orderTotal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="uppercase font-semibold tracking-wide text-gray-400 mb-0.5">Ship To</p>
                        <p className="text-[#0F1111] font-medium">{order.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" size={13} />
                      <span className="text-sm font-medium text-green-700">Delivered</span>
                    </div>
                  </div>

                  {/* Order body */}
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Products */}
                      <div className="flex-1">
                        <div className="space-y-4">
                          {order.products?.map((p, i) => (
                            <div key={i} className="flex gap-4 items-center">
                              {p.image && (
                                <div className="w-16 h-16 flex-shrink-0 border border-gray-100 rounded-sm bg-gray-50 overflow-hidden">
                                  <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#0F1111] line-clamp-1">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.category}</p>
                                <p className="text-sm font-medium text-[#0F1111] mt-0.5">₹{Number(p.price).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery info */}
                      <div className="md:w-56 space-y-3 text-sm">
                        <div className="flex gap-2 items-start">
                          <FaMapMarkerAlt size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-0.5">Delivery Address</p>
                            <p className="text-[#0F1111]">{order.address},</p>
                            <p className="text-[#0F1111]">{order.city} — {order.pincode}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-start">
                          <FaCreditCard size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-0.5">Payment</p>
                            <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${paymentColor[order.payment] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                              {paymentLabel[order.payment] || order.payment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;