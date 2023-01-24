import React from "react";
import { useState,useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { useForm } from 'react-hook-form';


const CModule=()=>{
const navigate = useNavigate()
  const{milestoneid,projectid} = useParams()
  const[created,setCreated] = useState(false)
  // alert(milestoneid)
  const[message, setMessage] = useState(false)

    const [data,setData] = useState({
      imilestone_id:milestoneid
    })
   




   
    
      const hadlechange = (e) => {
        let objname = e.target?.name;
        let value = e.target?.value;
        setData({ ...data, [objname]: value });
        setCreated(true)
      };
    
    
      const modulecall = async (e) => {
       
    
        const responseapi = await fetch(
          `${process.env.REACT_APP_APIURL}/module`,
    
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
            body: JSON.stringify(data),
          }
        );
    
        let check = await responseapi.json();
        // console.log(check)
        setCreated(false)
        if(check.Success == 1)
        {
          // setModal(true)
          setMessage("Module Created")
        }
        else{
          // setModal(true)
          setMessage(check.message)
        }    
      
      };
      useEffect(() => {
      }, [data]);
  
     
// const handleBack=()=>{
//   onClick={() => navigate(-1)}
// }

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

    return(
        <>


<Sidebar IsSales={true}/>

<div>
<div className="set">

      <div className="Milebody">
      
        <div className="container my-3 p-5">
        <button type="submit" onClick={() => navigate(-1)}  className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Back
          </button>
          <div className="row ">
            <div className="col-12 text-center mb-2">
              <h1 className="title">Module</h1>
              <h5 className="mess"> {message}</h5>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-3 ">
            <div className="col-6 my-2 px-3 mx-auto">
                {/* <label htmlFor="">Milestone</label> */}
               {/* <select name="" id="" className="form-control rounded-pill mt-2">
                <option value="">Select</option>
               </select> */}
              </div>
            
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Module Name</label>
                {/* <input type="text" className="inputField col-12 mb-3" /> */}
                <input
                {...register('module_name', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              placeholder="module name"
              name="module_name"
              value={data.module_name}
              onChange={hadlechange}
            />
            {errors.module_name && <p className="error">Module Name is required.</p>}
              </div>
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Estimated Time</label>
                {/* <input type="date" className="txt-area col-12 mb-3" /> */}
                <input
                {...register('estimated_time', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="estimated_time"
              placeholder="time"
              value={data.estimated_time}
              onChange={hadlechange}
            />
            {errors.estimated_time && <p className="error">Estimated Time is required.</p>}
              </div>
             
            
              

              
            </div>
         {created?   <button
                type="submit"
                onClick={handleSubmit(modulecall)}
              value="Register"
                className="mx-auto btn btn-outline-dark w-25"
              >
                Submit
              </button>:
               <button
               type="submit"
               onClick={handleSubmit(modulecall)}
             value="Register"
               className="mx-auto btn btn-outline-dark w-25"
               disabled
             >
               Submit
             </button>
              
              }
          </div>
        </div>
      </div>
    </div>
    </div>


        
        </>
    )

}
export default CModule