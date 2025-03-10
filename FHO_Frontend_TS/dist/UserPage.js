import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { requestInterceptor, responseInterceptor } from './axiosWithCredentials';
import axiosWithCredentials from './axiosWithCredentials';
import { accessContext } from './FrontEnd_Index';
import * as React from 'react';
import '../public/indexPageInkAnimation.css';
export default function UserPage() {
    //const {refreshToken, setrefreshToken} = useContext(refreshContext);
    const accessContextValue = useContext(accessContext);
    const accessToken = accessContextValue === null || accessContextValue === void 0 ? void 0 : accessContextValue.accessToken;
    const setAccessToken = accessContextValue === null || accessContextValue === void 0 ? void 0 : accessContextValue.setAccessToken;
    const [imageDetails, setImageDetails] = useState();
    const navigate = useNavigate();
    const locationHook = useLocation();
    useEffect(() => {
        console.log(`Inside UserPage UseEffect`);
        const controller = new AbortController();
        axiosWithCredentials.get("/mongobe/getImage", {
            // headers: {
            //     Authorization: `Bearer ${accessToken}`
            // },
            signal: controller.signal
        }).then((response) => {
            console.log(`Get the getImage BackEnd response : ${Object.entries(response)}`);
            setImageDetails(response.data);
        }).catch((err) => {
            console.log(`Inside UserPage Err ...`);
            console.log(err);
            console.log(`After Inside UserPage Err ...`);
            setAccessToken && setAccessToken(false);
            navigate("/login", { state: locationHook.pathname, replace: true });
        });
        return () => {
            controller.abort(); // Request will cancel and abort when unmounts
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);
    // const logOut = () => {
    //     axios.post ("/mongobe/logout").then ( response => {
    //         if(response.status === 204) navigate('/login');
    //     }).catch(err => console.log(err));
    // };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "inkAnimationEffectContainer" },
            React.createElement("div", { className: "centerContainer" },
                React.createElement("h2", { style: { margin: '0px' } }, "Welcome to User Page"),
                React.createElement("div", null, imageDetails && imageDetails.map(image => {
                    return React.createElement("img", { src: image.imageURL, alt: image.imageName, style: { width: '100px', height: '100px' } });
                }))))));
}
