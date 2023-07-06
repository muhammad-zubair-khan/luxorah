import React, { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
// import logo from "../assets/logo.jpg";
import logo from "../assets/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/Cataglog/Category/CategorySlice";

const Footer = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category?.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <footer className="bg-white-900 text-black py-10 shadow-outline mt-10">
      <div className="container mx-auto px-4 sm:px-8 flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-4/12 flex-shrink-0">
            {/* <h3 className="text-xl font-bold mb-4">ByteForge Software</h3> */}
            <img
              src={logo}
              alt="logo"
              // className="hidden md:block cursor-pointer h-30 w-34"
              className="h-30 w-34"
            />
            {/* <img
              src={reslogo}
              alt="logo"
              className="md:hidden cursor-pointer h-30 w-auto"
            /> */}
            <p className="my-4 text-justify">
            Welcome to Luxorah, your ultimate destination for design enthusiasts seeking to transform their living spaces with the perfect furniture pieces. Discover a curated collection of sofas, chairs, and other interior furnishings that will elevate your home and inspire your design vision
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 ml-0 md:ml-10">
            <h3 className="text-xl font-bold mb-4">CATEGORIES</h3>
            <ul className="mb-4">
              {categories?.map((item)=>(
                <li>
                  <Link to={`/product/${item?.slug}`}>{item?.title}</Link>
                </li>
              ))}
             
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5">
            <h3 className="text-xl font-bold mb-4">RESOURCES</h3>
            <ul className="mb-4">
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="flex items-center">
              <div>
                <div className="flex items-center r">
                  <MdLocationOn className="text-3xl" />{" "}
                  <a
                    href="https://maps.google.com/maps?q=155+N+Lake+Avenue,+8th+Floor,+Pasadena,+California+91101"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lahore, Pakistan
                  </a>
                </div>
                <br />

                <div className="flex items-center ">
                  <AiOutlinePhone className="text-3xl" />
                  <a href="tel:923204131088">&nbsp;+92 320-4131-088</a>
                </div>
                <br />
                <div className="flex items-center">
                  <AiOutlineMail className="text-2xl" />
                  <a href="mailto:info@luxorah.co">
                    &nbsp;&nbsp;info@luxorah.co
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
