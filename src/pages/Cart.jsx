import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaLock } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);
  const getTotalItems = () => cartItems.length;

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <style>{`
        .amz-btn-yellow {
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          color: #111;
        }
        .amz-btn-yellow:hover {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-normal text-[#0F1111] mb-4 border-b border-gray-300 pb-4">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-sm shadow-sm text-center">
            <FaShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/">
              <button className="amz-btn-yellow px-8 py-2 rounded-sm font-medium transition-all">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Cart Items */}
            <div className="flex-1 bg-white rounded-sm shadow-sm p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                <h2 className="text-lg font-medium">
                  Cart ({getTotalItems()} {getTotalItems() === 1 ? "item" : "items"})
                </h2>
                <span className="text-sm text-gray-500">Price</span>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 py-5">
                    {/* Image */}
                    <div className="w-28 h-28 flex-shrink-0 bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <Link to={`/product/${item._id}`}>
                        <h3 className="text-base font-medium text-[#0F1111] hover:text-[#c7511f] line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-green-700 font-medium mt-1">In Stock</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>

                      {/* Eligible for Prime */}
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs bg-[#00a8e0] text-white px-1.5 py-0.5 rounded-sm font-bold">prime</span>
                        <span className="text-xs text-gray-500">FREE delivery</span>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(index)}
                        className="mt-3 flex items-center gap-1 text-sm text-[#c7511f] hover:text-red-700 hover:underline transition-colors"
                      >
                        <FaTrash size={11} />
                        Remove
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-medium text-[#0F1111]">₹{Number(item.price).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Total (bottom) */}
              <div className="text-right mt-4 pt-4 border-t border-gray-200">
                <p className="text-lg">
                  Subtotal ({getTotalItems()} items):{" "}
                  <span className="font-semibold">₹{getTotalPrice().toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-72">
              <div className="bg-white rounded-sm shadow-sm p-5 sticky top-24">
                <p className="text-sm text-green-700 font-medium mb-3">
                  ✅ Your order is eligible for FREE Delivery.
                </p>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <p className="text-lg">
                    Subtotal ({getTotalItems()} items):{" "}
                    <span className="font-semibold">₹{getTotalPrice().toLocaleString()}</span>
                  </p>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="amz-btn-yellow w-full py-2 rounded-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaLock size={12} />
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;