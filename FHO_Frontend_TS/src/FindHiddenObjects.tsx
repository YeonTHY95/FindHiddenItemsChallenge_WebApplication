//import { useLoaderData } from "react-router-dom";
import { useParams,Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import ChallengeImageModule from "./ChallengeImageModule";

import * as React from "react";
import { ImageInfo } from "./ImageSliderComponent";

import Lottie,{LottieRefCurrentProps} from 'lottie-react';
import BackArrowAnimationIcon from '../public/BackArrowAnimationIcon.json';

export default function FindHiddenObjects () {

    const {imageName} = useParams<{imageName:string}>() ; // useParams<'imageName'>() ;

    const [ challengeImage, setChallengeImage] = useState<ImageInfo | null>(null);

    const navigate = useNavigate() ;

    const backArrowRef = useRef<LottieRefCurrentProps>(null);

    
    useEffect( ()=> {

        async function fetchData () {

            // This obtains from PostgreSQL
            const fetchChallengeImageRequestfromPostgreSQL = await axios.get(`/api/images/${imageName}`);
            const fetchChallengeImageRequestfromMongoDB = await axios.get(`/mongobe/getImage/${imageName}`);
    
            const fetchChallengeImage = fetchChallengeImageRequestfromMongoDB.data[0];

            const graphQLQuery = `
                query QueryImageInfo($imageName: String!){
                    imageinfo(imageName: $imageName) {
                        imageID
                        imageName
                        HiddenObjectPixelLocation {
                            item
                            itemLocation {
                                x
                                y
                            }
                        }
                        imageURL
                    }
                }
            `;

            const fetchChallengeImageRequestfromGraphQL = await axios.post('/mongobe/graphql', {
                    query: graphQLQuery, variables: {imageName}
                }, {
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept": "application/json",
                    }
                }
            );

            const fetchChallengeImageRequestfromGraphQLData= fetchChallengeImageRequestfromGraphQL.data;
            console.log(fetchChallengeImageRequestfromGraphQLData.data);
            console.log(typeof fetchChallengeImageRequestfromGraphQLData);

            const hiddenInArray = fetchChallengeImageRequestfromGraphQLData.data.imageinfo.HiddenObjectPixelLocation;

            const converted: Record<string, { x:number, y:number}[]> = {};
            hiddenInArray.forEach((identifiedItem: { item: string; itemLocation: { x: number; y: number }[] }) => {

                const convertedToNumberLocation = identifiedItem.itemLocation.map( item => {
                    return { x :Number(item.x), y : Number(item.y)} ;
                })

                converted[identifiedItem.item] = convertedToNumberLocation ;
            })
            console.log(JSON.stringify(converted));
            console.log("Before fromgraphQL");

            const imageNameFromGraphQL = fetchChallengeImageRequestfromGraphQL.data.data.imageinfo.imageName; 
            const imageIDFromGraphQL = fetchChallengeImageRequestfromGraphQL.data.data.imageinfo.imageID; 
            const imageURLFromGraphQL = fetchChallengeImageRequestfromGraphQL.data.data.imageinfo.imageURL; 

            const imageInfoFromGraphQL : ImageInfo = {
                imageID : imageIDFromGraphQL,
                imageName : imageNameFromGraphQL,
                HiddenObjectPixelLocation : converted,
                imageURL : imageURLFromGraphQL,
            }
            console.log("CCB");
            console.log(`fetchChallengeImage from PostgreSQL is ${JSON.stringify(fetchChallengeImageRequestfromPostgreSQL.data)}`);
            //console.log(`Type : ${typeof fetchChallengeImageRequestfromPostgreSQL.data}`);
            console.log(`fetchChallengeImage from MongoDB is ${JSON.stringify(fetchChallengeImageRequestfromMongoDB.data[0])}`);
            //console.log(`Type : ${typeof fetchChallengeImageRequestfromMongoDB.data}`);
            //console.log(typeof fetchChallengeImage);
            console.log("After data");

            // GraphQL API
            //console.log(`fetchChallengeImage from GraphQL is ${JSON.stringify(fetchChallengeImageRequestfromGraphQL.data)}`);
            console.log(`imageInfoFromGraphQL is ${JSON.stringify(imageInfoFromGraphQL)}`);
            
            
            //setChallengeImage(fetchChallengeImage);
            setChallengeImage(imageInfoFromGraphQL);
        }
        
        fetchData();

    },[]);


//
    return ( 

            <div className='challengeImageContainer' style={{
                display:"grid",
                gridAutoRows:"auto",
                gridTemplateColumns: "repeat(7, 1fr)"
            }}>
                <div style={{ gridRow:"1 / 2", gridColumn:"3 / 4 " , justifySelf:"center", alignSelf:"center" }}>
                    <div onClick ={ ()=> navigate(-1)} onMouseEnter={ ()=> { backArrowRef.current?.goToAndPlay(0,true) }} onMouseLeave={ ()=> {backArrowRef.current?.goToAndStop(0,true)} } style={{ display:"flex", justifyContent:"center", alignItems:"center"}}> 
                        <Lottie lottieRef={backArrowRef} animationData={BackArrowAnimationIcon} loop={true} autoplay={false} style={{ width:"50px", height:"50px"}} />
                    </div>
                    
                </div>
                <div style={{ gridRow:"1 / 2", gridColumn:"3 / 6 "  }}>
                    <h1>{challengeImage && challengeImage.imageName}</h1>
                </div>
                <div style={{ gridRow:"2 / 3", gridColumn:"4 / 5 "  }}>
                    {challengeImage && <ChallengeImageModule imageInfo = {challengeImage} /> }
                </div>
                
                
            </div>);
};