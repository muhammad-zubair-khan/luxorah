import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import BottomToTop from '../components/BottomToTop/BottomToTop'

const Layout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  return (
    <>
      <Header isHomePage={isHomePage} />
      <Outlet />
      <Footer />
      <Toaster position="bottom-center" />
      <BottomToTop/>

    </>
  );
};

export default Layout;
