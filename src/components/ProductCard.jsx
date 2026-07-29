import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaBolt } from "react-icons/fa";

// Fake star rating based on product id 
const getStars = (product) => {
  const ratings = [4.5, 4.0, 3.5, 5.0, 4.2, 3.8];
  const index = (product._id || product.id || "").toString().charCodeAt(0) % ratings.length;
  return ratings[index] || 4.0;
};

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="text-amber-400" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
    else stars.push(<FaRegStar key={i} className="text-amber-400" />);
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const ProductCard = ({ product, addToCart }) => {
  const rating = getStars(product);
  const reviewCount = Math.floor(Math.abs((product._id || "abc").toString().charCodeAt(1) * 37) % 9000) + 100;
  const originalPrice = Math.floor(product.price * 1.3);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="amazon-card group bg-white rounded-sm border border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer">

      <style>{`
        .amazon-card .add-btn {
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          color: #111;
          transition: all 0.2s;
        }
        .amazon-card .add-btn:hover {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .amazon-card .buynow-btn {
          background: linear-gradient(to bottom, #f4a460, #e88a2e);
          border: 1px solid #c7611a;
          color: #111;
          transition: all 0.2s;
        }
        .amazon-card .buynow-btn:hover {
          background: linear-gradient(to bottom, #f09040, #d97a20);
        }
        .amazon-card:hover .product-img {
          transform: scale(1.07);
        }
        .product-img {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .prime-badge {
          background: linear-gradient(135deg, #00a8e0, #0066c0);
        }
      `}</style>

      {/* Image area */}
      <div className="relative bg-white p-4 flex items-center justify-center h-52 overflow-hidden border-b border-gray-100">
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
            -{discount}%
          </div>
        )}

        {/* Prime badge */}
        <div className="prime-badge absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">
          prime
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="product-img w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">

        {/* Product name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-[#0F1111] leading-snug line-clamp-2 hover:text-[#c7511f] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>

        {/* Stars */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={rating} />
          <span className="text-xs text-[#007185] hover:text-[#c7511f] cursor-pointer">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-500">M.R.P.:</span>
            <span className="text-xs text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-medium text-[#0F1111]">₹</span>
            <span className="text-2xl font-medium text-[#0F1111]">
              {Number(product.price).toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-[#007600] font-medium mt-0.5">
            You Save: ₹{(originalPrice - product.price).toLocaleString()} ({discount}%)
          </p>
        </div>

        {/* Delivery */}
        <p className="text-xs text-[#565959] mt-1">
          FREE delivery by <span className="font-semibold text-[#0F1111]">Tomorrow</span>
        </p>

        {/* In stock */}
        <p className="text-sm text-[#007600] font-medium mt-1">In Stock</p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-3">
          <button
            onClick={() => addToCart(product)}
            className="add-btn w-full py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2"
          >
            <FaShoppingCart size={13} />
            Add to Cart
          </button>

          <Link to={`/product/${product._id}`}>
            <button className="buynow-btn w-full py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2">
              <FaBolt size={12} />
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;