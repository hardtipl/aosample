
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { technologylist } from "../../constfiles";


const Project = () => {

  const navigate = useNavigate()
  const { inquiryid } = useParams();
  const [technologydropdown] = useState(technologylist);
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState(false)
 
  const singleapi = async () => {
    try {
    // alert("fetcvhiong data")
    const result = await fetch(
      `${process.env.REACT_APP_APIURL}/inquiry/${inquiryid}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const apiresponse = await result.json();
    const check = apiresponse.inquirylist[0];
    console.log(check)
      setValue("vTitleProject", check.vTitle)
      setValue("vTechnology", check.vTechnology)
      setValue("vHireDuration", check.vHireDuration)
      setValue("vHireMonthlyBudget", check.vHireMonthlyBudget)
      setValue("vExperienceRequired", check.vExperienceRequired)
      setValue("eStatus", check.eStatus)
      setValue("eTypeOfProject", check.eTypeofInquiry)
      setValue("eTypeofHire", check.eTypeofHire)
    }
    catch (e) {
      console.log("fetching error",e)
    }
  };
  useEffect(() => {
    singleapi(inquiryid);
   
  }, []);
  const createproject = (projectdetail) => {
    console.log("createproject",projectdetail)
    const formData = new FormData();
    if (projectdetail.requiredprojectfiles.length >= 0) {

      for (let i = 0; i < projectdetail.requiredprojectfiles.length; i++) {
        formData.append("requiredprojectfiles", projectdetail.requiredprojectfiles[i]);
      }
    }
    formData.append("iiInquiryId", inquiryid);
    formData.append("eTypeOfProject", projectdetail.eTypeOfProject);
    formData.append("vTitleProject", projectdetail.vTitleProject);
    formData.append("fCostOfProject", projectdetail.fCostOfProject);
    formData.append("vTechnology", projectdetail.vTechnology);
    formData.append("vHireResource", projectdetail.vHireResource);
    // formData.append("iVendorId", projectdetail.iVendorId);
    formData.append("dBillingCycleDate", projectdetail.dBillingCycleDate);
    formData.append("fHireBillingAmount", projectdetail.fHireBillingAmount);
    formData.append("dconvertedDate", projectdetail.dconvertedDate);
    formData.append("fProjectCost", projectdetail.fProjectCost);
    formData.append("iAccountHolderId", localStorage.getItem("userid"));
    formData.append("tNotes", projectdetail.tNotes);
    formData.append("vHireDuration", projectdetail.vHireDuration);
    formData.append("vHireMonthlyBudget", projectdetail.vHireMonthlyBudget);
    formData.append("vExperienceRequired", projectdetail.vExperienceRequired);
    formData.append("fAtCostResourceToVendor", projectdetail.fAtCostResourceToVendor);
    formData.append("eProjectStatus", projectdetail.eProjectStatus);
    formData.append("eStatus", projectdetail.eStatus);
    formData.append("dstartdate", projectdetail.dstartdate);
    formData.append("denddate", projectdetail.denddate);
    const imageupdateapicall = async () => {
      let callingurl = `${process.env.REACT_APP_APIURL}/projects`;
      const returneddetail = await axios({
        method: "post",
        url: callingurl,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const respo = returneddetail.data;
      const check = respo?.Message;
      // alert("check", JSON.stringify(check));

      if (returneddetail.status == 200) {
        reset()
        setModal(true)
        setMessage("Project Created")
      }
      else {
        setModal(true)
        setMessage("Something Went Wrong")
      }
    };
    try {
      imageupdateapicall()
    } catch (e) {
      // alert(e)
    }
  };

  const handleBack = () => {
    navigate("/i_edit/" + `${inquiryid}`)
  }
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch
  } = useForm({
  });

  const selectedtypeofproject = watch("eTypeOfProject",false)


  return (
    <>
      <Sidebar IsSales={true} />
      <div className='set'>
        <div className="container my-3 body p-5">
          <button type="submit" onClick={handleBack} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Back to Inquiry
          </button>
          <div className="row ">
            <form onSubmit={handleSubmit(createproject)}>
              <div className="col-12 text-center mb-2 ">
                <h1 className="title">PROJECT</h1>
              </div>
              <div className="row">
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="" className="d-block">
                      Type of Project
                    </label>
                    <select
                      {...register('eTypeOfProject', { required: {
                        value:true,
                        message:"Type of Project is required"
                      } })}
                      className="form-control rounded-pill mt-2"
                      type="text"
                      placeholder="Type of Project"
                    >
                      <option value="">Select</option>
                      <option value="Hire">Hire</option>
                      <option value="Project Basis">Project Basis</option>
                    </select>
                    {errors.eTypeOfProject ? <p style={{ color: "red" }}>{errors.eTypeOfProject.message}</p> : ""}
                  </div>
                  {selectedtypeofproject==="Hire"&&
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="" className="d-block">
                      Type of Hire Inquire
                    </label>
                    <select
                      className="form-control rounded-pill mt-2"
                      {...register('eTypeofHire', { required: true })}
                    >
                      <option value="">Select</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                    {errors.eTypeofHire && <p className="error">{errors.eTypeofHire.message}</p>}
                  </div>
}

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Title</label>
                    <input
                       {...register('vTitleProject', { required: {
                        value:true,
                        message:"Title is Required"
                       } })}
                      className="form-control rounded-pill mt-2"
                      type="text"
                      placeholder="Project Title"
                    />
                    {errors.vTitleProject ? <p style={{ color: "red" }}>{errors.vTitleProject.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="" className="d-block">
                      Technology
                    </label>
                    <select 
                      {...register('vTechnology', { required: {
                        value:true,
                        message:"Technology is Required"
                      } })}
                      className="form-control rounded-pill mt-2"
                    >
                      <option value="">select</option>
                      {technologydropdown.map((e) => {
                        return (
                          <option value={e}>{e}</option>
                        )
                      })}
                    </select>
                    {errors.vTechnology ? <p style={{ color: "red" }}>{errors.vTechnology.message}</p> : ""}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Hire Resource</label>
                    <input
                      {...register('vHireResource', { required: {
                        value:true,
                        message:"Hire Resource is Required"
                      } })}
                      type="text"
                      className="form-control rounded-pill mt-2"
                      placeholder="Hire Resource"
                    />
                    {errors.vHireResource ? <p style={{ color: "red" }}>{errors.vHireResource.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Billing Date</label>
                    {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                    <input
                      {...register('dBillingCycleDate', { required: {
                        value:true,
                        message:"Billing Date is Required"
                      }  })}
                      type="date"
                      className="form-control rounded-pill mt-2"
                      placeholder="Billing Date"
                    />
                    {errors.dBillingCycleDate ? <p style={{ color: "red" }}>{errors.dBillingCycleDate.message}</p> : ""}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Billing Amount</label>
                    <input
                       {...register('fHireBillingAmount', { required: {
                        value:true,
                        message:"Billing Amount is Required"
                      },
                    min:{
                      value:1000,
                      message:"Minimum value is 1000"
                    }
                    })}
                      type="number"
                      className="form-control rounded-pill mt-2"
                      placeholder="Billing Amount"
                    />
                    {errors.fHireBillingAmount ? <p style={{ color: "red" }}>{errors.fHireBillingAmount.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Converted Date</label>
                    <input
                      {...register('dconvertedDate', { required: {
                        value:true,
                        message:"Converted Date is Required"
                      }  })}
                      type="date"
                      className="form-control rounded-pill mt-2"
                      name="dconvertedDate"
                      placeholder="Converted Date"
                    />
                    {errors.dconvertedDate ? <p style={{ color: "red" }}>{errors.dconvertedDate.message}</p> : ""}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Project Cost</label>
                    <input
                      {...register('fProjectCost', { required: {
                        value:true,
                        message:"Project Cost is Required"
                      } ,
                      min:{
                        value:1000,
                        message:"Minimum value is 1000"
                      }
                    })}
                      type="number"
                      className="form-control rounded-pill mt-2"
                      name="fProjectCost"
                      placeholder="Project Cost"
                    />
                    {errors.fProjectCost ? <p style={{ color: "red" }}>{errors.fProjectCost.message}</p> : ""}
                  </div>


                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Start Date</label>
                    <input
                      {...register('dstartdate', { required: {
                        value:true,
                        message:"Start Date is Required"
                      }  })}
                      type="date"
                      className="form-control rounded-pill mt-2"
                      placeholder="Converted Date"
                    />
                    {errors.dstartdate ? <p style={{ color: "red" }}>{errors.dstartdate.message}</p> : ""}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">End Date</label>
                    <input
                      {...register('denddate', { required: {
                        value:true,
                        message:"End Date is Required"
                      }  })}
                      type="date"
                      className="form-control rounded-pill mt-2"
                      placeholder="End Date"
                    />
                    {errors.denddate ? <p style={{ color: "red" }}>{errors.denddate.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Cost of Project</label>
                    
                    <input
                      {...register('fCostOfProject', { required: {
                        value:true,
                        message:"Cost Of Project is Required"
                      },
                      min:{
                        value:1000,
                        message:"Minimum value is 1000"
                      }
                    })}
                      type="number"
                      className="form-control rounded-pill mt-2"
                      placeholder="Cost of Project"
                    />
                    {errors.fCostOfProject ? <p style={{ color: "red" }}>{errors.fCostOfProject.message}</p> : ""}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Notes</label>
                    <input
                       {...register('tNotes', { required: {
                        value:true,
                        message:"End Date is Required"
                      } })}
                      type="text"
                      className="form-control rounded-pill mt-2"
                      placeholder="Notes"
                    />
                    {errors.tNotes ? <p style={{ color: "red" }}>{errors.tNotes.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Hire Duration</label>
                    <input
                      {...register('vHireDuration', { required: {
                        value:true,
                        message:"Hire Duration is Required"
                      } })}
                      type="text"
                      className="form-control rounded-pill mt-2"
                      placeholder="Hire Duration"
                    />
                    {errors.vHireDuration ? <p style={{ color: "red" }}>{errors.vHireDuration.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Monthly Budget</label>
                    <input
                      {...register('vHireMonthlyBudget', { required: {
                        value:true,
                        message:"Monthly Budget Required"
                      },
                      min:{
                        value:1000,
                        message:"Minimum value is 1000"
                      }
                    })}
                      type="number"
                      className="form-control rounded-pill mt-2"
                      name="vHireMonthlyBudget"
                      placeholder="Hire Monthly Budget"
                    />
                    {errors.vHireMonthlyBudget ? <p style={{ color: "red" }}>{errors.vHireMonthlyBudget.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Experienced Required</label>
                    <input
                      {...register('vExperienceRequired', { required: {
                        value:true,
                        message:"Experience is Required"
                      } })}
                      type="text"
                      className="form-control rounded-pill mt-2"
                      // name="vExperienceRequired"
                      placeholder="Experience Required"
                    />
                    {errors.vExperienceRequired ? <p style={{ color: "red" }}>{errors.vExperienceRequired.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Cost of Resource</label>
                    <input
                      {...register('fAtCostResourceToVendor', { required: {
                        value:true,
                        message:"Cost of Resource is Required"
                      } ,
                      min:{
                        value:1000,
                        message:"Minimum value is 1000"
                      }
                    })}
                      type="number"
                      className="form-control rounded-pill mt-2"
                      placeholder="Cost of resource"
                    />
                    {errors.fAtCostResourceToVendor ? <p style={{ color: "red" }}>{errors.fAtCostResourceToVendor.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Status</label>
                    <select
                      {...register('eStatus', { required: {
                        value:true,
                        message:"Status is Required"
                      } })}
                      className="form-control rounded-pill mt-2"
                      type="text"
                      name="eStatus"
                      placeholder="Status"
                    >
                      <option value="">Select</option>
                      <option value="Converted">Converted</option>
                      <option value="InProgress">InProgress</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Rejected">Rejected</option>
                      <option value="OnHold">OnHold</option>
                      <option value="No Response From Client">No Response From Client</option>
                    </select>
                    {errors.eStatus ? <p style={{ color: "red" }}>{errors.eStatus.message}</p> : ""}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Documents</label>
                    {/* <input type="file" className=" col-12 mb-3" /> */}
                    {/* <input type="file" name="mediafiles" value={inquiryform.mediafiles} onChange={handleimage} className=" col-12 mb-3" multiple/> */}
                    <input
                      type="file"
                      {...register('requiredprojectfiles')}
                      className="form-control rounded-pill mt-2"
                      // name="requiredprojectfiles"
                      // id="upload"
                      accept="image/*"
                      multiple
                    />
                  </div>
                  <div className="col-6  my-2 ">
                    <div className="col-6  my-2  px-3">
                    </div>
                  </div>
                </div>
              <button type="button" className="mx-auto btn btn-outline-dark w-25">
                Add Team
              </button>
              <button type="submit"  className="mx-auto btn btn-outline-dark w-25">
                Submit
              </button>
            </form>
          </div>
          {modal ?
            <>
              <div className='modal_'>
                <div className='modalBody'>
                  {message}
                  <div className="modal-button">
                    <button className="modal-btn" >Go to Inquiries</button>
                    <button className="modal-btn" >Check it</button>
                  </div>
                </div>

              </div>
            </>
            : ""}
        </div>
      </div>
    </>
  )
}

export default Project