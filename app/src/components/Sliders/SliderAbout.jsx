import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';
import SwiperCore from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);
import '../../assets/css/sliderAbout.css';
import { Autoplay, EffectCube, Navigation, Pagination } from 'swiper/modules';

const SliderAbout = () => {
  return (
    <div>
      <div className="about-6 slider bg">
        <h3 className='title'>EQUIPO DE TRABAJO</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCube]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect='cube'
          grabCursor={true}
        >
          <SwiperSlide className="swiper-slide slide-1 slide-item img-1">
            <div>
              <h4>Image 1</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-2 slide-item img-2">
            <div>
              <h4>Image 2</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-3 slide-item img-3">
            <div>
              <h4>Image 3</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default SliderAbout
