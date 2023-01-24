import React from "react"
import Header from "../header/header"
import Sidebar from "./sidebar/sidebar"
import { Outlet } from "react-router-dom"
const Withlogin=()=>{

    const usertype = localStorage.getItem("usertype")

    return(
        <>
        <Header usertype={usertype}/>
        {/* <Sidebar usertype={usertype}/> */}
        <Outlet/>
        </>
    )
}
export default Withlogin