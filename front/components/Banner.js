import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper';

export default function Banner({ data }) {
  const { Items } = data;

  return (
    <div className="py-8">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        navigation
        autoplay
        loop
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {Items.map(({ id, imageUrl }) => (
          <SwiperSlide key={id}>
            <img
              src={imageUrl}
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
