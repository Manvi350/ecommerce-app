import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// export const { cartItems, addToCart } = useCart();
export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
