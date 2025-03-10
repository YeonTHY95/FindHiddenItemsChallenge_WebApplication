import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { accessContext , userInfoContext} from './FrontEnd_Index';
import axiosWithCredentials from './axiosWithCredentials';

export default function DeleteAccountPage() {

    const navigate= useNavigate();
    const accessUseContext = useContext(accessContext);
    const setAccessToken = accessUseContext?.setAccessToken;
    const accessToken = accessUseContext?.setAccessToken;

    const userInfoUseContext = useContext(userInfoContext);
    const username = userInfoUseContext?.username;
    const setUserName = userInfoUseContext?.setUsername;
    const setUserAge = userInfoUseContext?.setUserAge;
    const setUserSex = userInfoUseContext?.setUserSex;
    const setUserEmail = userInfoUseContext?.setUserEmail;

    const deleteAccount = () => {
        axiosWithCredentials.post (`/mongobe/deleteAccount?username=${username}`).then ( response => {
            if(response.status === 204) {
                setAccessToken && setAccessToken(false);
                setUserName && setUserName(undefined);
                setUserAge && setUserAge(undefined);
                setUserSex && setUserSex(undefined);
                setUserEmail && setUserEmail(undefined);
                navigate('/login');
            }
        }).catch(err => console.log(err));
    };

    useEffect ( () => {
        
        if( !accessToken ) {
            navigate( '/login');
        }

    }, [accessToken]);

    return (<>
        <h2>Are you sure you want to delete the account ?</h2>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"50px"}}>
            <button onClick={()=> navigate(-1)} style={{backgroundColor:"cyan", fontWeight:"bolder", color:"black"}}>Cancel</button>
            <button onClick={deleteAccount} style={{backgroundColor:"red", fontWeight:"bolder", color:"whitesmoke"}}>Confirm</button>
        </div>
        
    </>);
}