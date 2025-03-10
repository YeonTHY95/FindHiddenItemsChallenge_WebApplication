import { useLoaderData , Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import ImageSliderComponent, {ImageInfo} from "./ImageSliderComponent";
import * as React from "react";




export default function HiddenObjectsChallengePage(): React.JSX.Element {

    const imagesInfo = useLoaderData() as ImageInfo[];

    // const [ ChallengeImage , setChallengeImage ]= useState(null);

    // async function imageOnClick( name ) {
    //     console.log(`imageOnClick, Image name is ${name}`);
    
    //     const fetchChallengeImageRequest = await axios.get(`/api/images/${name}`);
    
    //     const fetchChallengeImage = fetchChallengeImageRequest.data;
    
    //     console.log(`fetchChallengeImage is ${JSON.stringify(fetchChallengeImage)}`)
        
    //     setChallengeImage(fetchChallengeImage);
    
    // }
    
    
    return (
        <>
            <h1>Hidden Objects Challenge Page</h1>
            <ImageSliderComponent imagesInfo={imagesInfo} n={2} />
            
            
        </>
    );
}