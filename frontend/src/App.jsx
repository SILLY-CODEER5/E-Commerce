import { Routes, Route, useLocation } from "react-router-dom";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const Collection = React.lazy(() => import("./pages/Collection"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Product = React.lazy(() => import("./pages/Product"));
const Login = React.lazy(() => import("./pages/Login"));
const PlaceOrder = React.lazy(() => import("./pages/PlaceOrder"));
const Orders = React.lazy(() => import("./pages/Orders"));
const VerifyPayment = React.lazy(() => import("./pages/VerifyPayment"));
import Navbar from "./components/Navbar";
const Cart = React.lazy(() => import("./pages/Cart"));
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer autoClose={1500} limit={3} />
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify-payment" element={<VerifyPayment />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
