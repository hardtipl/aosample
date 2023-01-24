import React from "react"
import {Navigate,Outlet} from "react-router-dom"
import { useLocation } from "react-router-dom"

const Auth=()=>{
  const pathofurl=useLocation()
  const pathnameapp=pathofurl.pathname
  const authiticated=localStorage.getItem("userid")
  // console.log("Authenticcatino is called",authiticated)
    return (
  
        authiticated!=null&&authiticated!=undefined ?
        pathnameapp!="/"?<Outlet /> : 
        <Navigate to={`/login`}  />:<Navigate to={`/login`}/>
      )
}
export default Auth