import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      
      if(localStorage.getItem('name')===null) {
        navigate('/bestUser/Login');
      }
        localStorage.clear();
        navigate('/bestUser/Login');
    })

  return (
    <div>AdminLogout</div>
  )
}

export default AdminLogout