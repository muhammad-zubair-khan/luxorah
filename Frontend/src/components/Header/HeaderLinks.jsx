import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/Cataglog/Category/CategorySlice";
import { getProducts } from "../../features/Cataglog/Product/ProductSlice";

const HeaderLinks = ({ handleClick }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category?.categories);
  const products = useSelector((state) => state?.product?.products?.products);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const [expandedCategory, setExpandedCategory] = useState("");

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(categoryId === expandedCategory ? "" : categoryId);
  };

  return (
    <>
      {categories?.map((link) => {
        const categoryProducts = products?.filter(
          (product) => product?.category?._id === link?._id
        );

        if (categoryProducts?.length === 0) {
          return null; // Skip rendering the category if it has no products
        }

        return (
          <div key={link?._id}>
            <div className="px-3 text-left md:cursor-pointer group">
              <Link
                to={`/product/${link?.slug}`}
                className={`py-7 flex font-semibold text-sm justify-between items-center hover:text-[#f28123] cursor-pointer ${
                  heading !== link?.title ? "pr-0" : "pr-0"
                }`}
                onClick={() => {
                  heading !== link?.title
                    ? setHeading(link?.title)
                    : setHeading("");
                  setSubHeading("");
                }}
              >
                {link?.title}
                <span className=" md:hidden inline font-semibold text-sm">
                  <ion-icon
                    name={`${
                      heading === link?.title ? "chevron-up" : "chevron-down"
                    }`}
                  ></ion-icon>
                </span>
                <span className="md:mt-1 md:ml-2 font-semibold text-sm md:block hidden">
                  <ion-icon name="chevron-down"></ion-icon>
                </span>
              </Link>
              {categories && (
                <div>
                  <div
                    className="absolute bg-white top-20  w-52 border-2 hidden group-hover:md:block hover:md:block"
                    style={{ zIndex: 1000000000000000 }}
                  >
                    <div className="py-3">
                      <div
                        className="w-4 h-4 left-3 absolute 
                      mt-1 bg-white rotate-45"
                      ></div>
                    </div>
                    <div className="bg-white p-5 grid gap-10">
                      {categoryProducts?.map((item) => (
                        <div key={item?._id}>
                          <Link
                            to={`${item?.slug}/${item?._id}`}
                            className="text-sm font-semibold hover:text-[#f28123]"
                          >
                            {item?.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile menus */}
            <div
              className={`
              ${heading === link.title ? "md:hidden" : "hidden"}
            `}
            >
              {categoryProducts?.map((item) => (
                <div key={item?._id}>
                  <Link
                    to={`${item?.slug}/${item?._id}`}
                    onClick={() => {
                      if (subHeading !== item?.title) {
                        setSubHeading(item?.title);
                      } else {
                        setSubHeading("");
                      }
                      handleClick(); // Close the menu
                    }}
                    className="py-4 pl-7 font-semibold md:pr-0  flex justify-between items-center md:pr-0 pr-5 md:cursor-pointer hover:text-[#f28123]"
                  >
                    {item?.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HeaderLinks;
