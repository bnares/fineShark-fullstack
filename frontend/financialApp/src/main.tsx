import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { searchCompanis } from './api.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'


//console.log(await searchCompanis("tsla"));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
