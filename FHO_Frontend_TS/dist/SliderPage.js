import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import * as React from 'react';
const SliderPage = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Swiper Testing"),
        React.createElement(Swiper, { className: 'xxx', navigation: true, modules: [Navigation, Pagination], pagination: {
                clickable: true,
            }, spaceBetween: 50, loop: true, slidesPerView: 3, onSlideChange: () => console.log('slide change'), onSwiper: (swiper) => console.log(swiper) },
            React.createElement(SwiperSlide, null,
                React.createElement("img", { src: "./Beach.jpg" })),
            React.createElement(SwiperSlide, null,
                React.createElement("img", { src: "./Garden.jpg" })),
            React.createElement(SwiperSlide, null,
                React.createElement("img", { src: "./Greetings.jpg" })),
            React.createElement(SwiperSlide, null,
                React.createElement("img", { src: "./Room.jpg" })),
            React.createElement(SwiperSlide, null,
                React.createElement("img", { src: "./UnderTheSea.jpg" })))));
};
export default SliderPage;
// //<SwiperSlide><img src="./Beach.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./Garden.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./Greetings.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./Room.jpg" /></SwiperSlide>
// <SwiperSlide><img src="./UnderTheSea.jpg" /></SwiperSlide>
{ /* <SwiperSlide>11</SwiperSlide>
            <SwiperSlide>22</SwiperSlide>
            <SwiperSlide>33</SwiperSlide>
            <SwiperSlide>44</SwiperSlide>
            <SwiperSlide>55</SwiperSlide> */
}
