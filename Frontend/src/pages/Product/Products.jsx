import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Drawer, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../features/Cataglog/Product/ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import Color from "../../components/Color";
import EmptyState from "../../components/EmptyState";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import "rc-slider/assets/index.css";
import { Pagination } from "antd";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader/Loader";

const Products = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const slugProducts = useSelector(
    (state) => state?.product?.productsBySlug?.products
  );
  const { isLoading } = useSelector((state) => state?.product);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [region, setRegion] = useState("aed");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 99999]);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(
      getProductsBySlug({
        slug: slug,
        region: region,
        sort: sort,
        brand: brand,
        min: price[0], // Update min value with price[0]
        max: price[1], // Update min value with price[1]
        ratings: ratings,
      })
    );
  }, [slug, region, sort, brand, price, ratings]);

  //For Price
  const handleChangePrice = (event, newPrice) => {
    setPrice(newPrice);
  };
  const formatPrice = (value) => `${value}`;

  //For Rating
  const handleChange = (event) => {
    setRatings(event.target.value);
  };

  // Handler function to update the selected brand
  const handleBrandClick = (brand) => {
    setBrand(brand);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Create a new array to store unique colors
  const uniqueColors = [];

  slugProducts?.forEach((item) => {
    // Check if the color is already in the uniqueColors array
    const colorExists = uniqueColors.some(
      (color) => color._id === item?.color?._id
    );

    // If the color does not exist in uniqueColors, add it
    if (!colorExists) {
      uniqueColors.push(item?.color);
    }
  });

  const totalQuantity = slugProducts?.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const uniqueBrands = [
    ...new Set(slugProducts?.map((product) => product?.brand)),
  ];

  //Search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = slugProducts?.filter((product) => {
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      product._id.toLowerCase().includes(searchLowerCase) ||
      product.title.toLowerCase().includes(searchLowerCase) ||
      product.brand.toLowerCase().includes(searchLowerCase) ||
      product.createdAt.includes(searchQuery)
    );
  });

  return (
    <>
      <Meta title={`${slug} - ${region} | Luxora`} />
          <div className="store-wrapper home-wrapper-2 py-5">
            <div className="container mx-auto">
              <div className="flex change-flex-direction">
                <div className="large-screen-content w-3/12 m-3">
                  <div className="filter-card mb-3">
                    <h3 className="filter-title">Shop By Brands</h3>
                    <div>
                      <ul className="ps-0">
                        {uniqueBrands?.map((brand, index) => {
                          return (
                            <>
                              <li
                                key={index}
                                onClick={() => handleBrandClick(brand)}
                              >
                                {brand}
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="filter-card mb-3">
                    <h3 className="filter-title">Filter By</h3>
                    <div>
                      {/* <h5 className="sub-title">Availablity</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        {totalQuantity >= 1
                          ? `In Stock (${totalQuantity})`
                          : "Out of Stock (0)"}
                      </label>
                    </div>
                  </div> */}

                      <div className="">
                        <h5 className="sub-title">Price</h5>
                        <div className="lsOptions">
                          <div className="lsOptionItem">
                            <MuiSlider
                              value={price}
                              onChange={handleChangePrice}
                              min={0}
                              max={99999}
                              step={100}
                              valueLabelDisplay="auto"
                              aria-labelledby="range-slider"
                              getAriaValueText={formatPrice}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <h5 className="sub-title">Colors</h5>
                      {uniqueColors?.map((color, index) => {
                        return (
                          <div key={index}>
                            <Color setColor={setColor} colorData={color} />
                          </div>
                        );
                      })} */}
                    </div>
                  </div>
                  <div className="filter-card mb-3">
                    <div className="product-tags flex-wrap items-center gap-3">
                      <fieldset>
                        <Typography component="legend">Ratings</Typography>
                        <MuiSlider
                          min={0}
                          max={5}
                          value={ratings}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                        />
                      </fieldset>
                    </div>
                  </div>
                  {slugProducts.length > 2 && (
                    <div className="filter-card mb-3">
                      <h3 className="filter-title">Related Product</h3>

                      {slugProducts?.length >= 2 &&
                        slugProducts.slice(0, 2).map((product, index) => {
                          return (
                            <div key={index}>
                              <div className="random-products mb-3 flex flex-col">
                                <div className="w-50 flex justify-center">
                                  <img
                                    src={product?.images[0]?.url}
                                    className="object-contain h-full "
                                    alt={product?.title}
                                    style={{ width: "60%" }}
                                  />
                                </div>
                                <div className="w-50">
                                  <h5 className="text-xl font-bold">
                                    {product?.title}
                                  </h5>
                                  <h5 className="text-xl font-medium">
                                    {product?.price}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
                {/* CSS styles */}
                <style jsx>{`
                  .large-screen-content {
                    display: none;
                  }

                  @media (min-width: 768px) {
                    .large-screen-content {
                      display: block;
                    }
                  }
                `}</style>

                {/* Drawer button */}
                <div className="medium-small-screen-content w-3/12 text-end">
                  <Button
                    onClick={toggleDrawer}
                    variant="contained"
                    color="primary"
                    className="drawer-button"
                  >
                    Filters
                  </Button>
                </div>

                {/* CSS styles */}
                <style jsx>{`
                  .medium-small-screen-content {
                    display: none;
                  }

                  @media (max-width: 767px) {
                    .medium-small-screen-content {
                      display: block;
                    }
                  }
                `}</style>

                {/* Drawer */}
                <Drawer
                  anchor="left"
                  open={isOpen}
                  onClose={toggleDrawer}
                  className={`drawer ${isOpen ? "open" : ""}`}
                  style={{
                    zIndex: 100000,
                    width: ` ${isOpen ? "100%" : "28%"}`,
                  }}
                >
                  {/* Drawer content */}
                  <div className="drawer-content">
                    <div className="filter-card">
                      <div className="items-center gap-10">
                        <div className="relative">
                          <h5 className="sub-title">Search</h5>
                          <p className="totalproducts mb-0">
                            {filteredProducts && filteredProducts?.length > 1
                              ? `${filteredProducts?.length} Products Found`
                              : `${filteredProducts?.length} Product Found`}
                          </p>
                          <input
                            type="Search"
                            placeholder="Search Product here.."
                            style={{ border: "none", outline: "none" }}
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="filter-card">
                      <div className="items-center gap-10">
                        <div className="relative">
                          <h5 className="sub-title">Sort By:</h5>
                          <select
                            name="sort"
                            id="sort"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            defaultValue={"popular"}
                            value={sort} // Use the selectedRegion state as the value
                            onChange={(e) => setSort(e.target.value)}
                          >
                            <option value="popular">Popular</option>
                            <option value="featured">Featured</option>
                            <option value="special">Special</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="filter-card">
                      <div className="items-center gap-10">
                        <div className="relative">
                          <h5 className="sub-title">Currency:</h5>
                          <select
                            name="region" // Provide a meaningful name for the select element
                            id="region" // Provide a meaningful ID for the select element
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={region} // Use the selectedRegion state as the value
                            onChange={(e) => setRegion(e.target.value)} // Pass the event to handleRegionSelect function
                          >
                            <option value="pound">POUND</option>
                            <option value="usd">USD</option>
                            <option value="euro">EUR</option>
                            <option value="aed" selected>
                              AED
                            </option>
                            <option value="pkr">PKR</option>
                            <option value="omr">OMR</option>
                            <option value="inr">INR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="filter-card mb-3">
                      <h3 className="filter-title">Shop By Brands</h3>
                      <div>
                        <ul className="ps-0">
                          {uniqueBrands?.map((brand, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  onClick={() => handleBrandClick(brand)}
                                >
                                  {brand}
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="filter-card mb-3">
                      <h3 className="filter-title">Filter By</h3>
                      <div>
                        {/* <h5 className="sub-title">Availablity</h5>
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id=""
                        />
                        <label className="form-check-label" htmlFor="">
                          {totalQuantity >= 1
                            ? `In Stock (${totalQuantity})`
                            : "Out of Stock (0)"}
                        </label>
                      </div>
                    </div> */}
                        <h5 className="sub-title">Price</h5>
                        <div className="items-center gap-10">
                          <div className="relative">
                            <MuiSlider
                              value={price}
                              onChange={handleChangePrice}
                              min={0}
                              max={99999}
                              valueLabelDisplay="auto"
                              aria-labelledby="range-slider"
                              // getAriaValueText={formatPrice}
                            />
                          </div>
                        </div>
                        {/* <h5 className="sub-title">Colors</h5>
                        {uniqueColors.map((color, index) => {
                          return (
                            <div key={index}>
                              <Color setColor={setColor} colorData={color} />
                            </div>
                          );
                        })} */}
                      </div>
                    </div>
                    <div className="filter-card mb-3">
                      <div className="items-center gap-10">
                        <div className="relative">
                          <fieldset>
                            <Typography component="legend">Ratings</Typography>
                            <MuiSlider
                              min={0}
                              max={5}
                              value={ratings}
                              onChange={handleChange}
                              valueLabelDisplay="auto"
                              aria-labelledby="range-slider"
                            />
                          </fieldset>
                        </div>
                      </div>
                    </div>

                    {slugProducts?.length >= 2 &&
                      slugProducts.slice(0, 2).map((product, index) => {
                        return (
                          <div key={index}>
                            <div className="random-products mb-3 flex flex-col">
                              <h5 className="sub-title">Related Product</h5>
                              <div className="w-50 flex justify-center">
                                <img
                                  src={product?.images[0]?.url}
                                  className="object-contain h-full "
                                  alt={product?.title}
                                  style={{ width: "60%" }}
                                />
                              </div>
                              <div className="w-50">
                                <h5 className="text-xl font-bold">
                                  {product?.title}
                                </h5>
                                <h5 className="text-xl font-medium">
                                  {product?.price}
                                </h5>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Drawer>

                {/* CSS styles */}
                <style jsx>{`
                  .drawer-button-container {
                    display: none;
                  }
                  .css-4t3x6l-MuiPaper-root-MuiDrawer-paper {
                    width: ${isOpen ? "50%" : "20%"};
                  }
                  @media (max-width: 768px) {
                    .drawer-button-container {
                      display: block;
                    }

                    .drawer-button {
                      margin: 1rem 0;
                    }

                    .drawer {
                      display: none;
                    }

                    .drawer.open {
                      display: block;
                    }
                  }
                `}</style>

                <div className="w-full sm:w-9/12 md:w-10/12 lg:w-11/12 xl:w-9/12">
                  <div className="large-screen-content filter-sort-grid mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <p className="mb-0" style={{ width: "100px" }}>
                          Sort By:
                        </p>
                        <select
                          name="sort"
                          id="sort"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue={"popular"}
                          value={sort} // Use the selectedRegion state as the value
                          onChange={(e) => setSort(e.target.value)}
                        >
                          <option value="popular">Popular</option>
                          <option value="featured">Featured</option>
                          <option value="special">Special</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="mb-0" style={{ width: "100px" }}>
                          Currency:
                        </p>
                        <select
                          name="region" // Provide a meaningful name for the select element
                          id="region" // Provide a meaningful ID for the select element
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={region} // Use the selectedRegion state as the value
                          onChange={(e) => setRegion(e.target.value)} // Pass the event to handleRegionSelect function
                        >
                           <option value="pound">POUND</option>
                            <option value="usd">USD</option>
                            <option value="euro">EUR</option>
                            <option value="aed" selected>
                              AED
                            </option>
                            <option value="pkr">PKR</option>
                            <option value="omr">OMR</option>
                            <option value="inr">INR</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="totalproducts mb-0">
                          {filteredProducts && filteredProducts?.length > 1
                            ? `${filteredProducts?.length} Products Found`
                            : `${filteredProducts?.length} Product Found`}
                        </p>
                        <input
                          type="Search"
                          placeholder="Search Product here.."
                          style={{ border: "none", outline: "none" }}
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="product-list pb-5">
                    {isLoading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 26,
                        }}
                      >
                        <CircularProgress />
                      </Box> // Replace this with your loading component if desired
                    ) : filteredProducts && filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                        {/* --------------- PRODUCT CARD START ------------- */}
                        {filteredProducts.map((product, index) => (
                          <ProductCard
                            key={index}
                            product={product}
                            region={region}
                          />
                        ))}

                        {/* --------------- PRODUCT CARD END ------------- */}
                        {/* <Pagination
                      className="text-center"
                      current={currentPage}
                      total={totalProducts}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                    /> */}
                      </div>
                    ) : (
                      <EmptyState text="Not Find Anything" />
                    )}
                  </div>
                </div>
              </div>

              <style jsx>{`
                .change-flex-direction {
                  display: flex;
                  width: 100%;
                  /* Add other flex properties here */
                }

                @media (max-width: 767px) {
                  .change-flex-direction {
                    flex-direction: column;
                  }
                }
              `}</style>
            </div>
          </div>
    </>
  );
};

export default Products;
