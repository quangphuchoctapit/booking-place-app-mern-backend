import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Layout from './pages/Layout';
import axios from 'axios'
import Account from './pages/account/Account';
import ViewMyPlace from './pages/account/Places/ViewMyPlace';


axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true;
const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/places/:id' exact element={<ViewMyPlace />} />
          <Route path='/account/:subpage/:action' exact element={<Account />} />
          <Route path='/account/:subpage?' exact element={<Account />} />


          <Route path='*' exact element={<><div className="">404 not found</div></>} />


        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
