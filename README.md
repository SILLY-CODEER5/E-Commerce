# 🛒 Forever - Full-Stack E-Commerce Platform

A production-ready, full-stack E-Commerce application built with the **MERN** stack (MongoDB, Express, React, Node.js). This project demonstrates a complete end-to-end architecture, including a customer-facing storefront, a secure backend API, and a dedicated admin dashboard for inventory management.

This project was built with a strong focus on **performance**, **scalability**, and **clean code architecture**, making it an excellent showcase of modern web development skills.

## 🌟 Live Demos

- **Frontend Store:** [https://forever-frontend-xi-beryl.vercel.app/](https://forever-frontend-xi-beryl.vercel.app/)
- **Admin Panel:** [https://forever-admin-pi-pink.vercel.app/](https://forever-admin-pi-pink.vercel.app/)

---

## 🏗️ System Architecture

The application follows a decoupled client-server architecture, divided into three main components:

### 1. Frontend (Customer Storefront)
Built with **React.js** and **Vite** for lightning-fast HMR and optimized builds.
- **State Management:** Context API for global state (cart, user sessions, products).
- **Styling:** **Tailwind CSS** for a responsive, utility-first UI design.
- **Performance:** Utilizes `React.lazy` and `Suspense` for route-based code splitting, reducing initial load times.
- **Features:** Product catalog, search/filtering, shopping cart, secure checkout (Stripe), and order history.

### 2. Backend (RESTful API)
Built with **Node.js** and **Express.js**, serving as the central nervous system of the platform.
- **Database:** **MongoDB** via **Mongoose** ODM. Indexes are strategically placed on fields like `category` and `bestseller` for fast querying.
- **Authentication:** Custom JWT-based authentication for both users and administrators.
- **Advanced Performance Caching:** Implements **in-memory caching** (`node-cache`) for the product catalog. The database is entirely bypassed for product reads, drastically reducing latency.
- **HTTP Caching:** Leverages `Cache-Control` headers (`max-age`) to deduplicate redundant API requests on the client browser.
- **Media Storage:** Integrated with **Cloudinary** for secure and optimized image hosting.
- **Payments:** **Stripe** integration for handling secure transactions.

### 3. Admin Panel (CMS)
A secure dashboard restricted to administrative users.
- **Product Management:** Full CRUD capabilities for adding, updating, and deleting products.
- **Order Management:** View real-time customer orders and update shipping statuses.
- **Cache Invalidation:** Seamlessly integrated with the backend cache—adding or removing a product automatically invalidates the server cache to ensure fresh data.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, React Toastify
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB, Mongoose
- **Third-Party Services:** Stripe (Payments), Cloudinary (Image Hosting)
- **Tooling:** Git, GitHub, Vercel (Deployment)

---

## 💻 Local Development Setup

Follow these steps to run the complete MERN stack on your local machine.

### Prerequisites
- Node.js installed (`v18+` recommended)
- MongoDB account (Atlas cluster)
- Cloudinary and Stripe accounts (for API keys)

### 1. Clone the Repository
```bash
git clone https://github.com/SILLY-CODEER5/E-Commerce.git
cd E-Commerce
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET_KEY=your_cloudinary_secret
```
Start the backend server:
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```
Start the frontend app:
```bash
npm run dev
```

### 4. Admin Panel Setup
```bash
cd ../admin
npm install
```
Create a `.env` file in the `admin` directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```
Start the admin panel:
```bash
npm run dev
```

---

## 📈 Optimization Highlights (For Reviewers)
- **Database Indexing:** Added indexes to heavily queried fields for faster read operations.
- **Memory Caching:** Introduced server-side caching (`node-cache`) to handle high traffic on the product listing API without hitting the database.
- **Code Splitting:** Implemented lazy loading in React to ensure the initial JS bundle remains small.
- **Lean Queries:** Uses Mongoose's `.lean()` method to skip hydrating full Mongoose documents during read-only API requests, saving memory and processing time.
