import {Link} from 'react-router-dom';
import * as React from 'react';
import Lottie,{LottieRefCurrentProps}from 'lottie-react';
import magnifierAnimationIcon from '../public/MagnifierAnimationIcon.json';

 export default function Welcome() : React.JSX.Element {

        const magnifierIconRef = React.useRef<LottieRefCurrentProps>(null);

        return (<>
                <div style={{ display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <h1 >Welcome to the Page !!!</h1>
                <div style={{ display:"flex", flexDirection:"column",gap:"20px",justifyContent:"center"}}>
                        <div className='linktochallengepage' data-label="Free Challenge Page"><Link to='/images'>Challenge Image Hidden Objects</Link><br /></div>
                        <div className='linktoexclusivepage' data-label="Exclusive Page, Membership Required" onMouseEnter={ ()=>  magnifierIconRef.current?.goToAndPlay(0,true) } onMouseLeave={ ()=>  magnifierIconRef.current?.goToAndStop(0,true) } style={{ display:"flex",justifyContent:"center", alignItems:"center" }}>
                                
                                <Link to='/exclusive'>Exclusive Challenge Page</Link><Lottie lottieRef={magnifierIconRef} animationData={magnifierAnimationIcon} loop={true} autoplay={false} style={{ width:"30px", height:"30px"}} />
                                <br />
                        </div>
                        <div className='linktoswiper' data-label="Go to Swiper Demonstration Page"><Link to='/sliderPage'>Swiper Testing</Link></div>
                </div>
                </div>          
        
        </>);

 }