import React from 'react'
import { getAuth } from '../../features/users/AuthSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const {auth}  = useSelector(getAuth);
    const {isLoggedIn} = auth;
    if(!isLoggedIn){
        return <Navigate to="/login" />
    }

  return children
}

export default ProtectedRoute