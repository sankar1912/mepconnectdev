
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function WebhookRoute({children}) {
    const {auth,isLoading}  = useSelector((state)=> state.auth);
    if(isLoading){
        return <div>Loading...</div>
    }  
    if(!auth && !isLoading){
        return <Navigate to="/login" />
    }
    if(!sessionStorage.getItem('checkoutDetails')){
        return <Navigate to="/" />
    }
     
  return children
}

export default WebhookRoute