import React, { useEffect, useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./components/Navbar";
import Sibebar from "./components/Sibebar";
import { Route, Routes } from "react-router-dom";
const Add = React.lazy(() => import("./pages/Add"));
const List = React.lazy(() => import("./pages/List"));
const Orders = React.lazy(() => import("./pages/Orders"));
import Login from "./components/Login";
import Loading from "./components/Loading";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer autoClose={800} limit={3} />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full h-[calc(100vh-64px)]">
            <Sibebar />
            <div className="flex-1 px-8 sm:px-12 lg:px-16 pb-8 text-gray-600 text-base overflow-y-auto">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Add token={token} />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
