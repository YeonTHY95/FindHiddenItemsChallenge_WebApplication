import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import Welcome from './Welcome'
import HiddenObjectsChallengePage from './HiddenObjectsChallengePage.js';
import fetchImageFunction from './fetchImage';
import FindHiddenObjects from './FindHiddenObjects';
import SliderPage from './SliderPage';
import UserPage from "./UserPage" ;
import SignUpPage from "./SignUpPage" ;
import NavPage from './NavPage';
import LoginPage from './LoginPage';
import InkPage from './InkPage';
import SplashScreen from './SplashScreen';
import AnimationPage from './AnimationPage';
import ExclusiveChallengePage from './ExclusiveChallengePage';
import fetchExclusiveImageFunction from './fetchExclusive';

import { createContext, useState , lazy, Suspense} from 'react';
import * as React from 'react';
import UserInformationEditPage from './UserInformationEditPage';
import DeleteAccountPage from './DeleteAccountPage';

export const accessContext = createContext<{accessToken:boolean ; setAccessToken:React.Dispatch<React.SetStateAction<boolean>>} | null >(null);
export const refreshContext = createContext<{refreshToken:boolean; setRefreshToken:React.Dispatch<React.SetStateAction<boolean>>} | null >(null);

export const userInfoContext = createContext<
                                {
                                    username:string | undefined; 
                                    setUsername:React.Dispatch<React.SetStateAction<string | undefined>>;
                                    userAge:number | undefined; 
                                    setUserAge:React.Dispatch<React.SetStateAction<number | undefined>>;
                                    userSex:"Male" | "Female" | undefined; 
                                    setUserSex:React.Dispatch<React.SetStateAction<"Male" | "Female" | undefined>>;
                                    userEmail:string | undefined; 
                                    setUserEmail:React.Dispatch<React.SetStateAction<string | undefined>>;

                                } | null >(null);

const LazyInkPage = lazy(()=> import('./InkPage')) ;

const FrontEnd_Index = () : React.JSX.Element => {

    const [ accessToken, setAccessToken ] = useState<boolean>(false) ;
    const [ refreshToken, setRefreshToken ] = useState<boolean>(false) ;

    const [ username, setUsername ] = useState< string | undefined >(undefined);
    const [ userAge, setUserAge ] = useState< number | undefined >(undefined);
    const [ userSex, setUserSex ] = useState< "Male" | "Female" | undefined>(undefined);
    const [ userEmail, setUserEmail ] = useState< string | undefined >(undefined);
    
    
    const myFrontEndEntryPoint = createBrowserRouter ([
        {
            path : '/',
            element : <NavPage />,
            children : [
                {
                    path : "/",
                    element : <Welcome />,                    
                },
                {
                    path : "/images",
                    element : <HiddenObjectsChallengePage />,
                    loader : fetchImageFunction
                },
                {
                    path : "/exclusive",
                    element : <ExclusiveChallengePage />,
                },
                {
                    path : "/images/:imageName",
                    element : <FindHiddenObjects />,
                    
                },
                {
                    path: "/sliderPage",
                    element : <SliderPage />
                },
                {
                    path: "/signup",
                    element : <SignUpPage />
                },
                {
                    path: "/login",
                    element : <LoginPage />
                },
                {
                    path: "/userPage",
                    element : <UserPage />
                },
                {
                    path: "/inkPage",
                    element : <Suspense fallback={<><h1>Loading...</h1></>}><LazyInkPage /></Suspense>
                },
                {
                    path: "/SplashScreen",
                    element : <SplashScreen />
                },
                {
                    path: "/AnimationPage",
                    element : <AnimationPage />
                },
                {
                    path: "/userInformationEditPage",
                    element : <UserInformationEditPage />
                },
                {
                    path: "/deleteAccountPage",
                    element : <DeleteAccountPage />
                },
            ]
            
        }
        


    ]);



    return ( 
    <refreshContext.Provider value= { {refreshToken , setRefreshToken} }>
        <accessContext.Provider value= { {accessToken, setAccessToken} }>
            <userInfoContext.Provider value= {{username, setUsername, userSex, setUserSex, userAge,setUserAge, userEmail, setUserEmail}}>
                <RouterProvider router ={myFrontEndEntryPoint} />
            </userInfoContext.Provider >
        </accessContext.Provider>
    </refreshContext.Provider>
    )
};

export {FrontEnd_Index };