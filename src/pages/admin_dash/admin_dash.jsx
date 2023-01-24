import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./admin_dash.css"
import Sidebar from "../sidebar/sidebar";
import Header from "../../header/header";

const AdminDash =()=>{

  const [data,setData] = useState()
  const [monthly,setMonthly]=useState(false)
  const [year,setYear]=useState(false)

  const dash = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_APIURL}/dashboard/?${monthly?`month=${monthly}&`:""}${year?`year=${year}&`:""}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
    );

    const response = await result.json()
    console.log(response);
    const res = response.Message
    setData(res)
    
  };

  useEffect(()=>{
    dash()
  },[monthly,year])

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
return(
    <>
    {/* <Header /> */}
    <Sidebar  IsAdmin={true}/>
{/* <div>
<input type="radio" name="detailsdisplay" value={"monthly"} onClick={()=>setMonthly(true)} checked ={monthly?"checked":""} />
<label for="html">Monthly</label><br></br>
<input type="radio" name="detailsdisplay" value={"yearly"} onClick={()=>setMonthly(false)} checked ={!monthly?"checked":""}
// disabled = {(this.state.disabled)? "disabled" : ""}
/>
<label for="html">Yearly</label><br></br>
</div> */}
    <div className='set'>
      <div className="text-end p-1">
        <select name="" id="" className="px-5 py-2 mx-1 rounded-pill"
        onChange={(e)=>setMonthly(e.target.value)}
        >
          <option value="" >Months</option>
          {months?.map((e)=>{
            return(
              <option value={e} >{e}</option>

            )
          })}
        </select>
        <input type="number" onChange={(e)=>setYear(e.target.value)}  
         onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
          e.target.value = e.target.value.slice(0,e.target.maxLength);}}
          maxlength = {4}
          placeholder="2021"

        className="foryear px-2 py-2 mx-1 border-1 rounded-pill" />
      </div>
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
        <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-primary">
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
                    // console.log("data",data)
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
        </div>


        <div className="col-sm-4">
          <div className="card  text-white">
          <div className="card-head shadow-lg bg-secondary">
          <h3 className="text text-center">On-Bentch</h3>
            </div>
            <div className="card-body cardi">
            <table class="table table-striped ">
                <thead className="text-black text-center">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Salary</th>
                    
                  </tr>
                </thead>
                <tbody className="text-black text-center">

                {data?.onbenchlist?.map((e)=>{
                    // console.log("data",data)
                    return(

                    
                  <tr>
                    <td>{e.vname}</td>
                    <td>{e.isalary}</td>
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
export default AdminDash