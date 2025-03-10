var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { useLoaderData } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import ChallengeImageModule from "./ChallengeImageModule";
import * as React from "react";
export default function FindHiddenObjects() {
    const { imageName } = useParams(); // useParams<'imageName'>() ;
    const [challengeImage, setChallengeImage] = useState(null);
    useEffect(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                // This obtains from PostgreSQL
                const fetchChallengeImageRequestfromPostgreSQL = yield axios.get(`/api/images/${imageName}`);
                const fetchChallengeImageRequestfromMongoDB = yield axios.get(`/mongobe/getImage/${imageName}`);
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
                const fetchChallengeImageRequestfromGraphQL = yield axios.post('/mongobe/graphql', {
                    query: graphQLQuery, variables: { imageName }
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                });
                const fetchChallengeImageRequestfromGraphQLData = fetchChallengeImageRequestfromGraphQL.data;
                console.log(fetchChallengeImageRequestfromGraphQLData.data);
                console.log(typeof fetchChallengeImageRequestfromGraphQLData);
                const hiddenInArray = fetchChallengeImageRequestfromGraphQLData.data.imageinfo.HiddenObjectPixelLocation;
                const converted = {};
                hiddenInArray.forEach((identifiedItem) => {
                    const convertedToNumberLocation = identifiedItem.itemLocation.map(item => {
                        return { x: Number(item.x), y: Number(item.y) };
                    });
                    converted[identifiedItem.item] = convertedToNumberLocation;
                });
                console.log(JSON.stringify(converted));
                console.log("Before fromgraphQL");
                const imageNameFromGraphQL = fetchChallengeImageRequestfromGraphQL.data.data.imageinfo.imageName;
                const imageIDFromGraphQL = fetchChallengeImageRequestfromGraphQL.data.data.imageinfo.imageID;
                const imageURLFromGraphQL = fetchChallengeImageRequestfromGraphQL.data.data.imageinfo.imageURL;
                const imageInfoFromGraphQL = {
                    imageID: imageIDFromGraphQL,
                    imageName: imageNameFromGraphQL,
                    HiddenObjectPixelLocation: converted,
                    imageURL: imageURLFromGraphQL,
                };
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
            });
        }
        fetchData();
    }, []);
    return (React.createElement("div", { className: 'challengeImageContainer' },
        React.createElement("div", { className: "backLink" },
            React.createElement(Link, { to: '/images' }, "Back")),
        React.createElement("div", null,
            React.createElement("h1", null, challengeImage && challengeImage.imageName),
            challengeImage && React.createElement(ChallengeImageModule, { imageInfo: challengeImage }))));
}
;
