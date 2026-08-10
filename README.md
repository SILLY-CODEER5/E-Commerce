# MERN Stack E-Commerce Platform

This is a comprehensive, full-stack e-commerce web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It features a complete customer-facing frontend, a powerful backend API, and a dedicated admin panel for easy management.

## Live Demo Links

* **Frontend Website:** [https://forever-frontend-xi-beryl.vercel.app/](https://forever-frontend-xi-beryl.vercel.app/)
* **Admin Panel:** [https://forever-admin-pi-pink.vercel.app/](https://forever-admin-pi-pink.vercel.app/)

## Key Features

This project is divided into three core components:

**1. Customer Frontend:**
* **User Authentication:** Secure user registration and login system using JWT.
* **Product Catalog:** Browse, search, and filter through a wide range of products.
* **Shopping Cart:** A fully functional cart to add, remove, and manage items before purchase.
* **Checkout Process:** A seamless and secure checkout experience.
* **Order History:** Users can view their past orders and track their status.

**2. Admin Panel:**
* **Management Dashboard:** An intuitive interface to manage the entire store.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for all products.
* **Order Management:** View customer orders, update their status (e.g., processing, shipped), and track fulfillment.
* **User Management:** View and manage the list of registered users.

**3. Backend Server:**
* **RESTful API:** A robust API built with Node.js and Express.js to handle all frontend requests.
* **Secure Endpoints:** API is secured with JWT authentication to protect user data and admin functionalities.
* **Database Integration:** Utilizes MongoDB with Mongoose for efficient and scalable data management.

## Technical Stack

* **Frontend:** React, Redux, React Router, Material-UI
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js

## Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js & npm (or yarn)
* MongoDB installed and running locally or a connection URI from a cloud service like MongoDB Atlas.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SILLY-CODEER5/E-Commerce.git](https://github.com/SILLY-CODEER5/E-Commerce.git)
    cd E-Commerce
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Install Admin Panel Dependencies:**
    ```bash
    cd ../admin
    npm install
    ```

5.  **Configure Environment Variables:**
    Create a `.env` file inside the `backend` directory and add the following:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_strong_secret_key_for_jwt
    ```

### Running the Application

Open three separate terminal windows to run each part of the application.

1.  **Start the Backend Server (from the `backend` directory):**
    ```bash
    npm start
    ```
    The API will be running on `http://localhost:5000`.

2.  **Start the Frontend App (from the `frontend` directory):**
    ```bash
    npm start
    ```
    The customer-facing site will be available at `http://localhost:3000`.

3.  **Start the Admin Panel (from the `admin` directory):**
    ```bash
    npm start
    ```
    The admin panel will be available at `http://localhost:3001` (or another port specified in its setup).
