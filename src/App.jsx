import Home from "./pages/Home"
import Admin from "./pages/Admin";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart";
import {  Routes, Route, useNavigate } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import { useState,useEffect } from "react";
import LoginModal from "./components/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const[user,setUser]=useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
    const navigate= useNavigate();

    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(token){
        setUser(token);
      }
    },[]);

    const handleRequireLogin = (redirectTo) => {
    if (!user) {
      setRedirectAfterLogin(redirectTo);
      setShowLogin(true);
      return false;
    }
    return true;
  };

  const handleLoginSuccess = (token) => {
    setUser(token);
    setShowLogin(false);   // ⭐ modal close
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // token delete
    setUser(null);                    // user state reset
    navigate("/");                    // home redirect
  };


    return (
      // <>
        
      //     <Navbar user={user}/>
      //     <Routes>
      //       <Route path="/" element={<Home/>}/>
      //       <Route path="/product/:id" element={<ProductPage/>}/>
      //       <Route path="/login" element={<LoginPage/>}/>
      //       <Route path="/cart" element={<Cart/>}/>
      //       <Route path="/admin" element={<Admin/>}/>
      //       <Route path="/checkout" element={<Checkout/>}/>
      //       <Route path="/orders" element={<OrdersPage userId={"123"}/>}/>

      //     </Routes>
        
      // </>
        
          <div>
            <header className="p-4 bg-gray-800 text-white flex justify-between">
              <h1>My E-Commerce</h1>
              {user ? (
                <span>✅ Logged in</span>
              ) : (
                <span>❌ Not logged in</span>
              )}
            </header>

            <Navbar onRequireLogin={handleRequireLogin}
                    user={user}
                    onLogout={handleLogout} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage
                  onLoginFail={() => setShowLogin(true)}
                  onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/register" element={<RegisterPage/>}/>
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute
                    user={user}
                    onRequireLogin={handleRequireLogin}
                    redirectTo="/checkout"
                  >
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/orders" element={<OrdersPage userId={"123"} />} />
            </Routes>

            {showLogin && (
              <LoginModal
                onClose={() => setShowLogin(false)}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
            <Footer/>
          </div>
       
    )
}

export default App
