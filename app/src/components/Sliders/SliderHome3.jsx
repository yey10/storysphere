import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import ReactImg4 from '../../assets/img/Accion.jpeg';
import ReactImg5 from '../../assets/img/Drama.jpeg';
import ReactImg6 from '../../assets/img/Ficcion.jpeg';
import ReactImg7 from '../../assets/img/Misterio.jpeg';
import ReactImg8 from '../../assets/img/Romance.jpeg';
import ReactImg9 from '../../assets/img/Terror.jpeg';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SliderHome3 = () => {
  return (
    <div>
        <div className="home-4">
            <h3 className='title'>La categoría que quieras a tu alcance</h3>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className='swiper-home4'
            >
                <SwiperSlide>
                    <div className='category-img'>
                        <img src={ReactImg4} alt="imagen1" />
                    </div>
                    <div className='category-info'>
                        <h2 className='title'>ACCIÓN</h2>
                        <button className="buttonLight"><Link to="login">Ver más</Link></button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='category-img'>
                        <img src={ReactImg5} alt="imagen2" />
                    </div>
                    <div className='category-info'>
                        <h2 className='title'>DRAMA</h2>
                        <button className="buttonLight"><Link to="login">Ver más</Link></button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='category-img'>
                        <img src={ReactImg6} alt="imagen3" />
                    </div>
                    <div className='category-info'>
                        <h2 className='title'>FANTASÍA</h2>
                        <button className="buttonLight"><Link to="login">Ver más</Link></button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='category-img'>
                        <img src={ReactImg7} alt="imagen4" />
                    </div>
                    <div className='category-info'>
                        <h2 className='title'>MISTERIO</h2>
                        <button className="buttonLight"><Link to="login">Ver más</Link></button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='category-img'>
                        <img src={ReactImg8} alt="imagen5" />
                    </div>
                    <div className='category-info'>
                        <h2 className='title'>ROMANCE</h2>
                        <button className="buttonLight"><Link to="login">Ver más</Link></button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='category-img'>
                        <img src={ReactImg9} alt="imagen6" />
                    </div>
                    <div className='category-info'>
                        <h2 className='title'>TERROR</h2>
                        <button className="buttonLight"><Link to="login">Ver más</Link></button>
                    </div>
                </SwiperSlide>

                <div className="slider-controller">
                    <div className="swiper-button-prev slider-arrow">
                        <ArrowLeft />
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ArrowRight />
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>


        {/** 
        <div className="categorias">
            <div><img src={ReactImg4} alt="Acción" /><div><h4>Acción</h4><button><Link to="/categories">Saber más</Link></button></div></div>
            <div><img src={ReactImg5} alt="Drama" /><div><h4>Drama</h4><button><Link to="/categories">Saber más</Link></button></div></div>
            <div><img src={ReactImg6} alt="Ficción" /><div><h4>Ficción</h4><button><Link to="/categories">Saber más</Link></button></div></div>
            <div><img src={ReactImg7} alt="Misterio" /><div><h4>Misterio</h4><button><Link to="/categories">Saber más</Link></button></div></div>
            <div><img src={ReactImg8} alt="Romance" /><div><h4>Romance</h4><button><Link to="/categories">Saber más</Link></button></div></div>
            <div><img src={ReactImg9} alt="Terror" /><div><h4>Terror</h4><button><Link to="/categories">Saber más</Link></button></div></div>
        </div> */}
    </div>
  )
}

export default SliderHome3
