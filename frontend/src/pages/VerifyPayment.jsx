import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import Title from "../components/Title";

const VerifyPayment = () => {
  const [message, setMessage] = useState("Verifying your payment...");
  const { backendUrl, token, setCartItems } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const verify = async () => {
      if (sessionId) {
        try {
          const response = await axios.post(
            `${backendUrl}/api/v1/order/verify-session`,
            { sessionId },
            { headers: { token } }
          );

          if (response.data.success) {
            setMessage("Payment Successful! Your order has been placed.");
            setCartItems({}); // Clear the cart in the context
            setTimeout(() => {
              navigate("/orders");
            }, 3000); // Redirect to orders page after 3 seconds
          } else {
            setMessage("Payment verification failed. Please contact support.");
            toast.error("Payment Failed");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } catch (error) {
          setMessage("An error occurred during verification.");
          toast.error("Verification Error");
          navigate("/");
        }
      } else {
        setMessage("Invalid session. Redirecting...");
        navigate("/");
      }
    };

    verify();
  }, [sessionId, backendUrl, token, navigate, setCartItems]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center border-t justify-center text-center">
      <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      <Title text1={"PAYMENT"} text2={"VERIFICATION"} />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default VerifyPayment;
