import {useState , useContext, useEffect, useRef} from 'react';
import axios from 'axios' ;
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {requestInterceptor, responseInterceptor} from './axiosWithCredentials';
import axiosWithCredentials  from './axiosWithCredentials';
import {refreshContext, accessContext, userInfoContext } from './FrontEnd_Index';
import * as React from 'react';
import { ImageInfo } from './ImageSliderComponent.js';

import '../public/indexPageInkAnimation.css';
import Lottie,{LottieRefCurrentProps}from 'lottie-react';
import magnifierAnimationIcon from '../public/MagnifierAnimationIcon.json';

export default function UserPage () {

    //const {refreshToken, setrefreshToken} = useContext(refreshContext);
    const accessContextValue = useContext(accessContext);
    const accessToken = accessContextValue?.accessToken;
    const setAccessToken = accessContextValue?.setAccessToken;

    const navigate = useNavigate();
    const locationHook = useLocation(); 

    const magnifierIconRef = useRef<LottieRefCurrentProps>(null);

    const userInfoUseContext = useContext(userInfoContext) ;
    const username = userInfoUseContext?.username;
    const setUserName = userInfoUseContext?.setUsername;
    const userAge = userInfoUseContext?.userAge;
    const setUserAge = userInfoUseContext?.setUserAge;
    const userSex = userInfoUseContext?.userSex;
    const setUserSex = userInfoUseContext?.setUserSex;
    const userEmail = userInfoUseContext?.userEmail;
    const setUserEmail = userInfoUseContext?.setUserEmail;

    useEffect ( () => {
    
        if( !accessToken ) {
            navigate( '/login', { state : locationHook.pathname , replace: true});
        }

    }, [accessToken]);

    useEffect ( () => {
    const controller = new AbortController();

        async function startAxios() {
            
            console.log(`Inside UserPage UseEffect`) ;

            try {
                console.log("Inside UserPage try AXIOS");
                const getUserInfoResponse = await axiosWithCredentials.get(`/mongobe/getUserInfo?username=${username}`, { 
                    signal: controller.signal 
                });

                //console.log(`getUserInfoResponse : ${JSON.stringify(getUserInfoResponse.data)}`) ;
                console.log("After await axiosWithCredentials, username is ", username);
                console.log(`Status Code is ${getUserInfoResponse.status}`);

                if (getUserInfoResponse.status === 200) {
                    const getUserInfoResponseData = getUserInfoResponse.data[0] ;

                    console.log(`getUserInfoResponseData : ${JSON.stringify(getUserInfoResponseData)}`) ;

                    setUserName && setUserName( getUserInfoResponseData.name);
                    setUserAge && setUserAge( getUserInfoResponseData.age);
                    setUserSex && setUserSex( getUserInfoResponseData.sex);
                    setUserEmail && setUserEmail( getUserInfoResponseData.email);
                }

                else {
                    console.log(`Status Code is not 200, could be cache data and not updated.`);
                }
                

            }

            catch(error) {
                
                console.log(`Inside UserPage Err ...`) ;
                console.log(error);
                console.log(`After Inside UserPage Err ...`) ;
                setAccessToken && setAccessToken(false);
                navigate("/login" , { state : locationHook.pathname , replace: true});
            }
        }
        
        startAxios();

        return () => {
            controller.abort(); // Request will cancel and abort when unmounts
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, []);


    return ( <>
        <div className="inkAnimationEffectContainer">
            <div className="centerContainer" style={{marginTop:"100px"}}> 
                <h2 style={{ margin:'0px'}}>Hi { username?.toUpperCase() }, Welcome to User Page</h2> 
                <div onMouseEnter={ ()=>  magnifierIconRef.current?.goToAndPlay(0,true) } onMouseLeave={ ()=>  magnifierIconRef.current?.goToAndStop(0,true) } style={{ display:"flex",justifyContent:"center", alignItems:"center" }}>
                    <NavLink to='/exclusive'>Exclusive Challenge Page</NavLink>
                    <Lottie lottieRef={magnifierIconRef} animationData={magnifierAnimationIcon} loop={true} autoplay={false} style={{ width:"75px", height:"75px"}} />
                </div>
                <NavLink to='/userInformationEditPage'>User Information Edit Page</NavLink>
                <NavLink to='/deleteAccountPage'>Account Delete Page</NavLink>
            </div>
        </div>
    </>)
}