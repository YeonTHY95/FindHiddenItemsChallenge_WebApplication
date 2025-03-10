import axios, { AxiosInstance } from 'axios'
import { ImageInfo } from './ImageSliderComponent';

const baseURL = '/mongobe'
const fetchImage:AxiosInstance = axios.create({
    baseURL : baseURL
});

export default async function fetchImageFunction ()  {

    const imagesJSON = await fetchImage('/getImages');

    //console.log(`imagesJSON returned from response is ${JSON.stringify(imagesJSON)}`);

    const imagesInfo:ImageInfo[] =  imagesJSON.data;

    //console.log(`imagesInfo returned from response is ${JSON.stringify(imagesInfo)}`);

    return imagesInfo;
};