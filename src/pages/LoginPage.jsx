import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage({ onLoginFail, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", res.data.access_token);
      setEmail("");
      setPassword("");
      onLoginSuccess(res.data.access_token);
      navigate("/checkout");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      if (onLoginFail) onLoginFail();
      alert("Login failed. Check console.");
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
          padding: 9px 10px;
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
        .amz-btn-yellow:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #767676;
          font-size: 12px;
          margin: 16px 0;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #d5d9d9;
        }
      `}</style>

      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-[#0F1111] mb-6">
        Shop<span className="text-amber-400">Kart</span>
      </Link>

      {/* Card */}
      <div className="bg-white border border-[#d5d9d9] rounded-sm p-8 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-medium text-[#0F1111] mb-5">Sign in</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F1111] mb-1">Email</label>
            <input
              className="amz-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-[#0F1111]">Password</label>
              <span className="text-xs text-[#007185] hover:text-[#c7511f] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <input
                className="amz-input pr-10"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
          </div>

          <button type="submit" className="amz-btn-yellow" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Security note */}
        <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
          <FaLock size={10} />
          <span>Secure login — your info is protected</span>
        </div>

        <div className="divider">New to ShopKart?</div>

        <Link to="/register">
          <button className="w-full border border-[#d5d9d9] bg-gradient-to-b from-white to-gray-50 hover:bg-gray-100 text-[#0F1111] py-2 rounded-sm text-sm font-medium transition-all">
            Create your ShopKart account
          </button>
        </Link>
      </div>

      {/* Footer links */}
      <div className="flex gap-4 mt-6 text-xs text-[#007185]">
        <span className="hover:underline cursor-pointer">Conditions of Use</span>
        <span className="hover:underline cursor-pointer">Privacy Notice</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
    </div>
  );
}