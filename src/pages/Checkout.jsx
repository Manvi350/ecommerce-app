import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaMapMarkerAlt, FaCreditCard, FaMobileAlt, FaTruck } from "react-icons/fa";

const Checkout = () => {
  const [formdata, setFormdata] = useState({
    name: "", email: "", address: "", city: "", pincode: "", payment: "cod"
  });
  const [placing, setPlacing] = useState(false);

  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    const dataToSend = {
      ...formdata,
      pincode: String(formdata.pincode),
      products: cartItems.map(item => ({
        name: item.name, price: item.price,
        image: item.image, description: item.description, category: item.category
      })),
      userId: "123"
    };
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/checkout", dataToSend, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      if (error.response) console.error("Checkout error:", error.response.data);
      else console.error("Checkout error:", error.message);
      alert("Failed to place order. Please check console.");
    } finally {
      setPlacing(false);
    }
  };

  const getTotal = () => cartItems.reduce((t, i) => t + i.price, 0);

  const paymentIcons = {
    cod: <FaTruck className="text-amber-500" />,
    card: <FaCreditCard className="text-blue-500" />,
    upi: <FaMobileAlt className="text-green-500" />,
  };

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <style>{`
        .amz-input {
          width: 100%;
          border: 1px solid #a6a6a6;
          border-radius: 3px;
          padding: 8px 10px;
          font-size: 14px;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .amz-input:focus {
          border-color: #e77600;
          box-shadow: 0 0 0 3px rgba(228,121,17,0.25);
        }
        .amz-btn-yellow {
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          color: #111;
          transition: all 0.2s;
        }
        .amz-btn-yellow:hover:not(:disabled) {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
        .amz-btn-yellow:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .step-header {
          background: linear-gradient(to right, #232f3e, #37475A);
          color: white;
          padding: 10px 16px;
          border-radius: 3px 3px 0 0;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .payment-option {
          border: 1px solid #d5d9d9;
          border-radius: 3px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap-10px;
        }
        .payment-option:hover {
          background: #fafafa;
          border-color: #e77600;
        }
        .payment-option.selected {
          border-color: #e77600;
          background: #fffbf5;
          box-shadow: 0 0 0 2px rgba(228,121,17,0.2);
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaLock className="text-gray-500" size={14} />
          <h1 className="text-2xl font-normal text-[#0F1111]">Secure Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* LEFT: Form */}
          <div className="flex-1 space-y-4">

            {/* Step 1: Address */}
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <div className="step-header">
                <FaMapMarkerAlt size={13} />
                Step 1 — Delivery Address
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Full Name</label>
                  <input className="amz-input" type="text" name="name" value={formdata.name} onChange={handlechange} required placeholder="ABC" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Email</label>
                  <input className="amz-input" type="email" name="email" value={formdata.email} onChange={handlechange} required placeholder="abc@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Street Address</label>
                  <input className="amz-input" name="address" value={formdata.address} onChange={handlechange} required placeholder="House No, Street, Area" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">City</label>
                  <input className="amz-input" type="text" name="city" value={formdata.city} onChange={handlechange} required placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Pincode</label>
                  <input className="amz-input" type="text" name="pincode" value={formdata.pincode} onChange={handlechange} required placeholder="400001" maxLength={6} />
                </div>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <div className="step-header">
                <FaCreditCard size={13} />
                Step 2 — Payment Method
              </div>
              <div className="p-5 space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives" },
                  { value: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                  { value: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`payment-option flex items-center gap-3 cursor-pointer ${formdata.payment === opt.value ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={formdata.payment === opt.value}
                      onChange={handlechange}
                      className="accent-amber-500"
                    />
                    <span className="text-xl">{paymentIcons[opt.value]}</span>
                    <div>
                      <p className="text-sm font-medium text-[#0F1111]">{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:w-80 w-full">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden sticky top-24">
              <div className="step-header">Order Summary</div>
              <div className="p-5">
                {/* Items */}
                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4 max-h-56 overflow-y-auto">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain border border-gray-100 rounded-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#0F1111] line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <p className="text-sm font-medium text-[#0F1111] whitespace-nowrap">₹{Number(item.price).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 text-sm border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cartItems.length})</span>
                    <span>₹{getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-base mb-5">
                  <span>Order Total</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>

                <button
                  onClick={handlesubmit}
                  disabled={placing || cartItems.length === 0}
                  className="amz-btn-yellow w-full py-2.5 rounded-sm font-medium flex items-center justify-center gap-2 text-sm"
                >
                  <FaLock size={11} />
                  {placing ? "Placing Order..." : "Place your order"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  By placing your order, you agree to ShopKart's privacy policy and conditions of use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;