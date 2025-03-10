import {Link, Outlet, useNavigate, NavLink} from 'react-router-dom'
import { createContext, useState, useContext, useRef} from 'react';
import * as React from 'react';
import { userInfoContext , accessContext} from './FrontEnd_Index';

import axios from 'axios';

import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import AccountAnimationIcon from '../public/AccountIcon.json';
import logoutAnimationIcon from '../public/RotateArrowIcon.json';
import magnifierAnimationIcon from '../public/MagnifierAnimationIcon.json';
import homeAnimationIcon from '../public/HomeAnimationIcon.json';



// export const accessContext = createContext<{accessToken:boolean ; setAccessToken:React.Dispatch<React.SetStateAction<boolean>>} | null >(null);
// export const refreshContext = createContext<{refreshToken:boolean; setRefreshToken:React.Dispatch<React.SetStateAction<boolean>>} | null >(null);

 export default function NavPage() : React.JSX.Element {

    // const [ accessToken, setAccessToken ] = useState<boolean>(false) ;
    // const [ refreshToken, setRefreshToken ] = useState<boolean>(false) ;
    const accessUseContext = useContext(accessContext);
    const accessToken = accessUseContext?.accessToken;
    const setAccessToken = accessUseContext?.setAccessToken;
    const navigate = useNavigate();

    const accountIconRef = useRef<LottieRefCurrentProps>(null);
    const logoutIconRef = useRef<LottieRefCurrentProps>(null);
    const userIconRef = useRef<LottieRefCurrentProps>(null);
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


    const logOut = () => {
        
        axios.post ("/mongobe/logout").then ( response => {
            if(response.status === 204) {
                setAccessToken && setAccessToken(false);
                setUserName && setUserName(undefined);
                setUserAge && setUserAge(undefined);
                setUserSex && setUserSex(undefined);
                setUserEmail && setUserEmail(undefined);
                navigate('/login');
            }
        }).catch(err => console.log(err));
    };


    return (<>
        
            <nav style={{ display:'flex', justifyContent:'space-between', alignItems:"center", padding:"10px", height:"5vh"}}>
                <div className="navContainer" style={{ display:'flex', justifyContent:'start', gap: "10px", alignItems:"center", padding:"10px"}}>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} onMouseEnter={()=> magnifierIconRef.current?.goToAndPlay(0,true) } onMouseLeave={()=> magnifierIconRef.current?.goToAndStop(0,true)}><Link to='/'>Home</Link><Lottie lottieRef={magnifierIconRef} animationData={homeAnimationIcon} loop={true} autoplay={false} style={{ width:"30px", height:"30px"}} /></div>
                    { !accessToken && ( <Link to='/signup'>Sign Up</Link>) }
                    { !accessToken && ( <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} onMouseEnter={()=> accountIconRef.current?.goToAndPlay(0,true) } onMouseLeave={()=> accountIconRef.current?.goToAndStop(0,true)}><Link to='/login'>Login</Link><Lottie lottieRef={accountIconRef} animationData={AccountAnimationIcon} loop={true} autoplay={false} style={{ width:"30px", height:"30px"}}/></div> )  }
                    { accessToken && ( <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} onMouseEnter={()=> userIconRef.current?.goToAndPlay(0,true) } onMouseLeave={()=> userIconRef.current?.goToAndStop(0,true)}><Link to='/userPage'>UserPage</Link><Lottie lottieRef={userIconRef} animationData={AccountAnimationIcon} loop={true} autoplay={false} style={{ width:"30px", height:"30px"}}/></div> )  }
                    { accessToken && ( <NavLink to="/inkPage">Ink Page</NavLink>) }
                    { accessToken && ( <NavLink to="/AnimationPage">Animation Page</NavLink>) }
                </div>
                <div style={{ display:'flex', justifyContent:'end', alignItems:"center", padding:"10px"}}>
                    { accessToken && ( <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} onMouseEnter={()=> logoutIconRef.current?.goToAndPlay(0,true) } onMouseLeave={()=> logoutIconRef.current?.goToAndStop(0,true)}><button onClick={logOut} style={{ borderRadius: '30%', fontSize: '15px'}}>Log Out</button><Lottie lottieRef={logoutIconRef}  animationData={logoutAnimationIcon} loop={true} autoplay={false}  style={{ width:"30px", height:"30px"}} /></div> ) }
                </div>
            </nav>
            <div style={{ height:"95vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Outlet />
            </div>
        
        </>);

 }