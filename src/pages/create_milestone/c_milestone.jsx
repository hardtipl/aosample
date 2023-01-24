import React from "react";
import "./c_milestone.css"
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Milestone =()=>{

    const navigate = useNavigate();

    const[modal,setModal] = useState(false)
    const[created,setCreated] = useState(false)
  const[message, setMessage] = useState(false)
    const { projectid, accountholderid } = useParams();
    const [registrationform, Setregistrationform] = useState({
      iprojectid: projectid,
      // iAccountHolderId: localStorage.getItem("userid"),
      vTitleofMilestone: "",
      dDeadlineDate: "",
      fAmount: "",
      tNotes: "",
      eSttaus: "",
    });
  
    const hadlechange = (e) => {
      let objname = e.target?.name;
      let value = e.target?.value;
      Setregistrationform({ ...registrationform, [objname]: value });
      setCreated(true)
    };
  
  
    const registrationapicall = async (e) => {
      // alert(JSON.stringify(registrationform));
      const data = {
       
        ...registrationform,
      };
  
      const responseapi = await fetch(
        `${process.env.REACT_APP_APIURL}/milestone`,
  
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
        setMessage("MileStone Created")
      }
      else{
        // setModal(true)
        setMessage(check.message)
      }
  
    
    };
    useEffect(() => {
      // console.log(registrationform);
    }, [registrationform]);

    // /p_edit/:projectid
    const handleBack=()=>{
      navigate("/mlist/"+`${projectid}`)
    }

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
        <button type="submit" onClick={handleBack}  className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Back
          </button>
          <div className="row ">
            <div className="col-12 text-center mb-2">
              <h1 className="title">MILESTONE</h1>
             <h5 className="mess"> {message}</h5>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-3 ">
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Title</label>
                {/* <input type="text" className="inputField col-12 mb-3" /> */}
                <input
                {...register('vTitleofMilestone', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              placeholder="Title of Milestone"
              name="vTitleofMilestone"
              value={registrationform.vTitleofMilestone}
              onChange={hadlechange}
            />
            {registrationform.vTitleofMilestone==""?errors.vTitleofMilestone && <p className="error">Title is required.</p>:""}
              </div>
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Dead Line Date</label>
                {/* <input type="date" className="txt-area col-12 mb-3" /> */}
                <input
                {...register('dDeadlineDate', { required: true })}
              type="date"
              className="form-control rounded-pill mt-2"
              name="dDeadlineDate"
              placeholder="Deadline Date"
              value={registrationform.dDeadlineDate}
              onChange={hadlechange}
            />
             {registrationform.dDeadlineDate==""?errors.dDeadlineDate && <p className="error">This Field is required.</p>:""}
              </div>
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Amount</label>
                {/* <input type="text" className="inputField col-12 mb-3" /> */}
                <input
                {...register('fAmount', { required: true })}
              type="number"
              className="form-control rounded-pill mt-2"
              name="fAmount"
              placeholder="Amount"
              value={registrationform.fAmount}
              onChange={hadlechange}
            />
            {registrationform.fAmount==""?errors.fAmount && <p className="error">Amount is required.</p>:""}
              </div>
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Notes</label>
                {/* <input type="text" className="inputField col-12 mb-3" /> */}
                <input
                {...register('tNotes', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="tNotes"
              placeholder="Notes"
              value={registrationform.tNotes}
              onChange={hadlechange}
            />
            {registrationform.tNotes==""?errors.tNotes && <p className="error">Notes is required.</p>:""}
              </div>
              <div className="col-6 my-2 px-3 mx-auto">
                <label htmlFor="">Status</label>
                <select
                {...register('eSttaus', { required: true })}
              name="eSttaus"
              className="form-control rounded-pill mt-2"
              value={registrationform.eSttaus}
              onChange={hadlechange}
            >
              <option value="">Select</option>

              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {registrationform.eSttaus==""?errors.eSttaus && <p className="error">Status is required.</p>:""}
              </div>

              
            </div>
          {created?  <button
                type="submit"
                onClick={handleSubmit(registrationapicall)}
              value="Register"
                className="mx-auto btn btn-outline-dark w-25"
                
              >
                Submit
              </button>:
              
              <button
                type="submit"
                onClick={handleSubmit(registrationapicall)}
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
export default Milestone