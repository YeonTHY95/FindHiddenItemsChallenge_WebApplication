var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const baseURL = '/api';
const fetchImage = axios.create({
    baseURL: baseURL
});
export default function fetchImageFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        const imagesJSON = yield fetchImage('/images');
        //console.log(`imagesJSON returned from response is ${JSON.stringify(imagesJSON)}`);
        const imagesInfo = imagesJSON.data;
        //console.log(`imagesInfo returned from response is ${JSON.stringify(imagesInfo)}`);
        return imagesInfo;
    });
}
;
