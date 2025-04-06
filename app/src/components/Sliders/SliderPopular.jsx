import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../../assets/img/logo.jpeg';

const SliderStories = ({ populares }) => {
  return (
    <div className="my-8">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        className="popular-slider"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }}
      >
        {populares.map((popular) => (
          <SwiperSlide key={popular.id}>
            <div className="popular-content">
              <div className='popular-img'>
                <LazyLoadImage src={popular.image} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
              </div>
              <div className="popular-info">
                <h3 className="title">{popular.title}</h3>
                <p>By {popular.author}</p>
                <p>{popular.opinions} Opiniones</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderStories
