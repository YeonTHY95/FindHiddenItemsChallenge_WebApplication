import { Link } from 'react-router-dom';
import * as React from 'react';
export default function Welcome() {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Welcome to the Page !!!"),
        React.createElement(Link, { to: '/images' }, "Challenge Image Hidden Objects"),
        React.createElement("br", null),
        React.createElement(Link, { to: '/sliderPage' }, "Swiper Testing")));
}
