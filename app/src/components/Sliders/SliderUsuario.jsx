import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay]);
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const SliderUsuario = () => {
  return (
    <div>
      <div className="body-1 slider">
        <h3 className='title'>STORYSPHERE</h3>
        <p>La imaginación es tu único limite</p>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          className='swiper'
        >
          <SwiperSlide className="swiper-slide slide-1 slide-item img-1">
            <div>
              <h4>History 1</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-2 slide-item img-2">
            <div>
              <h4>History 2</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-3 slide-item img-3">
            <div>
              <h4>History 3</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-4 slide-item img-4">
            <div>
              <h4>History 4</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-5 slide-item img-5">
            <div>
              <h4>History 5</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default SliderUsuario