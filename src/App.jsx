import React from 'react'
import auth from './components/service/firebase'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App