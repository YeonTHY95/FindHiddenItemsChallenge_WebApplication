import React,{useState, useRef, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom' ;
import { userInfoContext , accessContext} from './FrontEnd_Index';
import axios, { AxiosError } from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import axiosWithCredentials from './axiosWithCredentials';

export default function UserInformationEditPage () {

    const accessContextValue = useContext(accessContext);
    const accessToken = accessContextValue?.accessToken;
    const navigate = useNavigate();
    const locationHook = useLocation();

    const userInfoUseContext = useContext(userInfoContext) ;
    const username = userInfoUseContext?.username;
    const setUserName = userInfoUseContext?.setUsername;
    const userAge = userInfoUseContext?.userAge;
    const setUserAge = userInfoUseContext?.setUserAge;
    const userSex = userInfoUseContext?.userSex;
    const setUserSex = userInfoUseContext?.setUserSex;
    const userEmail = userInfoUseContext?.userEmail;
    const setUserEmail = userInfoUseContext?.setUserEmail;

    const [signUpNameErrorMessage, setSignUpNameErrorMessage] = useState<string>("");
    const [ toBeUsername, setToBeUsername] = useState<string | undefined>(username);
    const [ toBeSex, setToBeSex] = useState<"Male" | "Female" | undefined>(undefined);
    const [toBeAge, setToBeAge] = useState<number | undefined>(undefined);
    const [ toBeEmail, setToBeEmail] = useState<string | undefined>(undefined);
    
    const editUserInfoForm = useRef<HTMLFormElement>(null) ;


    useEffect ( () => {
        
        setToBeUsername && setToBeUsername(username);
        setToBeSex && setToBeSex(userSex);
        setToBeAge && setToBeAge(userAge);
        setToBeEmail && setToBeEmail(userEmail);
    
    }, []);

    const editUserInfoFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSignUpNameErrorMessage('');

        console.log("Inside editUserInfoFormSubmit") ;

        const editUserInfoFormData =  document.getElementById("editUserInfoFormID") as HTMLFormElement ;
        
        const formData = new FormData(editUserInfoFormData) ;
        const formUsername = formData.get("formUsername");
        const formAge = formData.get("age");
        const formSex = formData.get("sex");
        const formEmail = formData.get("email");


        try {
            const updatedUserInfoResponse = await axiosWithCredentials.patch(`/mongobe/updateUserInfo`, {
                username,
                toBeUsername : formUsername,
                toBeAge : formAge ? formAge : undefined,
                toBeSex : formSex ? formSex : undefined ,
                toBeEmail : formEmail ? formEmail : undefined
            });
    
            if (updatedUserInfoResponse.status === 200) {
                
                console.log("User Information updated Successfully !!!");
                console.log(`updatedUserInfoResponse is ${JSON.stringify(updatedUserInfoResponse)}`);

                setUserName && setUserName(updatedUserInfoResponse.data.name);
                setUserAge && setUserAge(updatedUserInfoResponse.data.age);
                setUserSex && setUserSex(updatedUserInfoResponse.data.sex);
                setUserEmail && setUserEmail(updatedUserInfoResponse.data.email);
                toast.success('User Information updated Successfully !!!', {duration: 3000});
            }
            else {
                console.log("Status Code from updatedUserInfoResponse.status is ", updatedUserInfoResponse.status);
            }
        }

        catch(error) {
            
            if (axios.isAxiosError(error)) {
                console.log(error.status)
                console.error(error.response);
                const errorFromResponse = error.response?.data.errors;

                console.log("Inside isAxiorError Catch Block of User Edit") ;
                console.log(JSON.stringify(errorFromResponse)) ;

                errorFromResponse.map ( (detail: { type: string; path: string; msg: string }) => {
                    if ( detail.type === "field") {

                        switch (detail.path) {

                            case "toBeUsername" :
                                setSignUpNameErrorMessage(detail.msg);
                                break;
                            
                        }
                        
                    }
                });
                
            } 
            else {
                console.error(error);
            }

            editUserInfoForm.current?.classList.add("formerror");
        }
        

    };

    return ( <>
        <Toaster />
        { signUpNameErrorMessage && <p style={{ color:'red', fontSize:"30px"}}>{signUpNameErrorMessage}</p> }
        <form ref={editUserInfoForm} onSubmit={editUserInfoFormSubmit} id="editUserInfoFormID" style={{ height:"50%", width:"50%"}}>
            <fieldset>
                <legend><h2>Edit User Information</h2></legend>
                <div style={{display:"grid", gridTemplateAreas:" 'usernamelabel usernameinput' 'agelabel ageinput' 'sexlabel sexinput' 'emaillabel emailinput' ", gap:"10px"}}>
                    <label htmlFor="username" style={{gridArea:'usernamelabel', justifySelf:"end", alignSelf:"center"}}>
                        Username : 
                    </label>
                    <input style={{gridArea:'usernameinput', justifySelf:"start", alignSelf:"center"}} id="username" type="text" placeholder="Please key in your user name" name="formUsername" value={ toBeUsername } onChange = {(event) => { setToBeUsername && setToBeUsername(event.target.value) ; editUserInfoForm.current?.classList.remove("formerror");}} required />
                    
                    <label htmlFor="age" style={{gridArea:'agelabel', justifySelf:"end", alignSelf:"center"}}>
                        Age : 
                    </label>
                    <input style={{gridArea:'ageinput', justifySelf:"start", alignSelf:"center"}} id="age" type="number" placeholder="Age" name="age" value={ toBeAge && toBeAge } onChange = {(event) => { setToBeAge && setToBeAge(Number(event.target.value)) ;  editUserInfoForm.current?.classList.remove("formerror");}}  />
                    
                    <label style={{gridArea:'sexlabel', justifySelf:"end", alignSelf:"center"}}>Sex : </label>
                    <div style={{gridArea:'sexinput', justifySelf:"start", alignSelf:"center"}}>
                        <label htmlFor="male" >
                            <input id="male" type="radio" name="sex" value="Male" defaultChecked= { toBeSex && toBeSex === "Male"} checked={ toBeSex === "Male" } onChange={ (e) => {setToBeSex && setToBeSex("Male");  editUserInfoForm.current?.classList.remove("formerror");}}/>
                            Male
                        </label>
                        <label htmlFor="female" >
                            <input id="female" type="radio" name="sex" value="Female" defaultChecked= { toBeSex && toBeSex === "Female"} checked={ toBeSex === "Female" } onChange={ (e) => {setToBeSex && setToBeSex("Female");  editUserInfoForm.current?.classList.remove("formerror");}}/>
                            Female 
                        </label>
                    </div>
                
                    <label htmlFor="email" style={{gridArea:'emaillabel', justifySelf:"end", alignSelf:"center"}}>
                        Email : 
                    </label>
                    <input style={{gridArea:'emailinput', justifySelf:"start", alignSelf:"center"}} id="email" type="text" placeholder="Email" name="email" value={ toBeEmail && toBeEmail } onChange = {(event) => { setToBeEmail && setToBeEmail(event.target.value) ;  editUserInfoForm.current?.classList.remove("formerror");}}  />
                                        
                </div>
                <div>
                    <button style={{ margin:"10px"}} disabled={ (toBeUsername || toBeAge || toBeSex || toBeEmail ) ? false : true }>Submit</button>
                </div>
            </fieldset>
        </form>
    </>)
}