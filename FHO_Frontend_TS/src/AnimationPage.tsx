import React from 'react'
import Lottie, {LottieRefCurrentProps} from 'lottie-react'
import { accessContext } from './FrontEnd_Index'
import { useNavigate , useLocation } from 'react-router-dom';
import CatLottieAnimation from '../public/CatLottieAnimation.json'

function AnimationPage () {

    const accessUseContext = React.useContext(accessContext) ;
    const accessToken = accessUseContext?.accessToken;
    const locationHook = useLocation();
    const navigate = useNavigate();

    const CatLottieAnimationRef = React.useRef<LottieRefCurrentProps>(null);

    React.useEffect(()=> {
        if (!accessToken){
            navigate("/login", { state : locationHook.pathname , replace: true}) ;
        }
    },[accessToken]);

    return (<>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"80vh"}}>

            <Lottie lottieRef={CatLottieAnimationRef} animationData={CatLottieAnimation} loop={false} style={{ width : "100%", height:"90%"}}/>

            <button style={{  height:"10%"}}onMouseEnter={ ()=> {CatLottieAnimationRef.current?.goToAndPlay(0, true) ; console.log("Inside onMouseEnter"); }} onMouseLeave={()=>{ CatLottieAnimationRef.current?.goToAndStop(0, true); console.log("Inside onMouseLeave"); }} >Hover Me</button>

        </div>
    </>)
}

export default AnimationPage 