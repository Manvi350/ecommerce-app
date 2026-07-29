import Product3DViewer from "../components/Product3DViewer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaBolt, FaShieldAlt, FaTruck, FaUndo, FaCheckCircle } from "react-icons/fa";

const getStars = (product) => {
  const ratings = [4.5, 4.0, 3.5, 5.0, 4.2, 3.8];
  const index = (product._id || product.id || "").toString().charCodeAt(0) % ratings.length;
  return ratings[index] || 4.0;
};

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((i) =>
      rating >= i ? <FaStar key={i} className="text-amber-400" size={15} /> :
      rating >= i - 0.5 ? <FaStarHalfAlt key={i} className="text-amber-400" size={15} /> :
      <FaRegStar key={i} className="text-amber-400" size={15} />
    )}
  </div>
);

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/products/${id}`)
      .then((res) => { setProduct(res.data); setLoading(false); })
      .catch((err) => { console.error("Error fetching product", err); setLoading(false); });
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-sm shadow-sm p-8 flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-80 h-80 bg-gray-200 rounded-sm" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-20 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center">
      <div className="bg-white p-12 rounded-sm shadow-sm text-center">
        <p className="text-2xl mb-2">😕</p>
        <p className="text-lg font-medium text-gray-700">Product not found</p>
        <button onClick={() => navigate("/")} className="mt-4 amz-btn-yellow px-6 py-2 rounded-sm text-sm font-medium">
          Back to Home
        </button>
      </div>
    </div>
  );

  const rating = getStars(product);
  const reviewCount = Math.floor(Math.abs((product._id || "abc").toString().charCodeAt(1) * 37) % 9000) + 100;
  const originalPrice = Math.floor(product.price * 1.3);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <style>{`
        .amz-btn-yellow {
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          color: #111;
          transition: all 0.2s;
          cursor: pointer;
        }
        .amz-btn-yellow:hover {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
        .amz-btn-orange {
          background: linear-gradient(to bottom, #f4a460, #e88a2e);
          border: 1px solid #c7611a;
          color: #111;
          transition: all 0.2s;
          cursor: pointer;
        }
        .amz-btn-orange:hover {
          background: linear-gradient(to bottom, #f09040, #d97a20);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease both; }
      `}</style>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-2 text-xs text-[#007185]">
        <span className="cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
        <span className="mx-1 text-gray-400">›</span>
        <span className="text-gray-500">{product.category}</span>
        <span className="mx-1 text-gray-400">›</span>
        <span className="text-gray-700 line-clamp-1">{product.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="fade-in flex flex-col lg:flex-row gap-4">

          {/* LEFT: Image */}
          <div className="bg-white rounded-sm shadow-sm p-6 flex items-center justify-center lg:w-96 h-96 sticky top-20 self-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* MIDDLE: Details */}
          <div className="flex-1 bg-white rounded-sm shadow-sm p-6">
            {/* Title */}
            <h1 className="text-xl font-medium text-[#0F1111] leading-snug mb-2">{product.name}</h1>

            {/* Brand / Category */}
            <p className="text-sm text-[#007185] hover:underline cursor-pointer mb-3">
              Visit the <span className="font-medium">{product.category}</span> Store
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <StarRating rating={rating} />
              <span className="text-sm text-[#007185] hover:text-[#c7511f] cursor-pointer hover:underline">
                {rating} out of 5
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-[#007185] cursor-pointer hover:underline">
                {reviewCount.toLocaleString()} ratings
              </span>
            </div>

            {/* Price */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs text-gray-500">M.R.P.:</span>
                <span className="text-sm text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                <span className="text-sm text-red-600 font-medium">-{discount}%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-medium text-[#0F1111]">₹{Number(product.price).toLocaleString()}</span>
              </div>
              <p className="text-sm text-[#007600] mt-1">
                You Save: ₹{(originalPrice - product.price).toLocaleString()} ({discount}%)
              </p>
              <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-[#0F1111] mb-2">About this item</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Delivery info */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <FaTruck size={13} className="text-gray-500" />
                <span>FREE delivery by <span className="font-semibold text-[#0F1111]">Tomorrow</span></span>
              </div>
              <div className="flex items-center gap-2">
                <FaUndo size={13} className="text-gray-500" />
                <span>10 days returnable</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt size={13} className="text-gray-500" />
                <span>1 Year Warranty</span>
              </div>
            </div>

            {/* 3D Viewer if exists */}
            {Product3DViewer && (
              <div className="mt-2">
                <Product3DViewer imageURL={product.image} />
              </div>
            )}
          </div>

          {/* RIGHT: Buy box */}
          <div className="lg:w-64">
            <div className="bg-white rounded-sm shadow-sm p-5 sticky top-20">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-medium text-[#0F1111]">₹{Number(product.price).toLocaleString()}</span>
              </div>
              <p className="text-sm text-[#007600] font-medium mb-1">FREE Delivery</p>
              <p className="text-xs text-gray-500 mb-3">Deliver to India</p>

              <div className="flex items-center gap-2 mb-4">
                <FaCheckCircle className="text-green-600" size={13} />
                <span className="text-sm text-green-700 font-medium">In Stock</span>
              </div>

              {/* Qty selector */}
              <div className="mb-4">
                <label className="text-xs text-gray-500 block mb-1">Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-[#a6a6a6] rounded-sm px-3 py-1.5 text-sm bg-gray-50 outline-none focus:border-[#e77600] focus:shadow-sm w-full"
                >
                  {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="amz-btn-yellow w-full py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 mb-3"
              >
                {addedToCart ? (
                  <><FaCheckCircle size={13} /> Added!</>
                ) : (
                  <><FaShoppingCart size={13} /> Add to Cart</>
                )}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="amz-btn-orange w-full py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2"
              >
                <FaBolt size={12} />
                Buy Now
              </button>

              {/* Security note */}
              <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
                <FaShieldAlt size={10} />
                <span>Secure transaction</span>
              </div>

              <div className="mt-3 text-xs space-y-1 text-gray-600">
                <p><span className="font-medium">Ships from</span> ShopKart</p>
                <p><span className="font-medium">Sold by</span> ShopKart</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;