import { useNavigate, useLocation} from "react-router-dom";
import axios, { AxiosInstance } from 'axios';
import { useState, useContext , useEffect} from "react";
import ImageSliderComponent, {ImageInfo} from "./ImageSliderComponent";
import * as React from "react";

import { accessContext } from './FrontEnd_Index';
import axiosWithCredentials,{requestInterceptor, responseInterceptor}  from './axiosWithCredentials';


export default function ExclusiveChallengePage(): React.JSX.Element {

    //const imagesInfo = useLoaderData() as ImageInfo[];

    const accessContextValue = useContext(accessContext);
    const accessToken = accessContextValue?.accessToken;
    const setAccessToken = accessContextValue?.setAccessToken;

    const [imagesInfo, setImagesInfo] = useState<ImageInfo[] | null >(null); 

    const navigate = useNavigate();
    const locationHook = useLocation(); 

    useEffect ( () => {

        const controller = new AbortController();

        async function startAxios() {
            
            console.log(`Inside Exclusive UseEffect`) ;

            try {
                console.log("Inside try AXIOS");
                const axiosWithCredentialsResponse = await axiosWithCredentials.get("/mongobe/getExclusiveImages", { //getExclusiveImages
                    // headers: {
                    //     Authorization: `Bearer ${accessToken}`
                    // },
                    signal: controller.signal 
                });

                console.log(`Get the getImage BackEnd response : ${Object.entries(axiosWithCredentialsResponse)}`) ;
                setImagesInfo(axiosWithCredentialsResponse.data);
            }

            catch(error) {
                
                console.log(`Inside Exclusive Err ...`) ;
                console.log(error);
                console.log(`After Inside Exclusive Err ...`) ;
                setAccessToken && setAccessToken(false);
                navigate("/login" , { state : locationHook.pathname , replace: true});
            }
        }
        
        startAxios();
        

        // axiosWithCredentials.get("/mongobe/getExclusiveImages", { //getExclusiveImages
        //     // headers: {
        //     //     Authorization: `Bearer ${accessToken}`
        //     // },
        //     signal: controller.signal 
        // }).then( (response: {data : ImageInfo[]}) => {

        //     console.log(`Get the getImage BackEnd response : ${Object.entries(response)}`) ;
        //     setImagesInfo(response.data);

        // }).catch( (err : string)=> {
        //     console.log(`Inside Exclusive Err ...`) ;
        //     console.log(err);
        //     console.log(`After Inside Exclusive Err ...`) ;
        //     setAccessToken && setAccessToken(false);
        //     navigate("/login" , { state : locationHook.pathname , replace: true});

        // } );

        return () => {
            controller.abort(); // Request will cancel and abort when unmounts
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, []);

    useEffect ( () => {
        
        console.log("Inside Exclusive accessToken Checking useEffect");
        if( !accessToken ) {
            navigate( '/login', { state : locationHook.pathname , replace: true});
        }

    }, [accessToken]);
    
    
    return (
        <>
            <h1>Exclusive Challenge Page</h1>
            {imagesInfo && <ImageSliderComponent imagesInfo={imagesInfo} n={1} /> }
            
            
        </>
    );
}