import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

const banners = [
  { id: 1, img: banner1 },
  { id: 2, img: banner2 },
  { id: 3, img: banner3 },
];

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      {banners.map((banner) => (
        <div>
          <img src={banner.img} alt="" />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
