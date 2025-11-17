import axios from "axios";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios("/reviews.json").then((data) => {
      setReviews(data.data);
    });
  }, []);

  return (
    <div className="text-center space-y-5">
      <div className="space-y-5">
        <h3 className="text-3xl font-bold text-secondary">Reviews</h3>
        <p className="text-gray-500">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. <br /> Achieve proper alignment, reduce pain, and strengthen your
          body with ease!
        </p>
      </div>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          scale: 0.75,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide>
            <ReviewCard key={review.id} review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
