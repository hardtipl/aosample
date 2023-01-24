import React from "react";
import Sidebar from "../sidebar/sidebar";
import { useState,useEffect } from "react";
import Dev_task from "../Dev_task/dev_task";

const Dev_Dash = ()=>{


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
    console.log(res)
  };

  useEffect(()=>{
    dash()
    // console.log(data.Message)
  },[])
    return(
        <>
        <Sidebar  IsAdmin={true}/>

<div className='set'>
<div className="row m-3">
    <div className="col-sm-4">
      <div className="card  text-white">
      <div className="card-head shadow-lg bg-primary">
        <h3 className="text text-center ">Tasks</h3>
        </div>
        <div className="card-body cardi">
          <table className="table text-black table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col ">No</th>
                <th scope="col">Status</th>
                
              </tr>
            </thead>
            <tbody className="text-center">
              {data?.map((e)=>{
                console.log("data",data)
                return(

                
              <tr>
                <td>{e.task_no}</td>
                <td>{e.estatus}</td>
              </tr>
              )
            })}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
    

    
    
  
</div>



    
  
    
  
</div>

        </>
    )
}

export default Dev_Dash