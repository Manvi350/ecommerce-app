# 🛒 E-Commerce Website

A modern full-stack E-Commerce web application built with **React (Vite)**, **FastAPI**, and **MongoDB Atlas**. It provides a seamless online shopping experience with secure authentication, product browsing, real-time search, cart management, instant purchasing, and order history.

## 🌐 Live Demo

* **Live Website:** https://ecommerce-app-zeta-drab.vercel.app

> **Note:** The backend is hosted on Render's free tier, so the first request may take **30–60 seconds** if the server is waking up.

## 🚀 Features

* 🔐 User Authentication (Register & Login)
* 🛍️ Browse Products
* 🔎 Search Products
* 👀 Live Product Preview
* 🛒 Add to Cart
* ⚡ Buy Now
* 📦 Place Orders
* 📜 View Order History
* 📱 Responsive User Interface
* ☁️ MongoDB Atlas Integration
* 🌐 RESTful API with FastAPI

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* FastAPI
* Python
* PyMongo
* Uvicorn

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render

## 📂 Project Structure

```text
ecommerce-app/
│
├── backend/
│   ├── routes/
│   ├── database.py
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Manvi350/ecommerce-app.git
cd ecommerce-app
```

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

## 📖 API Documentation

When running locally:

```text
http://127.0.0.1:8000/docs
```

Production API Documentation:

```text
https://ecommerce-backend-6mko.onrender.com/docs
```

## 🚀 Future Improvements

* 💳 Payment Gateway Integration
* ❤️ Wishlist
* ⭐ Product Reviews & Ratings
* 👨‍💼 Admin Dashboard
* 👤 User Profile Management
* 🖼️ Image Upload Support

## 👩‍💻 Author

**Manvi Jain**

GitHub: https://github.com/Manvi350

If you found this project helpful, consider giving it a ⭐ on GitHub!
