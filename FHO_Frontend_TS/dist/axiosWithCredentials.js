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
const axiosWithCredentials = axios.create({
//withCredentials: true
});
export const requestInterceptor = axiosWithCredentials.interceptors.request.use(request => {
    console.log("Inside Request Interception True");
    request.withCredentials = true;
    //request.withXSRFToken = true;
    return request;
}, error => {
    console.log("Inside Request Interception Error");
    return Promise.reject(error);
});
export const responseInterceptor = axiosWithCredentials.interceptors.response.use(response => {
    console.log("Inside Response Interception True");
    return response;
}, (error) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside Response Interception Error");
    const prevRequest = error.config;
    const previousURL = error.config.url;
    console.log(`PreviousURL is ${previousURL}`);
    console.log(`error.response status is ${error.response.status}`);
    console.log(`PreviousRequest is ${prevRequest.retry}`);
    if (error.response.status === 403 && !prevRequest.retry) {
        // Request again to get accessToken
        prevRequest.retry = true;
        console.log(`Inside Response Interception Second Request`);
        const secondResponse = yield axios.get("/mongobe/refreshToken", {
            withCredentials: true
        });
        console.log(`After second Response : ${JSON.stringify(secondResponse)}`);
        if (secondResponse.status === 200) {
            console.log(`Access Token Renewed successfully from BackEnd`);
            const sendAgainPreviousRequest = yield axios.get(previousURL, {
                withCredentials: true
            });
            return sendAgainPreviousRequest;
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
}));
export default axiosWithCredentials;
