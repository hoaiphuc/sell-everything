import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
// import {role} from './LoginPage';

const ProtectedRoutes = ({children}) => {
    const { user } = UserAuth()
    const isAuthenticated = localStorage.getItem('user')? true: false

    if (!isAuthenticated) {
        return <Navigate to='/Signin' />
    } 
    console.log(user);
    return children
}

export default ProtectedRoutes
