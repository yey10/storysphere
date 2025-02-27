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
                        <img src={storyImg1} alt="User 1" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg2} alt="User 2" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg21} alt="User 3" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg24} alt="User 4" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg15} alt="User 5" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg6} alt="User 6" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg17} alt="User 7" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg8} alt="User 8" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg11} alt="User 9" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg20} alt="User 10" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg19} alt="User 11" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg29} alt="User 12" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg28} alt="User 13" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg25} alt="User 14" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg3} alt="User 15" />
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
                        <img src={storyImg16} alt="User 1" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg4} alt="User 2" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg9} alt="User 3" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg5} alt="User 4" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide>
                    <div className="content">
                        <img src={storyImg10} alt="User 5" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>
        
                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg7} alt="User 6" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg12} alt="User 7" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg18} alt="User 8" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg22} alt="User 9" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg14} alt="User 10" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg23} alt="User 11" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg13} alt="User 12" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg30} alt="User 13" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg26} alt="User 14" />
                        <div>
                            <h4>titulo</h4>
                            <button className='buttonLight'><Link to="/stories">Leer más</Link></button> {/** historia por id */}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-no-swiping">
                    <div className="content">
                        <img src={storyImg27} alt="User 15" />
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
