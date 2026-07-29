import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope } from "react-icons/fa";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/auth/register", form, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] flex flex-col items-center justify-center px-4 py-10">
      <style>{`
        .amz-input {
          width: 100%;
          border: 1px solid #a6a6a6;
          border-radius: 3px;
          padding: 9px 10px 9px 36px;
          font-size: 14px;
          outline: none;
          background: white;
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
          width: 100%;
          padding: 9px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .amz-btn-yellow:hover:not(:disabled) {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
        .amz-btn-yellow:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-[#0F1111] mb-6">
        Shop<span className="text-amber-400">Kart</span>
      </Link>

      {/* Card */}
      <div className="bg-white border border-[#d5d9d9] rounded-sm p-8 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-medium text-[#0F1111] mb-1">Create account</h1>
        <p className="text-xs text-gray-500 mb-5">Already have an account? <Link to="/login" className="text-[#007185] hover:underline hover:text-[#c7511f]">Sign in</Link></p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#0F1111] mb-1">Your name</label>
            <div className="relative">
              <FaUser size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="amz-input"
                name="name"
                placeholder="First and last name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#0F1111] mb-1">Email</label>
            <div className="relative">
              <FaEnvelope size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="amz-input"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#0F1111] mb-1">Password</label>
            <div className="relative">
              <FaLock size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="amz-input pr-10"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="At least 6 characters"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Passwords must be at least 6 characters.</p>
          </div>

          <button type="submit" className="amz-btn-yellow" disabled={loading}>
            {loading ? "Creating account..." : "Create your ShopKart account"}
          </button>
        </form>

        {/* Security note */}
        <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
          <FaLock size={10} />
          <span>Your information is protected</span>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          By creating an account, you agree to ShopKart's{" "}
          <span className="text-[#007185] cursor-pointer hover:underline">Conditions of Use</span> and{" "}
          <span className="text-[#007185] cursor-pointer hover:underline">Privacy Notice</span>.
        </p>
      </div>

      {/* Footer */}
      <div className="flex gap-4 mt-6 text-xs text-[#007185]">
        <span className="hover:underline cursor-pointer">Conditions of Use</span>
        <span className="hover:underline cursor-pointer">Privacy Notice</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
    </div>
  );
}