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
const Profile = React.lazy(() => import("./pages/Profile"));
import Navbar from "./components/Navbar";
const Cart = React.lazy(() => import("./pages/Cart"));
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import useShopStore from "./store/useShopStore";
import { useEffect } from "react";

const App = () => {
  const { fetchData, getUserCart, fetchUserProfile, token, setToken } = useShopStore();
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
      fetchUserProfile(token);
    }
  }, [token, getUserCart, fetchUserProfile]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer autoClose={800} limit={3} />
      <Navbar />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-payment" element={<VerifyPayment />} />
        </Routes>
      </Suspense>
      {location.pathname !== '/cart' && <Footer />}
    </div>
  );
};

export default App;
