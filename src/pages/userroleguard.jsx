import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from "react-router-dom"
import Login from './login/login'

const Userrollguard = ({ usertype }) => {
    const usertypefromlocal=localStorage.getItem("usertype")
    // console.log("from roleguard",usertype)
    return (

        usertypefromlocal==usertype ? <Outlet /> : <Navigate to={`/not_found`} />
    )
}

export default Userrollguard