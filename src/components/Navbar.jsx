import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { FaSearch, FaShoppingCart, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { useCategory } from "../context/CategoryContext";


const Navbar = ({ onRequireLogin,user,onLogout }) => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useSearch();
  const navigate = useNavigate();
  const {setCategory}=useCategory();

  const handleOrdersClick = () => {
    
    navigate("/orders");
    
  };

  return (
    <header className="sticky top-0 z-50">
      {/* 🔹 TOP NAV */}
      <div className="bg-[#0F172A] text-white px-6 py-3 flex items-center gap-5">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Shop<span className="text-amber-400">Kart</span>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm  cursor-pointer">
          < FaMapMarkerAlt className="text-white"/>
          <div className="leading-tight">
            <p className="text-gray-300">Deliver to</p>
            <p className="font-semibold">India</p>
          </div>
          
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center bg-gray-100 rounded-md overflow-hidden shadow-sm h-10">
          <select className="bg-gray-200 w-20 px-2 h-full text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-300  outline-none cursor-pointer border-r border-gray-300 transition">
            <option >All</option>
            <option >Electronics</option>
            <option >Fashion</option>
            <option >Home & Kitchen</option>
          </select>

          <input
            type="text"
            placeholder="Search ShopKart"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-black"
          />

          <button className="bg-amber-400 hover:bg-amber-500 px-4 py-3  transition">
            <FaSearch className="text-black" />
          </button>
        </div>

        {/* Language */}
        <div className="hidden md:block text-sm cursor-pointer">
          EN
        </div>

        {/* Account */}
        {user ? (
          <div className="text-sm leading-tight cursor-pointer">
            <p className="text-gray-300">Hello User 👋</p>
            <button
              onClick={onLogout}
              className="font-semibold text-yellow-400 hover:underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-sm leading-tight">
            <p className="text-gray-300">Hello, {user?"User":"Sign in"}</p>
            <p className="font-semibold">Account & Lists</p>
          </Link>
        )}


        {/* Orders */}
        <a
          // href="/orders"
          onClick={handleOrdersClick}
          className="text-sm leading-tight cursor-pointer"
        >
          <p className="text-gray-300">Returns</p>
          <p className="font-semibold">& Orders</p>
        </a>

        <Link to="/admin" className="text-sm leading-tight cursor-pointer">
          <p className="text-gray-300">Seller</p>
          <p className="font-semibold">Admin</p>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 font-semibold">
          <FaShoppingCart size={22} />
          <span>{cartItems.length}</span>
        </Link>
      </div>

      {/* 🔹 BOTTOM NAV */}
      <div className="bg-[#1E293B] text-white px-6 py-2 flex items-center gap-6 text-sm">
        <div
          onClick={() => setCategory("All")}
          className="flex items-center gap-2 cursor-pointer hover:underline"
        >
          <FaBars />
          <span>All</span>
        </div>

        <span onClick={() => setCategory("Electronics")} className="cursor-pointer hover:underline">
          Electronics
        </span>

        <span onClick={() => setCategory("Fashion")} className="cursor-pointer hover:underline">
          Fashion
        </span>

        <span onClick={() => setCategory("Grocery")} className="cursor-pointer hover:underline">
          Home & Kitchen
        </span>
      </div>

    </header>
  );
};

export default Navbar;
