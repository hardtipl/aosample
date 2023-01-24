import React from "react";
import "./sidebar.css"
import { Link } from "react-router-dom";

const Sidebar =({usertype})=>{
return(
    <>
{usertype=="Sales" &&
<div class="sidebar">
   {/* <h1>Brand</h1> */}
   <Link to="/sales_dash" style={{marginTop:"50px"}}> <li> Dashboard</li></Link>
   <Link to="/inquiry_list"> <li> Inquiries</li></Link>
   <Link to="/project_list"> <li> Projects</li></Link>
   <Link to="/lead_list"> <li> Leads</li></Link>
   
  
</div>}
{usertype=="Developer"&&
<div class="sidebar">
   {/* <h1>Brand</h1> */}
   <Link to="/devdash" style={{marginTop:"50px"}}> <li> Dashboard</li></Link>
   <Link to="/dev_task"> <li> Tasks</li></Link>
   
   
  
</div>}
{usertype=="Admin"&&
<div class="sidebar">
   {/* <h1>Brand</h1> */}
   <Link to="/admind" style={{marginTop:"50px"}}> <li> Dashboard</li></Link>
   <Link to="/inquiry_list"> <li> Inquiries</li></Link>
   <Link to="/project_list"> <li> Projects</li></Link>
   <Link to="/lead_list"> <li> Leads</li></Link>
   
  
</div>}
    </>
)
}
export default Sidebar