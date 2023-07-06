import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../assets/wish.svg";
import wishlist from "../assets/wishlist.svg";
import watch from "../assets/watch.jpg";
import watch2 from "../assets/watch-1.avif";
import sofa1 from "../assets/sofa1.jpg";
import sofa2 from "../assets/sofa2.jpg";
import addcart from "../assets/add-cart.svg";
import view from "../assets/view.svg";
import {
  HeartOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import { FaWhatsapp } from "react-icons/fa";
import Input from "./Input";
import { showErrorMessage } from "../functions";
import Color from "./Color";
import { addToWishList } from "../features/Cataglog/Product/ProductSlice";
import { useDispatch } from "react-redux";

const Card = (props) => {
  const { cardData } = props;
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
    console.log("id-->", id);
    dispatch(addToWishList(id));
  };

  const price = cardData?.price;
  const numericPart = price.replace(/[^\d.]/g, "");
  const currencyPart = price.replace(numericPart, "");
  const formattedPrice = isNaN(numericPart)
    ? "Invalid Price"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyPart,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericPart);

  return (
    <>
      <div
        className="col-span-3 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
        cardData={cardData}
      >
        <div className="product-card relative">
          <Link to={`${cardData?.slug}/${cardData?._id}`}>
            <div className="product-image">
              <img
                src={cardData?.images[0]?.url}
                className="object-contain h-full"
                alt="watch"
              />
              <img
                src={cardData?.images[1]?.url}
                className="object-contain h-full"
                alt="watch"
              />
            </div>
          </Link>
          <div className="product-details">
            <h6 className="brands">{cardData?.brand}</h6>
            <h5 className="product-title font-bold">{cardData?.title}</h5>
            <p className="price">{formattedPrice}</p>
          </div>
          <div className="action-bar absolute">
            <div className="flex flex-col gap-3">
              <div>
                <HeartOutlined onClick={(e) => addToWishlist(cardData?._id)} />
              </div>
              <div>
                <EyeOutlined title="Quick View" onClick={handleShow} />
                {show && (
                  <>
                    <Modal
                      title={cardData?.title}
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
                        {cardData?.images?.map((item, index) => {
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
                        <p className="font-bold ">{cardData?.title}</p>
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
                            to={`/${cardData?.slug}/${cardData?._id}`}
                            className="mx-2"
                          >
                            View More
                          </Link>
                          {/* <a
                            // href="#"
                            onClick={handleModalToggle}
                            className="flex items-center text-blue-500"
                          >
                            <FaWhatsapp className="mr-2" />
                            Share on WhatsApp
                          </a> */}

                          {/* <Modal
                            visible={showInputModal}
                            onCancel={handleModalToggle}
                            footer={null}
                            centered
                            destroyOnClose
                          >
                            <div className="my-5">
                              <Input
                                value={reference}
                                onChange={handleInputChange}
                                placeholder="Reference *"
                                style={{ marginBottom: 0, marginTop: 20 }}
                              />
                              {referenceError && (
                                <p className="text-red-500 text-sm mb-2">
                                  {referenceError}
                                </p>
                              )}
                            </div>
                            <Button onClick={handleSendWhatsappMessage}>
                              Save and Share
                            </Button>
                          </Modal> */}
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

export default Card;
