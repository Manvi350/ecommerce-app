import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <BrowserRouter>
        <CartProvider>
            <SearchProvider>
                <CategoryProvider>
                    <App/>  
                </CategoryProvider>
                
            </SearchProvider>
        </CartProvider>
    </BrowserRouter>
  
);
