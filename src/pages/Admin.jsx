import { useState,useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { FaBoxOpen, FaRupeeSign, FaImage, FaTag, FaList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Admin = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "", price: "", image: "", description: "", category: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', msg }
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/products", formData);
      fetchProducts();
      showToast("success", "Product uploaded successfully!");
      setFormData({ name: "", price: "", image: "", description: "", category: "" });
      setPreview("");
    } catch (err) {
      console.error("Error uploading product:", err);
      showToast("error", "Failed to upload product. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/products");
        setProducts(res.data);
    } catch (err) {
        console.error(err);
    }
    };

    useEffect(() => {
    fetchProducts();
    }, []);

    const handleDelete = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/products/${id}`);

        setProducts(products.filter((p) => p._id !== id));

        showToast("success", "Product deleted!");
    } catch (err) {
        console.error(err);
        showToast("error", "Delete failed");
    }
    };

  const categories = ["Electronics", "Fashion", "Home & Kitchen"];

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <style>{`
        .amz-input {
          width: 100%;
          border: 1px solid #a6a6a6;
          border-radius: 3px;
          padding: 9px 12px 9px 36px;
          font-size: 14px;
          outline: none;
          background: white;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .amz-input:focus {
          border-color: #e77600;
          box-shadow: 0 0 0 3px rgba(228,121,17,0.25);
        }
        .amz-input-plain {
          width: 100%;
          border: 1px solid #a6a6a6;
          border-radius: 3px;
          padding: 9px 12px;
          font-size: 14px;
          outline: none;
          background: white;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .amz-input-plain:focus {
          border-color: #e77600;
          box-shadow: 0 0 0 3px rgba(228,121,17,0.25);
        }
        .amz-btn {
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          color: #111;
          width: 100%;
          padding: 10px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .amz-btn:hover:not(:disabled) {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
        .amz-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .toast { animation: slideDown 0.3s ease; }
      `}</style>

      {/* Top admin bar */}
      <div className="bg-[#232f3e] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaBoxOpen size={18} className="text-amber-400" />
          <span className="font-semibold text-lg">ShopKart <span className="text-amber-400">Admin</span></span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-700 px-3 py-1 rounded-full">Seller Panel</span>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-sm shadow-lg text-sm font-medium
          ${toast.type === "success" ? "bg-green-50 border border-green-300 text-green-800" : "bg-red-50 border border-red-300 text-red-800"}`}>
          {toast.type === "success"
            ? <FaCheckCircle className="text-green-600" />
            : <FaTimesCircle className="text-red-500" />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT: Form */}
          <div className="flex-1 bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#232f3e] to-[#37475A] text-white px-5 py-3 flex items-center gap-2">
              <FaBoxOpen size={14} />
              <span className="font-semibold text-sm">Add New Product</span>
            </div>

            <div className="p-6 space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1111] mb-1 uppercase tracking-wide">Product Name</label>
                <div className="relative">
                  <FaTag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="amz-input" type="text" name="name" value={formData.name}
                    onChange={handleChange} placeholder="e.g. Wireless Bluetooth Headphones" required />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1111] mb-1 uppercase tracking-wide">Price (₹)</label>
                <div className="relative">
                  <FaRupeeSign size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="amz-input" type="number" name="price" value={formData.price}
                    onChange={handleChange} placeholder="e.g. 2499" required min="0" />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1111] mb-1 uppercase tracking-wide">Image URL</label>
                <div className="relative">
                  <FaImage size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="amz-input" type="text" name="image" value={formData.image}
                    onChange={handleChange} placeholder="https://..." />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1111] mb-1 uppercase tracking-wide">Category</label>
                <div className="relative">
                  <FaList size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="amz-input appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1111] mb-1 uppercase tracking-wide">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short product description..."
                  className="amz-input-plain resize-none"
                />
              </div>

              <button type="button" onClick={handleSubmit} className="amz-btn" disabled={loading}>
                {loading ? "Uploading..." : "Upload Product"}
              </button>
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div className="lg:w-72">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#232f3e] to-[#37475A] text-white px-5 py-3">
                <span className="font-semibold text-sm">Live Preview</span>
              </div>
              <div className="p-4">
                {/* Image preview */}
                <div className="w-full h-44 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center mb-4 overflow-hidden">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-contain"
                      onError={() => setPreview("")} />
                  ) : (
                    <div className="text-center text-gray-300">
                      <FaImage size={40} />
                      <p className="text-xs mt-2">Image preview</p>
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium text-[#0F1111] line-clamp-2">
                  {formData.name || <span className="text-gray-300">Product name</span>}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {formData.description || "Product description"}
                </p>

                {formData.price && (
                  <p className="text-xl font-medium text-[#0F1111] mt-2">
                    ₹{Number(formData.price).toLocaleString()}
                  </p>
                )}
                {formData.category && (
                  <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                    {formData.category}
                  </span>
                )}

                <button
                onClick={() => {
                    if (!formData.name || !formData.price) return;
                    addToCart({
                    ...formData,
                    _id: Date.now(),
                    });
                }}
                className="mt-4 w-full py-2 rounded-full text-sm font-medium text-center bg-yellow-400 hover:bg-yellow-500 transition"
                >
                    Add to Cart
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Product List */}
            <div className="mt-10 bg-white p-5 rounded shadow">
            <h2 className="text-lg font-bold mb-4">All Products</h2>

            <div className="space-y-3">
                {products.map((product) => (
                <div
                    key={product._id}
                    className="flex items-center justify-between border p-3 rounded"
                >
                    <div className="flex items-center gap-3">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain"
                    />

                    <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                        ₹{product.price}
                        </p>
                    </div>
                    </div>

                    <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                    Delete
                    </button>
                </div>
                ))}
            </div>
            </div>

      </div>
    </div>
  );
};

export default Admin;