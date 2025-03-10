import React from 'react'
import Lottie , { LottieRefCurrentProps } from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import FindHiddenObjectSplashScreen from '../public/FindHiddenObjectSplashScreen_1000x1000.json'
import { accessContext } from './FrontEnd_Index';

const SplashScreen = () => {

    const accessUseContext = React.useContext(accessContext);
    const accessToken = accessUseContext?.accessToken;

    // React.useEffect (()=> {
    //     if( accessToken) {
    //         navigate( '/userPage');
    //     }
    // },[accessToken]);

    const navigate = useNavigate() ;
    
    const splashScreenOnComplete = () => {

        navigate('/userPage');
        
        
    }

    return (<>
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Lottie onComplete={splashScreenOnComplete} animationData={FindHiddenObjectSplashScreen} loop={false}/>
    </div>
        
    </>)
}

export default SplashScreen