import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Dashboard from './Pages/Dashboard'
import ContextProvider from './Context/ContextProvider'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Dashboard />
      <Footer />
       <ToastContainer position="top-right" autoClose={2000} />
    </div>

  )
}

export default App