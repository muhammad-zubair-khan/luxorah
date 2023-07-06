import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { profileLinks } from "./Links";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/Cataglog/Category/CategorySlice";
import { getProducts } from "../../features/Cataglog/Product/ProductSlice";
// import { logout } from "../../features/User/UserSlice";
import { GoogleLogout, GoogleLogin } from "react-google-login";

const HeaderProfileLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category?.categories);
  const products = useSelector((state) => state?.product?.products?.products);
  const user = useSelector((state) => state?.auth?.user?.user);
  const clientId =
    "53585355142-e15der085irhso86ofvaf71adbrtopr1.apps.googleusercontent.com";
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);
  // const handleLogout = () =>{
  // }
  
  const logout = () => {
    console.log("logout"); // eslint-disable-line
  };

  return (
    <>
      {profileLinks?.map((link) => (
        <div key={link?.name}>
          <div className="px-3 text-left cursor-pointer group">
           <Link
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group relative hover:text-[#f28123] hover:after:h-1 after:h-full after:absolute after:w-full after:left-0 after:transition-opacity after:duration-300"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {/* {link?.name} */}
              <img src={user?.picture} alt="Profile Image" className="h-10"/>
             
            </Link>
            <div>
              <div
                className="absolute top-16 hidden group-hover:md:block hover:md:block"
                style={{ transition: "opacity 0.3s, max-height 0.3s" }}
              >
                <div className="py-3">
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                </div>
                <div className="flex flex-col bg-white text-black p-5 gap-10 relative z-10">
                  {/* <div>
                    <Link className="text-lg font-semibold" to="/profile">
                      My Profile
                    </Link>
                  </div> */}
                  <div>
                  <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile menus */}
          <div className={`${heading === link?.name ? "md:hidden" : "hidden"}`}>
            <div>
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HeaderProfileLinks;
