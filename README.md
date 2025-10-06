# E-Commerce Website

This is a full-stack e-commerce website built with the MERN stack. It includes a frontend for customers, a backend server, and an admin panel for managing the store.

## Features

* **Frontend:**
    * User registration and login
    * Product browsing, searching, and filtering
    * Shopping cart functionality
    * Secure checkout process
    * Order history and tracking
* **Backend:**
    * RESTful API for frontend communication
    * User authentication and authorization with JWT
    * Product and order management
    * Database integration with MongoDB
* **Admin Panel:**
    * Dashboard for viewing key metrics
    * Product management (add, edit, delete)
    * Order management (view, process, ship)
    * User management

## Technologies Used

* **Frontend:**
    * React
    * Redux for state management
    * Material-UI for styling
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB with Mongoose
* **Authentication:**
    * JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

* Node.js and npm installed
* MongoDB installed and running

### Installation

1.  Clone the repository:
    ```
    git clone [https://github.com/SILLY-CODEER5/E-Commerce.git](https://github.com/SILLY-CODEER5/E-Commerce.git)
    ```
2.  Install dependencies for the frontend, backend, and admin panel:
    ```
    cd E-Commerce/frontend
    npm install
    cd ../backend
    npm install
    cd ../admin
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

### Running the Application

1.  Start the backend server:
    ```
    cd backend
    npm start
    ```
2.  Start the frontend application:
    ```
    cd frontend
    npm start
    ```
3.  Start the admin panel:
    ```
    cd admin
    npm start
    ```

The frontend will be running on `http://localhost:3000`, the backend on `http://localhost:5000`, and the admin panel on `http://localhost:3001`.
