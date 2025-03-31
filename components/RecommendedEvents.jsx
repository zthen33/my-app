"use client";
import React, { useContext } from "react";

//import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

//import swiper styles
import "swiper/css";
import "swiper/css/pagination";

//import required modules
import { Pagination } from "swiper/modules";

//components
import Link from "next/link";
import Event from "./Events/Event";
import SkeletonGrid from "./SkeletonGrid";
import { EventContext } from "@/contexts/EventContext";

const RecommendedEvents = () => {
  const { events } = useContext(EventContext);

  // Sửa lỗi chính tả: filterRecommenedEvents -> filterRecommendedEvents
  const filterRecommendedEvents = events.filter(
    (event) => event.recommended === true
  );

  return (
    // Sửa từ <select> thành <section>
    <section className="mb-32">
      <div className="mb-12 text-center">
        <h3 className="pretitle">Recommended for you</h3>
        <h2 className="h2">Events You Might Like</h2>
      </div>
      {filterRecommendedEvents.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ dynamicBullets: true, clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1310: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
          className="w-full h-[500px]"
        >
          {filterRecommendedEvents.map((event, index) => (
            <SwiperSlide key={index} className="select-none">
              <Link href={`/events/${event.id}`}>
                {" "}
                {/* Thêm đường dẫn động */}
                <Event event={event} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <SkeletonGrid itemCount={4} />
      )}
    </section>
  );
};

export default RecommendedEvents;
