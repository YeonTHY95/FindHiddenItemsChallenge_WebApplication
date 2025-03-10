import {useState , useContext, useEffect, useRef} from 'react';
import axios, {AxiosError} from 'axios' ;
import { useNavigate, useLocation } from 'react-router-dom';
import {refreshContext, accessContext,userInfoContext } from './FrontEnd_Index';
import * as React from 'react';

import toast, {Toaster} from 'react-hot-toast';


const LoginPage = () => {

    //const {refreshToken, setrefreshToken} = useContext(refreshContext); 
    const  accessUseContext = useContext(accessContext);
    const accessToken = accessUseContext?.accessToken;
    const setAccessToken = accessUseContext?.setAccessToken;

    const userInfoUseContext = useContext(userInfoContext) ;
    const setUserName = userInfoUseContext?.setUsername;

    const [ LoginName, setLoginName] = useState<string>('') ;
    const [ LoginPassword, setLoginPassword] = useState<string>('') ;
    const [ invalidMessage, setInvalidMessage] = useState<string | null>(null) ;

    const navigate = useNavigate();
    const locationHook = useLocation(); 

    const loginFormRef = useRef<HTMLFormElement>(null);


    useEffect ( () => {

        if( accessToken) {
            navigate( '/SplashScreen');
        }

    }, [accessToken]);

    useEffect ( () => {

        try {
            //console.log("Inside useEffect LoginPage, Location state is now ", locationHook.state) ;
            if (locationHook.state.isSignUpSuccess) {
                toast.success('Signed up Successfully !!!', {duration: 1000});
            } ;
        }

        catch (err) {
            console.log(err);
        }
        
        

    }, [locationHook]);

    const loginAction = async ( event: React.FormEvent<HTMLFormElement> ) => {

        event.preventDefault();

        const loginForm = document.getElementById("loginForm") as HTMLFormElement;
        const formData = new FormData(loginForm);
        
        const login_username = formData.get("login_username") ;
        const login_password = formData.get("login_password") ;

        try {

            const responseFromBE = await axios.post("/mongobe/login", 
                {
                    login_username, login_password
                },
                {
                    headers: { "Content-Type" : "application/x-www-form-urlencoded"},
                    //withCredentials: true
                }
            )

            console.log(`Login Response from BackEnd is ${JSON.stringify(responseFromBE)}`) ;
            if (responseFromBE.status === 200) {
                setAccessToken && setAccessToken(true);
                setUserName && setUserName(LoginName) ;
                navigate( locationHook.state || '/SplashScreen') ;

            }

        }

        catch(err) {
            console.log(err) ;
            //console.log("Inside Login Failure Response")

            loginFormRef.current?.classList.add("formerror");

            if (axios.isAxiosError(err)) {
                setInvalidMessage(err.response?.data);
            }
            
            //throw err;
        }

    }

    return ( <>

        <Toaster />

        <form onSubmit={loginAction}  id="loginForm" ref={loginFormRef} style={{ height:"50%", width:"50%"}}>
            <fieldset >
                <legend><h2>Login</h2></legend>
                {
                    invalidMessage && <h3 style={{color: 'red'}}>{invalidMessage}</h3>
                }
                <div className="LoginContainer">
                    <div>
                        <div>
                            <label htmlFor="username">
                                Username :
                            </label>
                            <input id="username" type="text" placeholder="Please key in your user name" name="login_username" value= {LoginName} onChange = { event => {setLoginName(event.target.value ) ; loginFormRef.current?.classList.remove("formerror"); }}  />
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password :
                            </label>
                            <input id="password" type="password" placeholder="Password" name="login_password" value= {LoginPassword} onChange = { event => {setLoginPassword(event.target.value ); loginFormRef.current?.classList.remove("formerror");}} />    
                        </div>
                        
                        </div>
                    <div>
                        <button style={{ margin:"10px"}} disabled={(LoginName && LoginPassword) ? false : true }>Submit</button>
                    </div>
                </div>
                
            </fieldset>
        </form>

    </>)

} 

export default LoginPage;