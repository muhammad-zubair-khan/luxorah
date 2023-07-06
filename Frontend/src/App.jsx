import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import AllProducts from "./pages/Product/Products";
import ProductDetail from "./pages/Product/ProductDetail";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact/Contact";
import WishList from "./pages/Product/Wishlist";
import NotFound from "./pages/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import { getUser } from "./features/User/UserSlice";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  const clientId = import.meta.env.GOOGLE_CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   dispatch(getUser()).catch((error) => {
  //     if (error.message === "Not Authorized, Token Expired, Please Login Again") {
  //       toast.error("Token expired. Please log in again.");
  //       // Perform additional actions like redirecting to the login page
  //     } else {
  //       toast.error("An error occurred. Please try again later.");
  //       // Handle other error cases
  //     }
  //   });
  // }, []);
  useEffect(() => {
    dispatch(getUser())
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/product/:slug" element={<AllProducts />} />
              <Route path="/:slug/:id/:region" element={<ProductDetail />} />
              <Route path="/:slug/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<WishList />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </ScrollToTop>
        {showPopup && (
        <div className="popup">
          <p>Token expired. Please log in again.</p>
          {/* Additional content and close button */}
        </div>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
