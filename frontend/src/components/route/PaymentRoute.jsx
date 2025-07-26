import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../redux/slice/AuthSlice';

function PaymentRoute({children}) {
    const {auth}  = useSelector(getAuth);
    const {isLoggedIn} = auth;
    console.log(auth)
    if(!isLoggedIn){
        return <Navigate to="/login" />
    }
  return children
}

export default PaymentRoute