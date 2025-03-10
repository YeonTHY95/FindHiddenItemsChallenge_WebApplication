import { useState, useContext, useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { accessContext, userInfoContext } from './FrontEnd_Index';
import * as React from 'react';

import toast, {Toaster} from 'react-hot-toast';

const SignUpPage = () => {

    const [ signUpName, setSignUpName] = useState<string>("") ;
    const [ signUpPassword, setSignUpPassword] = useState<string>("") ;

    const [ signUpNameErrorMessage , setSignUpNameErrorMessage] = useState('') ;
    const [ signUpPasswordErrorMessage, setSignUpPasswordErrorMessage] = useState('') ;

    const accessContextValue = useContext(accessContext);
    const accessToken = accessContextValue?.accessToken;

    const userInfoUseContext = useContext(userInfoContext);
    const setUserName = userInfoUseContext?.setUsername;

    const signupForm = useRef<HTMLFormElement>(null);

    const navigate = useNavigate();

    useEffect ( () => {

        if( accessToken) {
            navigate( '/userPage');
        }

    }, [accessToken]);

    const signUpAction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSignUpNameErrorMessage('');
        setSignUpPasswordErrorMessage('');

        const signUpForm = document.getElementById("signUpForm") as HTMLFormElement;
        const formData = new FormData(signUpForm) ;

        //console.log("Inside signUpAction");
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

        const signupResponseFromGraphQL = await axios.post("/mongobe/graphql",  { 
            "query" : `
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
            variables: { username: signup_username, password : signup_password }
            
        }, {
            headers: {
                "Content-Type" : "application/json",
                "Accept": "application/json"
            }
        });

        //console.log(signupResponseFromGraphQL) ;

        const dataFromGraphQL = signupResponseFromGraphQL.data.data.signupNewAccount;

        if (dataFromGraphQL.status === 201) {
            // console.log("Toast here");
            // console.log("User successfully created at BackEnd, redirect to Login" );
            
            
            navigate("/login", {state: { isSignUpSuccess: true} });
        }
        else {
            console.log("Inside dataFromGraphQL Failed");

            signupForm.current?.classList.add("formerror");

            const errorFromResponse = dataFromGraphQL.response?.data ;

            errorFromResponse.map ( (detail: { type: string; path: string; msg: string }) => {
                if ( detail.type === "field") {

                    switch (detail.path) {

                        case "signup_username" :
                            setSignUpNameErrorMessage(detail.msg);
                            break;
                        case "signup_password" :
                            setSignUpPasswordErrorMessage(detail.msg);
                            break;
                    }
                    
                }
            })

            if (dataFromGraphQL.errors) {
                console.log(dataFromGraphQL.errors);
            }
        }
        
        

    };

    const testAPI = ( e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.get("/mongobe/").then( response => {
            console.log(response);
        }).catch( err => {
            console.log(err);
        })
    };

    return ( <>
       
        <Toaster />
        
        <form onSubmit={signUpAction} id="signUpForm" ref={signupForm} style={{ height:"50%", width:"50%"}}>
            <fieldset style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
                <legend><h2>Sign Up</h2></legend>
                <div className="SignUpContainer" >
                    <div >
                        <div>
                            <label htmlFor="username">
                                Username : 
                            </label>
                            <input id="username" type="text" placeholder="Please key in your user name" name="signup_username" value={ signUpName } onChange = {(event) => { setSignUpName(event.target.value) ; signupForm.current?.classList.remove("formerror");}} data-testid="testlogin_username" required />
                            { signUpNameErrorMessage && <p style={{ color:'red', fontSize:"30px"}}>{signUpNameErrorMessage}</p> }
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password : 
                            </label>
                            <input id="password" type="password" placeholder="Password" name="signup_password" value={ signUpPassword } onChange = {(event) => { setSignUpPassword(event.target.value) ;  signupForm.current?.classList.remove("formerror");}} data-testid="testlogin_password" required />
                            { signUpPasswordErrorMessage && <p style={{ color:'red', fontSize:"30px"}}>{signUpPasswordErrorMessage}</p> }
                        </div>                       
                        <div>
                            <button style={{ margin:"10px"}} disabled={ (signUpName && signUpPassword ) ? false : true }>Submit</button>
                        </div>
                    </div>
                    
                </div>
                
            </fieldset>
        </form>

        {/* <button onClick={testAPI}>TestAPI</button> */}

    </>)

} 

export default SignUpPage;