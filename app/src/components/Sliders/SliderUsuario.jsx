import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay]);
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Crown } from 'lucide-react'
import Bienvenida1 from '../../assets/img/portada.jpeg'
import Bienvenida2 from '../../assets/img/bienvenida2.png'
import Premium from '../../assets/img/portadaPremium.png'

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
              <img src={Bienvenida1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-2 slide-item img-2">
            <div>
              <img src={Bienvenida2} alt="" />
              <div className='circles circle1'>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className='circles circle2'>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className='bg-img2'>
                <h4 className='title'>PREMIUM <Crown /></h4>
                <p>Haz crecer tu impacto con un plan premium. Accede a más herramientas y visibilidad.</p>
                <p>Sé parte de la élite literaria. Destaca tus historias y accede a contenido exclusivo.</p>
                <button className="buttonLight"><Link to="services">PREMIUM</Link></button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide slide-3 slide-item img-3">
            <div>
              <img src={Premium} alt="" />
              <div className='circles circle0'>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className='circles circle01'>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className='img-info'>
                <h4 className='title'>EMPIEZA HOY MISMO</h4>
                <p>Cada historia merece ser contada. Aquí encontrarás una audiencia para la tuya.</p>
                <p>Escribe sin miedo. Lee sin límites. Únete a la comunidad de StorySphere.</p>
                <button className='buttonLight'><Link to="user/stories">Ver Historias</Link></button>
              </div>
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