var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './index.css';
//import App from './App.jsx'
import { FrontEnd_Index } from './FrontEnd_Index';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
//import {worker} from './mswBrowser'
function enableMocking() {
    return __awaiter(this, void 0, void 0, function* () {
        // `worker.start()` returns a Promise that resolves
        // once the Service Worker is up and ready to intercept requests.
        //return worker.start()
    });
}
enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null,
        React.createElement(FrontEnd_Index, null)));
});
