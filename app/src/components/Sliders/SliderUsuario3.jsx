import React from 'react';
import storyImg1 from '../../assets/img/Stories/16.webp';
import storyImg2 from '../../assets/img/Stories/17.webp';
import storyImg3 from '../../assets/img/Stories/18.webp';
import storyImg4 from '../../assets/img/Stories/19.webp';
import storyImg5 from '../../assets/img/Stories/20.webp';
import storyImg6 from '../../assets/img/Stories/21.webp';
import storyImg7 from '../../assets/img/Stories/22.webp';
import storyImg8 from '../../assets/img/Stories/23.webp';
import storyImg9 from '../../assets/img/Stories/24.webp';
import storyImg10 from '../../assets/img/Stories/25.webp';
import storyImg11 from '../../assets/img/Stories/26.webp';
import storyImg12 from '../../assets/img/Stories/27.webp';
import storyImg13 from '../../assets/img/Stories/28.webp';
import storyImg14 from '../../assets/img/Stories/29.webp';
import storyImg15 from '../../assets/img/Stories/30.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper/core';
SwiperCore.use([ Navigation ]);
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SliderUsuario3 = () => {
  return (
    <div>
      <div className="slider-stories2">
        <div className="slider-content">
            <Swiper className='swiper2'
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                speed={400}
                navigation={{
                nextEl: '.next2',
                prevEl: '.prev2',
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
                    <p>El Faro Perdido</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg2} alt="User 2" />
                    </div>
                    <p>El Reloj del Fin del Tiempo</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg3} alt="User 3" />
                    </div>
                    <p>El Reflejo Olvidado</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg4} alt="User 4" />
                    </div>
                    <p>Las Sombras de la Biblioteca</p>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg5} alt="User 5" />
                    </div>
                    <p>El Susurro del Bosque</p>
                </SwiperSlide>
        
                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg6} alt="User 6" />
                    </div>
                    <p>Cartas Bajo la Lluvia</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg7} alt="User 7" />
                    </div>
                    <p>Notas de un Café</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg8} alt="User 8" />
                    </div>
                    <p>Bajo las Luces de la Feria</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg9} alt="User 9" />
                    </div>
                    <p>Una mansión abandonada</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg10} alt="User 10" />
                    </div>
                    <p>Las 50 sombras del bosque</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg11} alt="User 11" />
                    </div>
                    <p>Aquel hospital</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg12} alt="User 12" />
                    </div>
                    <p>Un vigilante enmascarado</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg13} alt="User 13" />
                    </div>
                    <p>Carrera contra la velocidad</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg14} alt="User 14" />
                    </div>
                    <p>Heroe caotico</p>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg15} alt="User 15" />
                    </div>
                    <p>El vasto paisaje alienigena</p>
                </SwiperSlide>
            </Swiper>
      
                <ul className="control" id="custom-control">
                  <li className="prev2"><ArrowLeft /></li>
                  <li className="next2"><ArrowRight /></li>
                </ul>
        </div>
      </div>
    </div>
  )
}

export default SliderUsuario3
