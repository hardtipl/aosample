import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./sales_dash.css"

// import "./sales_dash.css"
import Header from "../../header/header";
import Sidebar from "../sidebar/sidebar";

const SalesDash =()=>{

  const [data,setData] = useState()

  const dash = async () => {
    // alert(Leadid)
    const result = await fetch(
      `${process.env.REACT_APP_APIURL}/dashboard/`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
    );

    const response = await result.json()
    const res = response.Message
    setData(res)
    
  };

  useEffect(()=>{
    dash()
  },[])


return(
    <>
    <Sidebar IsSales={true}/>
<div>
  <input type="radio" name="detailsdisplay" value={"monthly"} />
<label for="html">Monthly</label><br></br>
<input type="radio" name="detailsdisplay" value={"yearly"} checked/>
<label for="html">Yearly</label><br></br>
</div>
    <div className='set'>
    <div className="row m-3">
        <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-primary">
            <h3 className="text text-center ">Inquiries</h3>
            </div>
            <div className="card-body cardi">
              <table className="table text-black table-striped">
                <thead className="text-center">
                  <tr>
                    <th scope="col ">Status</th>
                    <th scope="col">Total</th>
                    
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data?.inquiry?.map((e)=>{
                    // console.log("data",data)
                    return(

                    
                  <tr>
                    <td>{e.eStatus}</td>
                    <td>{e.No_of_inquiriesstatus}</td>
                  </tr>
                  )
                })}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-secondary">
          <h3 className="text text-center">Projects</h3>
            </div>
            <div className="card-body cardi">
            <table class="table table-striped ">
                <thead className="text-black text-center">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    
                  </tr>
                </thead>
                <tbody className="text-black text-center">

                {data?.projects?.map((e)=>{
                    // console.log("data",data)
                    return(

                    
                  <tr>
                    <td>{e.Typeofproject}</td>
                    <td>{e.No_of_Projects}</td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        
        <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-success">
          <h3 className="text text-center">Leads</h3>
            </div>
            <div className="card-body cardi">
            <table class="table table-striped">
                <thead className="text-black text-center ">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    
                  </tr>
                </thead>
                <tbody className="text-black text-center">
                {data?.leads?.map((e)=>{
                    // console.log("data",data)
                    return(

                    
                  <tr>
                    {/* <td>Current Month</td> */}
                    <td>{e.Typeofproject}</td>
                    <td>{e.No_of_Projects}</td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
  </div>
  <div className="row m-3">
        <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg text-white bg-dark">
            <h3 className="text text-center ">Milestones</h3>
            </div>
            <div className="card-body cardi">
              <table className="table text-black table-striped">
                <thead className="text-center">
                  <tr>
                    <th scope="col ">Status</th>
                    <th scope="col">Total</th>
                    
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data?.milestones?.map((e)=>{
                    // console.log("data",data)
                    return(

                    
                  <tr>
                    <td>Current Month</td>
                    <td>{e.currentmonthmilestone}</td>
                  </tr>
                  )
                })}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-secondary">
          <h3 className="text text-center">Users</h3>
            </div>
            <div className="card-body cardi">
            <table class="table table-striped ">
                <thead className="text-black text-center">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    
                  </tr>
                </thead>
                <tbody className="text-black text-center">

                {data?.users?.map((e)=>{
                    console.log("data",data)
                    return(

                    
                  <tr>
                    <td>{e.name_of_user}</td>
                    <td>{e.usertype}</td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}

        
        {/* <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-success">
          <h3 className="text text-center">Leads</h3>
            </div>
            <div className="card-body cardi">
            <table class="table table-striped">
                <thead className="text-black text-center ">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    
                  </tr>
                </thead>
                <tbody className="text-black text-center">
                {data?.milestones?.map((e)=>{
                    console.log("data",data)
                    return(

                    
                  <tr>
                    <td>Current Month</td>
                    <td>{e.currentmonthmilestone}</td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      
  </div>
  </div>

    


    </>
)
}
export default SalesDash