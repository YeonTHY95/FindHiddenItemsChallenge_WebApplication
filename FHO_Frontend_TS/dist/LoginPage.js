var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { accessContext } from './FrontEnd_Index';
import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
const LoginPage = () => {
    //const {refreshToken, setrefreshToken} = useContext(refreshContext); 
    const accessUseContext = useContext(accessContext);
    const accessToken = accessUseContext === null || accessUseContext === void 0 ? void 0 : accessUseContext.accessToken;
    const setAccessToken = accessUseContext === null || accessUseContext === void 0 ? void 0 : accessUseContext.setAccessToken;
    const [LoginName, setLoginName] = useState('');
    const [LoginPassword, setLoginPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState(null);
    const navigate = useNavigate();
    const locationHook = useLocation();
    useEffect(() => {
        if (accessToken) {
            navigate('/userPage');
        }
    }, [accessToken]);
    useEffect(() => {
        try {
            console.log("Inside useEffect LoginPage, Location state is now ", locationHook.state);
            if (locationHook.state.isSignUpSuccess) {
                toast.success('Signed up Successfully !!!', { duration: 1000 });
            }
            ;
        }
        catch (err) {
            console.log(err);
        }
    }, [locationHook]);
    const loginAction = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        const loginForm = document.getElementById("loginForm");
        const formData = new FormData(loginForm);
        const login_username = formData.get("login_username");
        const login_password = formData.get("login_password");
        try {
            const responseFromBE = yield axios.post("/mongobe/login", {
                login_username, login_password
            }, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                //withCredentials: true
            });
            console.log(`Login Response from BackEnd is ${JSON.stringify(responseFromBE)}`);
            if (responseFromBE.status === 200) {
                setAccessToken && setAccessToken(true);
                navigate(locationHook.state || '/userPage');
            }
            // Cookies Http Only
            // if(responseFromBE.cookies.accessCookie && responseFromBE.cookies.refreshCookie ) {
            //     setrefreshToken(responseFromBE.cookies.refreshCookie) ;
            //     setAccessToken(responseFromBE.cookies.accessCookie) ;
            //     console.log("Stored both accessToken and refreshToken") ;
            //     console.log("Location state is now ", locationHook.state) ;
            //     navigate( locationHook.state || '/userPage') ;
            // }
            // else {
            //     throw error ("No valid cookie from login");
            // }
        }
        catch (err) {
            console.log(err);
            if (axios.isAxiosError(err)) {
                setInvalidMessage((_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            }
            throw err;
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(Toaster, null),
        React.createElement("form", { onSubmit: loginAction, id: "loginForm" },
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Login"),
                invalidMessage && React.createElement("h3", { style: { color: 'red' } }, invalidMessage),
                React.createElement("div", { className: "LoginContainer" },
                    React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "username" }, "Username :"),
                            React.createElement("input", { id: "username", type: "text", placeholder: "Please key in your user name", name: "login_username", value: LoginName, onChange: event => setLoginName(event.target.value) })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "password" }, "Password :"),
                            React.createElement("input", { id: "password", type: "password", placeholder: "Password", name: "login_password", value: LoginPassword, onChange: event => setLoginPassword(event.target.value) }))),
                    React.createElement("div", null,
                        React.createElement("button", { disabled: (LoginName && LoginPassword) ? false : true }, "Submit")))))));
};
export default LoginPage;
