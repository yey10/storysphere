import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay, EffectCards]);
import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper/modules';

const SliderHome = () => {
  return (
    <div className='home-2'>
      <div className="slider">
        <h3 className='title'>DESTACADOS</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCards]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect='cards'
          grabCursor={true}
          className='swiper'
        >
          <SwiperSlide className="swiper-slide slide-1 slide-item img-1">
            <div>
              <h4>La Mansión de la Luna Rota</h4>
              <button className="buttonLight"><Link to="login">Ver más</Link></button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-2 slide-item img-2">
            <div>
              <h4>Los Susurros de la Biblioteca Eterna</h4>
              <button className="buttonLight"><Link to="login">Ver más</Link></button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-3 slide-item img-3">
            <div>
              <h4>Cartas Bajo la Lluvia</h4>
              <button className="buttonLight"><Link to="login">Ver más</Link></button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-4 slide-item img-4">
            <div>
              <h4>Ecos del Pasado</h4>
              <button className="buttonLight"><Link to="login">Ver más</Link></button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-5 slide-item img-5">
            <div>
              <h4>Cartas al Olvido</h4>
              <button className="buttonLight"><Link to="login">Ver más</Link></button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SliderHome;
