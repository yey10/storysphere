import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SliderStories = ({ authors }) => {
  return (
    <div className="my-8">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        className="author-slider"
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
        {authors.map((author) => (
          <SwiperSlide key={author.id}>
            <div className="popular-content">
              <div className='popular-img'>
                <img src={author.image} alt={author.name} />
              </div>
              <div className="popular-info">
                <p>{author.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderStories
