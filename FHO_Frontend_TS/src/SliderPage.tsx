import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation , Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import * as React from 'react';

const SliderPage = () => {



    return ( <>
        <div className='swiperContainer'>
            <h1>Swiper Testing</h1>
            { // Slider main container }
            }

            <Swiper className='swiperclass'
                navigation
                modules={[Navigation,Pagination]}
                pagination={{
                    clickable:true,
                }}
                spaceBetween={50}
                loop={true}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide><img height="100%" src="./Beach.jpg" /></SwiperSlide>
                <SwiperSlide><img src="./Garden.jpg" /></SwiperSlide>
                <SwiperSlide><img src="./Greetings.jpg" /></SwiperSlide>
                <SwiperSlide><img src="./Room.jpg" /></SwiperSlide>
                <SwiperSlide><img src="./UnderTheSea.jpg" /></SwiperSlide>
                
            </Swiper>
        </div>
    </>)
}

export default SliderPage;

// //<SwiperSlide><img src="./Beach.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./Garden.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./Greetings.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./Room.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./UnderTheSea.jpg" /></SwiperSlide>

{/* <SwiperSlide>11</SwiperSlide>
            <SwiperSlide>22</SwiperSlide>
            <SwiperSlide>33</SwiperSlide>
            <SwiperSlide>44</SwiperSlide>
            <SwiperSlide>55</SwiperSlide> */}