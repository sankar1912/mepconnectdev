import React from 'react'
import { useSelector } from 'react-redux'
import { getAuth } from '../../redux/slice/AuthSlice'
import { useNavigate } from 'react-router-dom';

function AdminRoute({children}) {
    const navigate =useNavigate()
    const {auth} =useSelector(getAuth);
    if(!auth){
        navigate('/login')
    }
    if(!auth.isLoading && !auth.user.role!=="admin"){
        navigate("/");
    }
    if(auth.isLoading){
        return (<div>Loading</div>)
    }
  return children
}

export default AdminRoute