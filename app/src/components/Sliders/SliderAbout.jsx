import React from 'react';
import { Facebook, Instagram, Linkedin, Github } from 'lucide-react';
import Avatar from '../../assets/img/avatar.jpg';
import Avatar2 from '../../assets/img/avatar2.jpg';
import Avatar3 from '../../assets/img/avatar3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';
import SwiperCore from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);
import { Autoplay, EffectCube, Navigation, Pagination } from 'swiper/modules';

const SliderAbout = () => {
  return (
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
              <h4>Kebin Alejandro Manco Varela</h4>
              <div className='team-box'>
                <div className="team-img">
                  <img src={Avatar} alt="" />
                </div>
                <div className="team-info">
                  <p>Desarrollador web</p>
                  <p>Desarrollo Front-end</p>
                  <div>
                    <a href="https://www.facebook.com/"><Facebook /></a>
                    <a href="https://www.instagram.com/"><Instagram /></a>
                    <a href="https://www.linkedin.com/"><Linkedin /></a>
                    <a href="https://github.com/"><Github /></a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-2 slide-item img-2">
            <div>
              <h4>Yerson Esteyner Orejuela</h4>
              <div className='team-box'>
                <div className="team-img">
                  <img src={Avatar3} alt="" />
                </div>
                <div className="team-info">
                  <p>Desarrollador web</p>
                  <p>Desarrollo Back-end</p>
                  <div>
                    <a href="https://www.facebook.com/"><Facebook /></a>
                    <a href="https://www.instagram.com/"><Instagram /></a>
                    <a href="https://www.linkedin.com/"><Linkedin /></a>
                    <a href="https://github.com/"><Github /></a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-3 slide-item img-3">
            <div>
              <h4>Eilyn Ortiz Guevara</h4>
              <div className='team-box'>
                <div className="team-img">
                  <img src={Avatar2} alt="" />
                </div>
                <div className="team-info">
                  <p>Desarrollador web</p>
                  <p>Documentación</p>
                  <div>
                    <a href="https://www.facebook.com/"><Facebook /></a>
                    <a href="https://www.instagram.com/"><Instagram /></a>
                    <a href="https://www.linkedin.com/"><Linkedin /></a>
                    <a href="https://github.com/"><Github /></a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default SliderAbout
