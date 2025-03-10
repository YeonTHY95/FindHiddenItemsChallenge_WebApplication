import {useRef, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import * as React from 'react';

export interface ImageInfo {
    
    imageID : string | number;
    imageName : string;
    imageURL : string;
    HiddenObjectPixelLocation : Record<string,{ x:number, y:number}[]>;
    
}

export default function ImageSliderComponent ( {imagesInfo, n}: {imagesInfo:ImageInfo[], n:number}) : React.JSX.Element {

    const imageSliderRef = useRef<HTMLDivElement>(null);

    const [imageIndex, setImageIndex] = useState<number>(0);

    

    useEffect( () => {
        //console.log(imageSliderRef.current.querySelectorAll('div'));

        // Reset all images
        if (imageSliderRef.current === null) {
            throw new Error('imageSliderRef.current is null');
        }
        imageSliderRef.current.querySelectorAll('div').forEach( image => image.style.display = 'none');

        console.log(`Number of images to display is ${n}`);

        console.log(`Inside useEffect, imageIndex is now ${imageIndex}`);
        //console.log(`Inside useEffect, querySelectorAll is now ${Object.entries(imageSliderRef.current.querySelectorAll('div'))}`);
        if ( imageSliderRef.current.querySelectorAll('div').length <= n) { // if the image quantity is less than the required display number, only display 1
            const imageElement = imageSliderRef.current.querySelectorAll('div')[imageIndex];
            if (imageElement) {
                    imageElement.style.display = 'block';
            }
            
            else {
                throw new Error('imageSliderRef.current.querySelectorAll(\'div\')[imageIndex] is undefined');
                
            }

        }

        else { // Show Multiple images per page

            const l = imageSliderRef.current.querySelectorAll('div').length;
            const extendedIndex = imageIndex + n - l ;

            console.log(`extendedIndex is now ${extendedIndex}`);
            if ( extendedIndex > 0 ) { // If it reaches and move beyond last item, then move first item to last

                for (let i =0; i < extendedIndex ; i++){
                    console.log(imageSliderRef.current.querySelector('div'));
                    let currentFirstImage = imageSliderRef.current.querySelector('div');
                    if (currentFirstImage === null) {
                        throw new Error('currentFirstImage is null');
                    }
                    imageSliderRef.current.append(currentFirstImage);
                }
    
                for (let i =n; i > 0  ; i--){
                    let currentImage = imageSliderRef.current.querySelectorAll('div')[imageIndex-i]
                    if (currentImage === undefined) {
                        throw new Error('currentImage is null');
                    }
                    currentImage.style.display='block';
                }
                
                setImageIndex(i => i - extendedIndex  ); // reset ImageIndex accordingly due to the movement of the location
            }
            
            else { // Not beyond last item, then show like normal

                for (let i = 0 ; i < n ; i ++) {
                    let currentImage = imageSliderRef.current.querySelectorAll('div')[imageIndex+i]
                    if (currentImage === undefined) {
                        throw new Error('currentImage is null');
                    }
                    currentImage.style.display='block';
                }

            }
            
            // for (let i =0; i < n ; i++){

            //     const total = imageSliderRef.current.querySelectorAll('div').length;
    
    
            //     if ( imageIndex + i === total ) {
            //         console.log(`ImageIndex + i === total`);
            //         imageSliderRef.current.querySelectorAll('div')[0].style.display='block';
    
            //     }
    
            //     else if(imageIndex + i > total) {
            //         const x=   i + imageIndex - total ;
            //         console.log(`x is ${x}`);
            //         imageSliderRef.current.querySelectorAll('div')[x].style.display='block';
            //     }
    
            //     else {
            //         console.log(`Inside loop i is ${i}`);
            //         console.log(`imageIndex + i is ${i+imageIndex}`);
            //         imageSliderRef.current.querySelectorAll('div')[imageIndex+i].style.display='block';
    
            //     }
    
            // }

        }
        


    },[imageIndex]);




    const previousClick = () => {

        if (imageSliderRef.current === null) {
            throw new Error('imageSliderRef.current is null');
        }
        const totalImage = imageSliderRef.current.querySelectorAll('div').length;

        console.log(`Inside previousClick, imageIndex is now ${imageIndex}`);
        
        if( imageIndex === 0 ){
            return setImageIndex( totalImage -1 );
        }

        setImageIndex( i => i = i - 1 );
    };

    const nextClick = () => {

        if (imageSliderRef.current === null) {
            throw new Error('imageSliderRef.current is null');
        }
        const totalImage = imageSliderRef.current.querySelectorAll('div').length;

        console.log(`Inside nextClick, imageIndex is now ${imageIndex}`);

        if( imageIndex === (totalImage - 1) ){
            return setImageIndex( 0 );
        }

        setImageIndex( i => i = i + 1 );
    };

    return (
        <div  ref={imageSliderRef} style={{position:'relative', display:'flex'}}>
            <button id='previousButton' onClick={previousClick} style={{ position:'absolute', top:'45%', left : 2, padding:0, fontWeight:'bold', width:60, height:60, textAlign:'center', backgroundColor:'#FFFDD0', borderColor:'black'}}>&lt;</button>
            <button id='nextButton' onClick={nextClick} style={{ position:'absolute', top:'45%', right : 2, padding:0, fontWeight:'bold', width:60, height:60 ,backgroundColor:'#FFFDD0', borderColor:'black'}}>&gt;</button>
            {

                
                imagesInfo.map ( image => {

                    return (
                        <div key={image.imageID} style={{width:'90%',height:'max-content', padding:10, display:'none', margin:'auto'}}>
                            <p style={{ fontSize: 50, color:'red', margin:0 }}>{image["imageName"]}</p> 
                            <Link to={`/images/${image["imageName"]}`}>
                            <img src={ image.imageURL} style={{ width: 200, 'height': 300, padding: 2}} alt={image["imageName"]}  />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    ) ;
}