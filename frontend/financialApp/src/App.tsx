import { Outlet } from 'react-router'
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './Context/useAuth'

function App() {
  
  //console.log(import.meta.env.VITE_REACT_APP_API_KEY);
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
