import React from 'react';
import { Link } from 'react-router-dom';
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
import storyImg16 from '../../assets/img/Stories/61.webp';
import storyImg17 from '../../assets/img/Stories/54.webp';
import storyImg18 from '../../assets/img/Stories/45.webp';
import storyImg19 from '../../assets/img/Stories/23.webp';
import storyImg20 from '../../assets/img/Stories/57.webp';
import storyImg21 from '../../assets/img/Stories/19.webp';
import storyImg22 from '../../assets/img/Stories/22.webp';
import storyImg23 from '../../assets/img/Stories/60.webp';
import storyImg24 from '../../assets/img/Stories/26.webp';
import storyImg25 from '../../assets/img/Stories/32.webp';
import storyImg26 from '../../assets/img/Stories/39.webp';
import storyImg27 from '../../assets/img/Stories/41.webp';
import storyImg28 from '../../assets/img/Stories/48.webp';
import storyImg29 from '../../assets/img/Stories/59.webp';
import storyImg30 from '../../assets/img/Stories/50.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper/core';
SwiperCore.use([ Navigation ]);
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../../assets/img/logo.jpeg';

const SliderStorie = () => {
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
                        <LazyLoadImage src={storyImg1} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg2} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg21} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg24} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img'/>
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg15} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg6} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg17} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg8}  placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg11} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg20} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg19} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg29} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg28} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg25} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg3} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img'/>
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
      
                <ul className="control" id="custom-control">
                  <li className="prev"><ArrowLeft /></li>
                  <li className="next"><ArrowRight /></li>
                </ul>
        </div>
      </div>

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
                        <LazyLoadImage src={storyImg16} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg4} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg9} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg5} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <LazyLoadImage src={storyImg10} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg7} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg12} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg18} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg22} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg14} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg23} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg13} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg30} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg26} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <LazyLoadImage src={storyImg27} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
      </div>

    </div>
  )
}

export default SliderStorie
