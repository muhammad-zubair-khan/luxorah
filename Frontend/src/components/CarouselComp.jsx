import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
const CarouselComp = () => {
  return (
    <div className="relative h-64 sm:h-96" >
      <Carousel
        autoplay
        fade
        dots={false}
        style={{zIndex: -1000, filter: "brightness(0.3)" }}
        // ref={carouselRef}
      >
        <div>
          
          <img
            className="carousel-img"
            src="https://cdn.shopify.com/s/files/1/0061/8535/3329/files/krane_bedroom.01_1400x.jpg?v=1614326817"
            alt=""
          />
        </div>
        <div>
          <img
            className="carousel-img"
            src="https://cdn.shopify.com/s/files/1/0249/2406/1792/files/brizo---collection.jpg?v=1582278194"
            alt=""
          />
        </div>
        <div>
          <img
            className="carousel-img"
            src="https://cdn.shopify.com/s/files/1/0249/2406/1792/files/Helios-Cover.jpg?v=1582278194"
            alt=""
          />
        </div>
        <div>
          <img
            className="carousel-img"
            src="https://cdn.shopify.com/s/files/1/0249/2406/1792/files/Aphrodite_1512x.png?v=1584786652"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
