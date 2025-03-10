import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import * as React from 'react';
import { accessContext } from './FrontEnd_Index';
import axios from 'axios';
// export const accessContext = createContext<{accessToken:boolean ; setAccessToken:React.Dispatch<React.SetStateAction<boolean>>} | null >(null);
// export const refreshContext = createContext<{refreshToken:boolean; setRefreshToken:React.Dispatch<React.SetStateAction<boolean>>} | null >(null);
export default function IndexPage() {
    // const [ accessToken, setAccessToken ] = useState<boolean>(false) ;
    // const [ refreshToken, setRefreshToken ] = useState<boolean>(false) ;
    const accessUseContext = useContext(accessContext);
    const accessToken = accessUseContext === null || accessUseContext === void 0 ? void 0 : accessUseContext.accessToken;
    const setAccessToken = accessUseContext === null || accessUseContext === void 0 ? void 0 : accessUseContext.setAccessToken;
    const navigate = useNavigate();
    const logOut = () => {
        axios.post("/mongobe/logout").then(response => {
            if (response.status === 204) {
                setAccessToken && setAccessToken(false);
                navigate('/login');
            }
        }).catch(err => console.log(err));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", null,
            React.createElement("div", { className: "navContainer", style: { display: 'flex', justifyContent: 'start', gap: "10px" } },
                React.createElement(Link, { to: '/' }, "Home"),
                !accessToken && (React.createElement(Link, { to: '/signup' }, "Sign Up")),
                !accessToken && (React.createElement(Link, { to: '/login' }, "Log In")),
                accessToken && (React.createElement(Link, { to: '/userPage' }, "UserPage")),
                accessToken && (React.createElement(NavLink, { to: "/inkPage" }, "Ink Page")),
                accessToken && (React.createElement("button", { onClick: logOut, style: { borderRadius: '30%', fontSize: '15px' } }, "Log Out")))),
        React.createElement(Outlet, null)));
}
