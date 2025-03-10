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
import { useNavigate } from 'react-router-dom';
import { accessContext } from './FrontEnd_Index';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
const SignUpPage = () => {
    const [signUpName, setSignUpName] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpNameErrorMessage, setSignUpNameErrorMessage] = useState('');
    const [signUpPasswordErrorMessage, setSignUpPasswordErrorMessage] = useState('');
    const accessContextValue = useContext(accessContext);
    const accessToken = accessContextValue === null || accessContextValue === void 0 ? void 0 : accessContextValue.accessToken;
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
            navigate('/userPage');
        }
    }, [accessToken]);
    const signUpAction = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        setSignUpNameErrorMessage('');
        setSignUpPasswordErrorMessage('');
        const signUpForm = document.getElementById("signUpForm");
        const formData = new FormData(signUpForm);
        console.log("Inside signUpAction");
        const signup_username = formData.get("signup_username");
        const signup_password = formData.get("signup_password");
        // axios.post("/mongobe/signup",  { // Using Rest API
        //     signup_username, signup_password
        // },
        // {
        //     headers : {
        //         "Content-Type" : "application/x-www-form-urlencoded"
        //     }
        // }).then( response => {
        //     //console.log(response );
        //     if (response.status === 201) {
        //         //toast.success('Signed up Successfully !!!', {duration: 500});
        //         console.log("Toast here");
        //         console.log("User successfully created at BackEnd, redirect to Login" );
        //         navigate("/login", {state: { isSignUpSuccess: true} });
        //     }
        // }).catch( err => {
        //     console.log(err);
        //     const errorFromResponse = err.response.data.errors ;
        //     errorFromResponse.map ( (exx: { type: string; path: string; msg: string }) => {
        //         if ( exx.type === "field") {
        //             switch (exx.path) {
        //                 case "signup_username" :
        //                     setSignUpNameErrorMessage(exx.msg);
        //                     break;
        //                 case "signup_password" :
        //                     setSignUpPasswordErrorMessage(exx.msg);
        //                     break;
        //             }
        //         }
        //     })
        // })
        //response {
        //     data {
        //         type
        //         path
        //         msg
        //     }
        // }
        const signupResponseFromGraphQL = yield axios.post("/mongobe/graphql", {
            "query": `
                mutation SignUpNewAccount($username: String, $password: String){
                    signupNewAccount(signup_username: $username, signup_password: $password){
                        status
                        response {
                            data {
                                type
                                path
                                msg
                            }
                        }
                    }
                }
            `,
            variables: { username: signup_username, password: signup_password }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        console.log(signupResponseFromGraphQL);
        const dataFromGraphQL = signupResponseFromGraphQL.data.data.signupNewAccount;
        if (dataFromGraphQL.status === 201) {
            console.log("Toast here");
            console.log("User successfully created at BackEnd, redirect to Login");
            navigate("/login", { state: { isSignUpSuccess: true } });
        }
        else {
            console.log("Inside dataFromGraphQL Failed");
            const errorFromResponse = (_a = dataFromGraphQL.response) === null || _a === void 0 ? void 0 : _a.data;
            errorFromResponse.map((detail) => {
                if (detail.type === "field") {
                    switch (detail.path) {
                        case "signup_username":
                            setSignUpNameErrorMessage(detail.msg);
                            break;
                        case "signup_password":
                            setSignUpPasswordErrorMessage(detail.msg);
                            break;
                    }
                }
            });
            if (dataFromGraphQL.errors) {
                console.log(dataFromGraphQL.errors);
            }
        }
    });
    const testAPI = (e) => {
        e.preventDefault();
        axios.get("/mongobe/").then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Toaster, null),
        React.createElement("form", { onSubmit: signUpAction, id: "signUpForm" },
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Sign Up"),
                React.createElement("div", { className: "SignUpContainer" },
                    React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "username" }, "Username :"),
                            React.createElement("input", { id: "username", type: "text", placeholder: "Please key in your user name", name: "signup_username", value: signUpName, onChange: (event) => { setSignUpName(event.target.value); }, "data-testid": "testlogin_username", required: true }),
                            signUpNameErrorMessage && React.createElement("p", { style: { color: 'red', fontSize: "30px" } }, signUpNameErrorMessage)),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "password" }, "Password :"),
                            React.createElement("input", { id: "password", type: "password", placeholder: "Password", name: "signup_password", value: signUpPassword, onChange: (event) => { setSignUpPassword(event.target.value); }, "data-testid": "testlogin_password", required: true }),
                            signUpPasswordErrorMessage && React.createElement("p", { style: { color: 'red', fontSize: "30px" } }, signUpPasswordErrorMessage))),
                    React.createElement("div", null,
                        React.createElement("button", { disabled: (signUpName && signUpPassword) ? false : true }, "Submit"))))),
        React.createElement("button", { onClick: testAPI }, "TestAPI")));
};
export default SignUpPage;
