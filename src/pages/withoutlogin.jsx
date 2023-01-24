import React from "react";
import Header from "../header/header";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Withoutlogin=()=>{

const navigate = useNavigate()

    useEffect(()=>{
        
        if(localStorage.getItem("usertype")=="Sales"){
            navigate("/sales_dash")
        }
        else if(localStorage.getItem("usertype")=="Admin"){
            navigate("/admind")
        }
    },[])
    return(
        <>
        {/* <Header/>
        <Sidebar/> */}
        <Outlet/>
        </>
    )
}
export default Withoutlogin