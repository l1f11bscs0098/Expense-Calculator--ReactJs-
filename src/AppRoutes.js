import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {RequireAuth} from 'react-auth-kit'
import Register from './Components/Register';
import Login from './Components/Login';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import AddExpense from './Components/AddExpense';

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/forgot-password' element={<ForgotPassword/>}></Route>


            <Route path={'/'} element={
            <RequireAuth loginPath={'/login'}>
              <Header />
                <Home></Home>
              <Footer />
            </RequireAuth>
            }/>
            <Route path={'/add-expense'} element={
                <RequireAuth loginPath={'/login'}>
                  <Header />
                    <AddExpense></AddExpense>
                  <Footer />
                </RequireAuth>
            }/>

        </Routes>

    </BrowserRouter>
  )
}
