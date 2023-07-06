import React, { useEffect, useState } from "react";
import CarouselComp from "../../components/CarouselComp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import Card from "../../components/Card";
import CategoryCard from "../../components/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/Cataglog/Product/ProductSlice";
import { getCategories } from "../../features/Cataglog/Category/CategorySlice";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.product?.products?.products);
  const { isLoading } = useSelector((state) => state?.product);
  const categories = useSelector((state) => state?.category?.categories);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);
  return (
    <>
      <Meta title={"Luxora"} />
      {isLoading ? (
        <>
          <Loader loading={isLoading} />
        </>
      ) : (
        <>
          <CarouselComp />
        {products?.length > 0 &&  <div className="container mx-auto relative md:-top-20 sm:-top-52">
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "600",
                textAlign: "center",
              }}
              className="md:text-white hidden sm:block"
            >
              Our Popular Products
            </h1>
            <Swiper
              // freeMode={true}
              slidesPerView={4}
              grabCursor={false}
              keyboard={{
                enabled: true,
              }}
              spaceBetween={30}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              pagination={{
                type: "progressbar",
              }}
              navigation={true}
              scrollbar={false}
              modules={[Keyboard, Scrollbar, Navigation, Pagination]}
              className="mySwiper mt-4"
            >
              {products?.map((cardData, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <Card cardData={cardData} />
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </div>}
        {categories?.length > 0 &&  <div className="container mx-auto">
            <h1
              style={{
                fontSize: "27px",
                fontWeight: "600",
                textAlign: "center",
                marginTop: "60px",
                marginBottom: "30px",
              }}
            >
              Shop By Categories
            </h1>
            <Swiper
              slidesPerView={4}
              grabCursor={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              scrollbar={false}
              navigation={true}
              pagination={false}
              modules={[Keyboard, Scrollbar, Navigation, Pagination]}
              className="mySwiper"
            >
              {categories?.map((catData, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <CategoryCard catData={catData} />
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </div>}
        </>
      )}
    </>
  );
};

export default Home;
