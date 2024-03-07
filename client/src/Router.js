import React, { useContext } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navbar from './Components/Layout/Navbar';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Dashboard';
import AuthContext from './context/AuthContext';


function Router() {

    const {loggedIn} = useContext(AuthContext);

    return (
    <BrowserRouter>
        <Navbar />
        <Routes>

        {
          loggedIn === false && (
            <>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/dashboard" element={<Navigate to="/signin" />} />
            </>
        )}
        {
            loggedIn === true && (
                <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                </>
            )
        }

        </Routes>
    </BrowserRouter>
    )

};

export default Router;
