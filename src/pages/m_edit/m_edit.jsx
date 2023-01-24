import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';



const M_edit =()=>{


const[isUpdate,setIsUpdate] = useState(false)
  const[updated, setUpdated]= useState(false)
  const [error, setError] = useState({})
  const {projectid,milestoneid} = useParams()
  // alert(milestoneid+projectid)
    const navigate = useNavigate();
    const [data, setData] = useState({

    });     

  
    let handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setData({ ...data, [name]: value });
      setIsUpdate(true)
    };



    const isvalid = (verificationdata) => {
      let errors = {};
     
      // if (
      //   verificationdata.CompanyName == undefined ||
      //   verificationdata.CompanyName == ""
      // ) {
      //   errors.CompanyName = "Company name is Required";
      // } else if (
      //   !/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(verificationdata.CompanyName)
      // ) {
      //   errors.CompanyName = "Company name is not valid ";
      // }
      if (
        verificationdata.vTitleofMilestone == undefined ||
        verificationdata.vTitleofMilestone == ""
      ) {
        errors.vTitleofMilestone = "Field should not be empty";
      } 
      if (
        verificationdata.dDeadlineDate == undefined ||
        verificationdata.dDeadlineDate == ""
      ) {
        errors.dDeadlineDate = "Field should not be empty";
      } 
      if (
        verificationdata.fAmount == undefined ||
        verificationdata.fAmount == ""
      ) {
        errors.fAmount = "Field should not be empty";
      } 
      if (
        verificationdata.tNotes == undefined ||
        verificationdata.tNotes == ""
      ) {
        errors.tNotes = "Field should not be empty";
      } 
      if (
        verificationdata.eStatus == undefined ||
        verificationdata.eStatus == ""
      ) {
        errors.eStatus = "Field should not be empty";
      } 
     
      
    
      return errors;
    };


    useEffect(() => {
      if (Object.keys(data).length != 0) {
        setError(isvalid(data));
      } else {
        return;
      }
    }, [data]);
  
    const mileapi = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_APIURL}/milestone/milestones/${milestoneid}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const apiresponse = await result.json();
      const check = apiresponse.Message;
      setData({ ...data, ...check[0] });
      // console.log(check);
    };
  
   
  
   
  
    useEffect(() => {
        mileapi();
    }, []);
  
    useEffect(() => {
    }, [data]);




    const milestoneData = (e) => {
      const alloweditms=["iprojectid","vTitleofMilestone","dDeadlineDate","fAmount",
      "tNotes",
      "eSttaus",
      "iAccountHolderId"]
         
          const apicall = () => {
          // console.log(data)
          // {}
          // delete data.id
          // delete data.dCreateddate
          // Object.keys(data)
              const apidata = axios({
                  method: "put",
                  url: `${process.env.REACT_APP_APIURL}/milestone/${milestoneid}`,
                  data: data,
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("Token")}`,
                      "Content-Type": "application/json",
                  },
              })
              // console.log(apidata);
              const respo = apidata.data;
              const check = respo?.Message;
              setUpdated(true)
              setIsUpdate(false)
          };
          try {
            if(isUpdate && Object.keys(error).length==0){
              apicall();
            }
          } catch (e) {
          }
  }
  
  
  const handleBack=()=>{
    navigate("/mlist/" + `${projectid}`)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();


  useEffect(()=>{
    // console.log(error)
        },[error])

    return(
        <>



<>

<Sidebar IsSales={true}/>

<div>
<div className="set">

<div className="Milebody">

<div className="container my-3 p-5">
<button type="submit"  onClick={handleBack} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
    Back
  </button>
  <div className="row ">
    <div className="col-12 text-center mb-2">
      <h1 className="title">MILESTONE</h1>
     <h5 style={{color:"green"}}> {updated?"Updated Successfully":""}</h5>
    </div>

    <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-3 ">
      <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Title</label>
        {/* <input type="text" className="inputField col-12 mb-3" /> */}
        <input
      type="text"
      className="form-control rounded-pill mt-2"
      placeholder="Title of Milestone"
      name="vTitleofMilestone"
      value={data.vTitleofMilestone}
      onChange={handleChange}
    />
              {error.vTitleofMilestone?<p style={{color:"red"}}>{error.vTitleofMilestone}</p>:""}


      </div>

      {/* <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Created Date</label>
        <input
      type="date"
      className="form-control rounded-pill mt-2"
      name="dCreateddate"
      placeholder="Deadline Date"
      value= {new Date(data.dCreateddate).toLocaleDateString("en-CA")}
     
      onChange={handleChange}
    />
      </div> */}
      <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Dead Line Date</label>
        {/* <input type="date" className="txt-area col-12 mb-3" /> */}
        <input
      type="date"
      className="form-control rounded-pill mt-2"
      name="dDeadlineDate"
      placeholder="Deadline Date"
      value= {new Date(data.dDeadlineDate).toLocaleDateString("en-CA")}
     
      onChange={handleChange}
    />
              {error.dDeadlineDate?<p style={{color:"red"}}>{error.dDeadlineDate}</p>:""}

      </div>
      <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Amount</label>
        {/* <input type="text" className="inputField col-12 mb-3" /> */}
        <input
      type="number"
      className="form-control rounded-pill mt-2"
      name="fAmount"
      placeholder="Amount"
      value={data.fAmount}
      onChange={handleChange}
    />
              {error.fAmount?<p style={{color:"red"}}>{error.fAmount}</p>:""}

      </div>
      <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Notes</label>
        {/* <input type="text" className="inputField col-12 mb-3" /> */}
        <input
      type="text"
      className="form-control rounded-pill mt-2"
      name="tNotes"
      placeholder="Notes"
      value={data.tNotes}
      onChange={handleChange}
    />
              {error.tNotes?<p style={{color:"red"}}>{error.tNotes}</p>:""}

      </div>
      <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Status</label>
        <select
      name="eStatus"
      className="form-control rounded-pill mt-2"
      value={data.eStatus}
      onChange={handleChange}
    >
      <option value="">Select</option>

      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
    {error.eStatus?<p style={{color:"red"}}>{error.eStatus}</p>:""}

      </div>

      
    </div>
  {isUpdate?  <button
        type="submit"
        onClick={milestoneData}
      value="Register"
        className="mx-auto btn btn-outline-dark w-25"
      >
        Update
      </button>:
       <button
       type="submit"
       onClick={milestoneData}
     value="Register"
       className="mx-auto btn btn-outline-dark w-25"
       disabled
     >
       Update
     </button>
      }
      {/* <Link to={"/modlist/"+`${milestoneid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Modules
          </Link> */}
      {/* <Link to={"/cmodule/"+`${milestoneid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Create Module
          </Link> */}
  </div>
</div>
</div>
</div>
</div>


</>
        </>

    )

}
export default M_edit 