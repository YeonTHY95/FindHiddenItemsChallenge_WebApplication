import { useLoaderData } from "react-router-dom";
import ImageSliderComponent from "./ImageSliderComponent";
import * as React from "react";
export default function HiddenObjectsChallengePage() {
    const imagesInfo = useLoaderData();
    // const [ ChallengeImage , setChallengeImage ]= useState(null);
    // async function imageOnClick( name ) {
    //     console.log(`imageOnClick, Image name is ${name}`);
    //     const fetchChallengeImageRequest = await axios.get(`/api/images/${name}`);
    //     const fetchChallengeImage = fetchChallengeImageRequest.data;
    //     console.log(`fetchChallengeImage is ${JSON.stringify(fetchChallengeImage)}`)
    //     setChallengeImage(fetchChallengeImage);
    // }
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Hidden Objects Challenge Page"),
        React.createElement(ImageSliderComponent, { imagesInfo: imagesInfo, n: 3 })));
}
