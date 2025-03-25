import React, {useEffect} from 'react';
import ReactImg from '../../assets/img/persona.png';
import {useStory} from '../../context/StoryContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper/core';
SwiperCore.use([ Navigation ]);
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SliderUsuario2 = () => {

    const { stories, isLoading, fetchStories } = useStory();

    console.log("Historias obtenidas: ", stories);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

  return (
    <div>
      <div className="slider-stories1">
        <div className="slider-content">
          {isLoading ? (
            <p>Cargando historias...</p>
          ) : (
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
                550: { slidesPerView: 2, spaceBetween: 20 },
                950: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
            >
              {stories.length > 0 ? (
                stories.map((story) => (
                  <SwiperSlide key={story.id_story}>
                    <div className="content">
                      <img
                        src={story.photo || "/default-image.jpg"}
                        alt={story.title}
                      />
                    </div>
                    <p>{story.title}</p>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <p>No hay historias disponibles.</p>
                </SwiperSlide>
              )}
            </Swiper>
          )}

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
