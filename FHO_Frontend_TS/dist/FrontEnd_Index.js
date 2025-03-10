import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './Welcome';
import HiddenObjectsChallengePage from './HiddenObjectsChallengePage.js';
import fetchImageFunction from './fetchImage';
import FindHiddenObjects from './FindHiddenObjects';
import SliderPage from './SliderPage';
import UserPage from "./UserPage";
import SignUpPage from "./SignUpPage";
import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import InkPage from './InkPage';
import { createContext, useState } from 'react';
import * as React from 'react';
export const accessContext = createContext(null);
export const refreshContext = createContext(null);
const FrontEnd_Index = () => {
    const [accessToken, setAccessToken] = useState(false);
    const [refreshToken, setRefreshToken] = useState(false);
    const myFrontEndEntryPoint = createBrowserRouter([
        {
            path: '/',
            element: React.createElement(IndexPage, null),
            children: [
                {
                    path: "/",
                    element: React.createElement(Welcome, null),
                },
                {
                    path: "/images",
                    element: React.createElement(HiddenObjectsChallengePage, null),
                    loader: fetchImageFunction
                },
                {
                    path: "/images/:imageName",
                    element: React.createElement(FindHiddenObjects, null),
                },
                {
                    path: "/sliderPage",
                    element: React.createElement(SliderPage, null)
                },
                {
                    path: "/signup",
                    element: React.createElement(SignUpPage, null)
                },
                {
                    path: "/login",
                    element: React.createElement(LoginPage, null)
                },
                {
                    path: "/userPage",
                    element: React.createElement(UserPage, null)
                },
                {
                    path: "/inkPage",
                    element: React.createElement(InkPage, null)
                }
            ]
        }
    ]);
    return (React.createElement(refreshContext.Provider, { value: { refreshToken, setRefreshToken } },
        React.createElement(accessContext.Provider, { value: { accessToken, setAccessToken } },
            React.createElement(RouterProvider, { router: myFrontEndEntryPoint }))));
};
export { FrontEnd_Index };
