import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { FrontEnd_Index } from './FrontEnd_Index'
import * as React from 'react'
import * as ReactDOM  from 'react-dom/client'

//import {worker} from './mswBrowser'


async function enableMocking() {
  
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  //return worker.start()
}
enableMocking().then( () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <FrontEnd_Index />
    </React.StrictMode>
  )
})

