import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useShopStore from "../store/useShopStore";
import { toast } from "react-toastify";
import Title from "../components/Title";

const VerifyPayment = () => {
  const [message, setMessage] = useState("Verifying your payment...");
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const { backendUrl, token, setCartItems } = useShopStore();
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
            setStatus("success");
            setMessage("Payment Successful! Your order has been placed.");
            setCartItems({}); // Clear the cart in the context
            setTimeout(() => {
              navigate("/orders");
            }, 3000); // Redirect to orders page after 3 seconds
          } else {
            setStatus("error");
            setMessage("Payment verification failed. Please contact support.");
            toast.error("Payment Failed");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } catch (error) {
          setStatus("error");
          setMessage("An error occurred during verification.");
          toast.error("Verification Error");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } else {
        setStatus("error");
        setMessage("Invalid session. Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    verify();
  }, [sessionId, backendUrl, token, navigate, setCartItems]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center border-t justify-center text-center">
      <div className="w-24 h-24 flex items-center justify-center mb-6">
        {status === "verifying" && (
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
          </div>
        )}
        {status === "success" && (
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-lg text-white">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="relative w-20 h-20">
             <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
             <div className="relative w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg text-white">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
               </svg>
             </div>
          </div>
        )}
      </div>
      <Title text1={"PAYMENT"} text2={"VERIFICATION"} />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default VerifyPayment;
