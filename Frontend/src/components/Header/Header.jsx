import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import Logo from "../../assets/logo2.png";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../../features/User/UserSlice";
import HeaderProfileLinks from "./HeaderProfileLinks";
import { GoogleLogout } from "react-google-login";
import { logoutUser } from "../../features/User/UserSlice";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state?.auth?.user?.user);
  const isUser = useSelector((state) => state?.auth?.user?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishList());
  }, []);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(false); // Close the menu when a link is clicked
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const navbarRef = useRef(null);
  const navbarHeight = navbarRef.current?.offsetHeight || 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsFixed(scrollPosition > navbarHeight / 2);
  }, [scrollPosition, navbarHeight]);
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const logout = () => {
    dispatch(logoutUser());
  };
  // const [latitude, setLatitude] = useState(null);
  // console.log("latitude",latitude)
  // const [longitude, setLongitude] = useState(null);
  // console.log("longitude",longitude)
  // const [locationData, setLocationData] = useState(null);
  // console.log("locationData",locationData)

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         async (position) => {
  //           const { latitude, longitude } = position.coords;
  
  //           try {
  //             const response = await axios.get(
  //               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
  //             );
  //             setLocationData(response.data);
  //           } catch (error) {
  //             console.error(error);
  //           }
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //     } else {
  //       console.error('Geolocation is not supported by this browser.');
  //     }
  //   };
  
  //   fetchLocation();
  // }, []);
  return (
    <>
      <nav
        ref={navbarRef}
        className={`bg-white border-1 ${isFixed ? "fixed top-0 w-full" : ""}`}
        style={{
          boxShadow: isFixed ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
          transition: "box-shadow 0.3s, background-color 0.3s",
          zIndex: 100000000000000,
        }}
      >
        <div className="container mx-auto">
          <div className="flex items-center font-medium justify-between">
            <ul className="md:flex hidden uppercase items-center font-[Poppins]">
              <HeaderLinks />
            </ul>

            {/* <div className="p-5 md:w-auto w-full flex items-center justify-center"> */}
            <div className="p-5 md:w-auto w-full flex justify-between">
              <Link to="/">
                <img
                  onClick={handleClick}
                  src={Logo}
                  alt="logo"
                  className="md:block cursor-pointer mr-2 h-auto max-h-10 w-auto"
                />
              </Link>
              <div
                className="text-3xl md:hidden cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <Link
                to="/contact"
                className="py-7 px-3 hidden md:block inline-block relative hover:text-[#f28123] hover:after:h-1 after:h-0 after:absolute after:w-full after:left-0 after:transition-opacity after:duration-300"
              >
                Contact
              </Link>
              {/* {isUser && ( */}
                <Link
                  to="/wishlist"
                  className="py-7 hidden md:block px-3 inline-block relative hover:text-[#f28123] hover:after:h-1 after:h-0 after:absolute after:w-full after:left-0 after:transition-opacity after:duration-300"
                >
                  Wishlist
                </Link>
              {/* )} */}
              <div>
                {isUser !== null ? (
                  <div className="hidden md:block">
                    <GoogleLogout
                      clientId={clientId}
                      buttonText="Logout"
                      onLogoutSuccess={logout}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="bg-white px-6 py-2 flex items-center"
                        >
                          <img
                            src={user?.picture}
                            alt="User"
                            className="rounded-full w-8 h-8 mr-2"
                          />
                          Logout
                        </button>
                      )}
                    />
                  </div>
                ) : (
                  <button className="bg-[#f28123] px-6 py-2 rounded-full hidden md:block">
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <ul
            style={{ zIndex: 10000000000, marginTop: "75px" }}
            className={`
              md:hidden text-black bg-white fixed fixed w-full top-0 overflow-y-auto bottom-0 py-5 pl-4
              duration-500 ${open ? "left-0" : "left-[-100%] "}
            `}
          >
            {/* <li>
              <Link
                onClick={handleClick}
                to="/"
                // className="py-7 px-3 inline-block"
                className="py-7 px-3 inline-block relative hover:text-[#f28123] hover:after:h-1 after:h-0 after:absolute after:w-full after:left-0 after:transition-opacity after:duration-300"
              >
                Home
              </Link>
            </li> */}
            <HeaderLinks onClick={handleClick} />
            <li>
              <Link
                to="/contact"
                // className="py-7 px-3 inline-block"
                className="py-7 px-3 inline-block relative hover:text-[#f28123] hover:after:h-1 after:h-0 after:absolute after:w-full after:left-0 after:transition-opacity after:duration-300"
                onClick={handleClick}
              >
                Contact
              </Link>
            </li>
            <div className="py-5 flex flex-col">
              {/* {isUser && ( */}
                <Link
                  to="/wishlist"
                  onClick={handleClick}
                  // className="px-3 inline-block"
                  className=" px-3 inline-block relative hover:text-[#f28123] hover:after:h-1 after:h-0 after:absolute after:w-full after:left-0 after:transition-opacity after:duration-300"
                >
                  WishList
                </Link>
              {/* // )} */}
              <div className="mt-6">
                {isUser !== null ? (
                  <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="bg-white px-6 py-2 flex items-center"
                      >
                        <img
                          src={user?.picture}
                          alt="User"
                          className="rounded-full w-8 h-8 mr-2"
                        />
                        Logout
                      </button>
                    )}
                  />
                ) : (
                  <>
                    <button className="bg-[#f28123] px-6 py-2 rounded-full  md:hidden">
                      <Link to="/login">Login</Link>
                    </button>
                  </>
                )}
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
