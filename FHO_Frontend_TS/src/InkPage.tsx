import { useState, useContext, useEffect, useLayoutEffect, useRef} from 'react';
//import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { accessContext } from './FrontEnd_Index';
import "../public/inkAnimation.css"

import * as React from 'react';

const InkPage = () => {

    const navigate = useNavigate();
    const locationHook = useLocation();
    const accessUseContext = useContext(accessContext) ;
    const accessToken = accessUseContext?.accessToken;

    const bigTitleRef = useRef<HTMLElement>(null);

    useEffect ( () => {

        if( !accessToken ) {
            navigate( '/login', { state : locationHook.pathname , replace: true});
        }

    }, [accessToken]);

    useLayoutEffect (()=> {

        bigTitleRef.current && ( bigTitleRef.current.classList.add("bigTitle") );
        //<Suspense fallback={<><h1>Loading...</h1></>}><LazyInkPage /></Suspense>
        console.log("Testing useLayoutEffect");

        return ( ()=> {
            bigTitleRef.current && ( bigTitleRef.current.classList.remove("bigTitle") );
        })

    },[]);


    return ( <>

        <section  ref={bigTitleRef} >
            <h1 style={{ color:"white"}}>Test the Ink Animation</h1>
        </section>

    </>)
}

export default InkPage ;