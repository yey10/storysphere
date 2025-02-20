import React from 'react';
import ReactImg from '../../assets/img/persona.png';
import storyImg1 from '../../assets/img/Stories/1.webp';
import storyImg2 from '../../assets/img/Stories/2.webp';
import storyImg3 from '../../assets/img/Stories/3.webp';
import storyImg4 from '../../assets/img/Stories/4.webp';
import storyImg5 from '../../assets/img/Stories/5.webp';
import storyImg6 from '../../assets/img/Stories/6.webp';
import storyImg7 from '../../assets/img/Stories/7.webp';
import storyImg8 from '../../assets/img/Stories/8.webp';
import storyImg9 from '../../assets/img/Stories/9.webp';
import storyImg10 from '../../assets/img/Stories/10.webp';
import storyImg11 from '../../assets/img/Stories/11.webp';
import storyImg12 from '../../assets/img/Stories/12.webp';
import storyImg13 from '../../assets/img/Stories/13.webp';
import storyImg14 from '../../assets/img/Stories/14.webp';
import storyImg15 from '../../assets/img/Stories/15.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper/core';
SwiperCore.use([ Navigation ]);
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SliderUsuario2 = () => {
  return (
    <div>
      <div className="slider-stories1">
        <div className="slider-content">
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                speed={400}
                navigation={{
                nextEl: '.next',
                prevEl: '.prev',
                }}
                breakpoints={{
                550: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                950: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                }}
            >
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg1} alt="User 1" />
                    </div>
                    <p>Ecos del Pasado</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg2} alt="User 2" />
                    </div>
                    <p>El Último Tren</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg3} alt="User 3" />
                    </div>
                    <p>Sombras en la Niebla</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg4} alt="User 4" />
                    </div>
                    <p>El Reloj de Arena</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg5} alt="User 5" />
                    </div>
                    <p>La Puerta Olvidada</p>
                </SwiperSlide>
        
                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg6} alt="User 6" />
                    </div>
                    <p>El Susurro del Bosque</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg7} alt="User 7" />
                    </div>
                    <p>El Espejo Roto</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg8} alt="User 8" />
                    </div>
                    <p>La Biblioteca de los Olvidados</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg9} alt="User 9" />
                    </div>
                    <p>El Último Pasajero</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg10} alt="User 10" />
                    </div>
                    <p>La Casa de las Sombras</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg11} alt="User 11" />
                    </div>
                    <p>El Faro Eterno</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg12} alt="User 12" />
                    </div>
                    <p>El Tiempo Divino</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg13} alt="User 13" />
                    </div>
                    <p>El Reflejo Perdido</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg14} alt="User 14" />
                    </div>
                    <p>La Biblioteca de Medianoche</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg15} alt="User 15" />
                    </div>
                    <p>El Susurro del Bosque</p>
                </SwiperSlide>
            </Swiper>
      
                <ul className="control" id="custom-control">
                  <li className="prev"><ArrowLeft /></li>
                  <li className="next"><ArrowRight /></li>
                </ul>
        </div>
      </div>
    </div>
  )
}

export default SliderUsuario2
