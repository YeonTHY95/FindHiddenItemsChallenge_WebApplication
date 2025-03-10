import { useContext, useEffect } from 'react';
//import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { accessContext } from './FrontEnd_Index';
import "../public/inkAnimation.css";
import * as React from 'react';
const InkPage = () => {
    const navigate = useNavigate();
    const locationHook = useLocation();
    const accessUseContext = useContext(accessContext);
    const accessToken = accessUseContext === null || accessUseContext === void 0 ? void 0 : accessUseContext.accessToken;
    useEffect(() => {
        if (!accessToken) {
            navigate('/login', { state: locationHook.pathname, replace: true });
        }
    }, [accessToken]);
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "bigTitle" },
            React.createElement("h1", null, "Test the Ink Animation"))));
};
export default InkPage;
