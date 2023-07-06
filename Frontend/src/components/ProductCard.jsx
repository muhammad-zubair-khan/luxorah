import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { addToWishList } from "../features/Cataglog/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";

const ProductCard = (props) => {
  const { product, region } = props;
  console.log(product);
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleShow = () => {
    showModal();
    setShow(true);
    console.log("clicked");
  };
  const addToWishlist = (id) => {
    dispatch(addToWishList(id));
  };
  const price = product?.price;
  const numericPart = price?.replace(/[^\d.]/g, "");
  const currencyMap = {
    $: "USD",
    "£": "GBP",
    "₹": "INR",
    "€": "EUR",
    AED: "AED",
    PKR: "PKR",
    OMR: "OMR",
  };

  const currencyPart = price?.match(/^\D+/)[0].trim();
  const currencyCode = currencyMap[currencyPart];

  const formattedPrice = isNaN(numericPart)
    ? "Invalid Price"
    : new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericPart);

  return (
    <>
      <div className="col-span-2" product={product}>
        <div className="product-card relative">
          <Link to={`/${product?.slug}/${product?._id}/${region}`}>
            <div className="product-image">
              <img
                src={product?.images[0]?.url}
                className="object-contain h-full"
                alt="watch"
              />
              <img
                src={product?.images[1]?.url}
                className="object-contain h-full"
                alt="watch"
              />
            </div>
          </Link>

          <div className="product-details">
            <h6 className="brands">{product?.brand}</h6>
            <h5 className="product-title font-bold">{product?.title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={product?.totalRatings}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price font-semibold">{formattedPrice}</p>
          </div>
          <div className="action-bar absolute">
            <div className="flex flex-col gap-3">
              <div>
                <HeartOutlined onClick={(e) => addToWishlist(product?._id)} />
              </div>
              <div>
                <EyeOutlined title="Quick View" onClick={handleShow} />
                {show && (
                  <>
                    <Modal
                      title={product?.title}
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={false}
                    >
                      <Swiper
                        slidesPerView={1}
                        grabCursor={true}
                        keyboard={{
                          enabled: true,
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 1,
                          },
                          768: {
                            slidesPerView: 1,
                          },
                          1024: {
                            slidesPerView: 1,
                          },
                        }}
                        scrollbar={false}
                        navigation={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                        className="mySwiper"
                      >
                        {product?.images?.map((item, index) => {
                          return (
                            <>
                              <SwiperSlide>
                                <img
                                  src={item?.url}
                                  className="object-contain h-full"
                                  alt="watch"
                                />
                              </SwiperSlide>
                            </>
                          );
                        })}
                      </Swiper>
                      <hr />
                      <div>
                        <p className="font-bold ">{product?.title}</p>
                      </div>
                      <div className="flex">
                        <p className="font-bold">Materials: </p>
                        <p className="mx-2">Wood, Leather, Acrylic</p>
                      </div>
                      <div className="flex">
                        <p className="font-bold">Stock: </p>
                        <p className="mx-2">In Stock</p>
                      </div>
                      <div
                        className="flex justify-between"
                        style={{
                          background: "whitesmoke",
                          padding: "17px",
                          marginTop: "19px",
                        }}
                      >
                        <div>
                          <p>{formattedPrice}</p>
                        </div>
                        <div>
                          <Link
                            to={`/${product?.slug}/${product?._id}`}
                            className="mx-2"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </Modal>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
