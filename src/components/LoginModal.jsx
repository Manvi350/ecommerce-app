import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      onLoginSuccess(token);  
      onClose(); 
      // setShowLoginModal(false);
      navigate("/checkout");
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Login to continue shopping
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-sm text-right text-blue-600 cursor-pointer mb-4">
            Forgot password?
          </p>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition w-full"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 mt-2 w-full"
            >
              Cancel
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            New user? 
            <span
              className="text-yellow-500 font-semibold cursor-pointer ml-1"
              onClick={() => {
                onClose();
                navigate("/register");
              }}
            >
              Create account
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
