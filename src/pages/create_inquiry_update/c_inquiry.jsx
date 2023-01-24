import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./c_inquiry.css"

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { sourcelist, technologylist } from "../../constfiles"

export default function Inquiry() {

  const navigate = useNavigate()
  const refreshPage = () => {
    window.location.reload(false);
  }
  const [vendorMessage, setVendorMessage] = useState(false)
  const [personMessage, setPersonMessage] = useState(false)
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState(false)
  const [compid, setcompid] = useState([]);
  const [conatctinputvalue, setConatctValue] = useState([]);
  const [Sourcelistdropdown] = useState(sourcelist);
  const [technologydropdown] = useState(technologylist);
  
  const fetchData = () => {
    return axios.get(`${process.env.REACT_APP_APIURL}/vendor`, {}).then(result => {
      let res = result.data.vendorlist;
      setcompid(result.data.vendorlist)
      if (res === "No result found.") {
        // Empty result, return an empty array instead of a string
        // console.log("no result found")
        return [];
      }
      return res;
    })
  }

  const fetchConatctData = (vendorid) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_APIURL}/contactperson/${vendorid}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json",
      },
    }).then(result => {

      let res = result.data.message;
      setConatctValue(res)
      // console.log("for the option from comnponay id", res)

      return res
    })
  }



  const AddVendor = (e) => {
    alert("calling add compny")
    console.log("Company form ", e)
    hereistoaddvendor(e)
    // e.preventDefault()
  }
  const hereistoaddvendor = async (vendordetail) => {
  try {
    
  
    const apidata = await axios({
      method: "post",
      url: `${process.env.REACT_APP_APIURL}/vendor/addvendor`,
      data: vendordetail,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json",
      },
    })
    fetchData()
    reset2()

    if (apidata.status === 200) {
      // setVendorAdded(true)
      setVendorMessage("Added")
      setTimeout(() => {
        setVendorMessage("")
      }, 3000);
    }
  } catch (error) {
    
  }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const AddContactPerson = (e) => {
    hereistoaddcontact(e)
  }
  const hereistoaddcontact = async (contactpersondetail) => {
try {

    const data = {
      ...contactpersondetail, iCompanyid: selectdcompany,
    }
    const apidata = await axios({
      method: "post",
      url: `${process.env.REACT_APP_APIURL}/contactperson`,
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json",
      },
    })
    reset3()
    if (apidata.status === 200) {
      // setVendorAdded(true)
      fetchConatctData(selectdcompany)
      setPersonMessage("Added")
    }
  } catch (error) {
  alert(error)
  }

  }

  
  const inquiryData = (e) => {
    alert("inserting inquiry")
    console.log(e)
    debugger;
    // e.target.reset();
    // alert( JSON.stringify(inquiryform));
    const formData = new FormData();
    if (e.mediafiles !== undefined) {
      for (let i = 0; i < e.mediafiles.length; i++) {
        formData.append("mediafiles", e.mediafiles[i]);
      }
    }

    formData.append("vTitle", e.vTitle);
    formData.append("vTechnology", e.vTechnology);
    formData.append("vSourceOfInquiry", e.vSourceOfInquiry);
    // formData.append("iAccountHolderId", e.iAccountHolderId);
    formData.append("eTypeofInquiry", e.eTypeofInquiry);
    formData.append("tDescription", e.tDescription);
    formData.append("vHireDuration", e.vHireDuration);
    formData.append("vHireMonthlyBudget", e.vHireMonthlyBudget);
    formData.append("vExperienceRequired", e.vExperienceRequired);
    formData.append("vendorid", e.vendorid);
    if(e.eTypeofHire) formData.append("eTypeofHire", e.eTypeofHire);
    
    const apicall = async () => {

      const apidata = await axios({
        method: "post",
        url: `${process.env.REACT_APP_APIURL}/inquiry`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      //  console.log(apidata)
      if (apidata.status === 200) {
        setModal(true)
        setMessage("Inquiry Created")
        reset()
      }
      else {
        setModal(true)
        setMessage("Something Went Wrong")
      }
    };
    try {
      apicall();

    } catch (e) {
      // alert(e)
    }
  }

  const handleClose = () => {
    setModal(false)
    refreshPage()

  }


  console.log("array of string as sourcelist", sourcelist, technologydropdown)
  // const aquaticCreatures = ok?.map(e => ({ label: e.vCompanyName, value: e.id }));
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors: errors1 },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    clearErrors:clearErrors2,
    formState: {
      errors: errors2
    },
  } = useForm();
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    formState: {
      errors: errors3
    },
  } = useForm();
  const selectdcompany=watch("vCompanyName")
  useEffect(()=>{
    if(selectdcompany)fetchConatctData(selectdcompany)
  },[selectdcompany])
  const selectedinquirytype = watch("eTypeofInquiry")
  const handleToDashboard = () => {
    if (localStorage.getItem("usertype") === "Sales") {
      navigate("/sales_dash")
    }
    else if (localStorage.getItem("usertype") === "Admin") {
      navigate("/admind")
    }
    else if (localStorage.getItem("usertype") === "Developer") {
      navigate("/devdash")
    }
  }
  console.log("errors", errors1, "errors2", errors2,"errors3",errors3, "selectedinquirytype", selectedinquirytype)
  return (

    <>

      <div className='set'>
        <div className="container my-3 body p-5">
          <div className="row ">
            <div className="col-12 text-center mb-2 ">
              <h1 className="title">INQUIRY</h1>
            </div>
            <form onSubmit={handleSubmit(inquiryData)}>
              <div>
                <div className="row ">
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="" className="d-block">
                      Type of Inquire
                    </label>
                    <select
                      className="form-control rounded-pill mt-2"
                      {...register('eTypeofInquiry', { required: true })}
                    >
                      <option value="">Select</option>
                      <option value="Hire">Hire</option>
                      <option value="Project Basis">Project Basis</option>
                      {/* <option value="Fix Cost - Less than 2 Weeks">Fix Cost - Less than 2 Weeks</option> */}
                    </select>
                    {errors1.eTypeofInquiry && <p className="error">Field is required.</p>}
                  </div>
                  {selectedinquirytype==="Hire"&&
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
                    {errors1.eTypeofInquiry && <p className="error">Field is required.</p>}
                  </div>
}

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Title</label>
                    <input
                      {...register('vTitle', { required: true })}
                      type="text" className="form-control rounded-pill mt-2"
                    // name="vTitle" value={inquiryform.vTitle} onChange={handleChange} placeholder="Inquiry Title"
                    />
                    {errors1.vTitle && <p className="error">Field is required.</p>}
                  </div>
                {/* </div> */}
                {/* <div className="row "> */}
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="" className="d-block">
                      Technology
                    </label>

                    <select name="vTechnology" id=""
                      {...register('vTechnology', { required: true })}
                      className="form-control rounded-pill mt-2"

                    // value={inquiryform.vTechnology}
                    >
                      <option value="">select</option>
                      {technologydropdown.map((e) => {
                        return (
                          <option value={e} >{e}</option>
                        )
                      })}
                    </select>
                    {errors1.vTechnology && <p className="error">Field is required.</p>}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Source of Inquiry</label>
                    <select name="vSourceOfInquiry" id=""
                      {...register('vSourceOfInquiry', { required: true })}
                      className="form-control rounded-pill mt-2"

                    >
                      <option value="">select</option>
                      {Sourcelistdropdown.map((e) => {
                        console.log("here is source lisr", e)
                        return <option value={e}>{e}</option>
                      })
                      }
                    </select>
                    {errors1.vSourceOfInquiry && <p className="error">Field is required.</p>}

                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Description</label>
                    <textarea
                      {...register('tDescription', { required: true })}
                      className="form-control rounded-pill mt-2"
                      placeholder="Description"></textarea>
                    {errors1.tDescription && <p className="error">Field is required.</p>}
                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor=""> Duration</label>

                    <input
                      {...register('vHireDuration', { required: true })}
                      type="text" className="form-control rounded-pill mt-2"
                      placeholder="Duration" />
                    {errors1.vHireDuration && <p className="error">Field is required.</p>}
                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor=""> Monthly Budget</label>
                    <input
                      {...register('vHireMonthlyBudget', { required: true })}
                      type="number" className="form-control rounded-pill mt-2"
                      placeholder=" Monthly Budget" />
                    {errors1.vHireMonthlyBudget && <p className="error">{errors1.vHireMonthlyBudget.message}</p>}

                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Experience Required</label>
                    <input
                      {...register('vExperienceRequired', { required: true })}
                      type="text" className="form-control rounded-pill mt-2"
                      placeholder="Experience Required" />
                    {errors1.vExperienceRequired && <p className="error">{ errors1.vExperienceRequired.message}</p> }

                  </div>
                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Company Name</label>

                    <select

                      {...register('vCompanyName', { required: true })}
                      // onClickCapture={(e) => {
                      //   fetchConatctData(e.target.value)
                      //   SetSelectedValue(e.target.value)
                      //   setbtn(e.target.value)
                      // }}
                       className="form-control rounded-pill mt-2 my-2">
                      <option value="">Select company</option>
                      {compid &&
                        compid.map(e => {
                          return (
                            <option value={e.id}>{e.vCompanyName}</option>
                          )
                        })
                      }
                    </select>
                    { errors1.vCompanyName && <p className="error">{errors1.vCompanyName.message}</p> }
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={()=>clearErrors2()}
                    >
                      Add Company
                    </button>


                  </div>

                  <div className="col-6  my-2 px-3">
                    <label htmlFor="">Contact Person</label>
                    <select
                      {...register('vendorid', { required: true })}
                      className="form-control rounded-pill mt-2 my-2"
                    >
                      <option value="">Select...</option>
                      {
                        conatctinputvalue.map(e => {
                          return (
                            <option value={e.id}>{e.vName}</option>
                          )
                        })
                      }
                    </select>
                    {errors1.vendorid && <p className="error">{errors1.vendorid.message}</p>}

                    {selectdcompany ? <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#contactmodal"
                    >
                      Add Contact Person
                    </button> :

                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#contactmodal"
                        disabled

                      >
                        Add Contact Person
                      </button>
                    }


                  </div>
                  <div className="col-6  my-2  px-3">
                    <label htmlFor="">Documents</label>
                    {/* <input type="file" className=" col-12 mb-3" /> */}
                    <input
                      type="file" 
                      {...register('mediafiles')}
                      className=" form-control rounded-pill mt-2" multiple />

                  </div>
                </div>
              </div>

              <button type="reset" onClick={handleToDashboard} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
                Back
              </button>
              <button type="submit" className="mx-auto btn btn-outline-dark w-25">
                Submit
              </button>
            </form>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit2(AddVendor)} >
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Company Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <div className="form-check d-inline-flex mb-3">
                        <input
                          className=""
                          type="radio"
                          id="flexRadioDefault1"
                           value="Individual"
                          {...register2('eClienttype', { required: { value: true, message: "Please select Consultant or Company" } })}
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Consultant
                        </label>
                      </div>
                      <div className="form-check d-inline-flex mx-3">
                        <input
                          type="radio"
                          id="flexRadioDefault2"
                          // checked
                           value="Company" 
                          {...register2('eClienttype', { required: { value: true, message: "Please select Consultant or Company" } })}
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          Company
                        </label>
                      </div>
                      {errors2.eClienttype ?
                        <p className='text-danger'>{errors2.eClienttype.message}</p> : ''}
                    </div>
                    <label htmlFor="">Company Name</label>
                    <input
                      {...register2('vCompanyName', { required: { value: true, message: "Please Enter Comany Name" } })}
                      type="text" className="form-control rounded-pill mt-2" />
                    {errors2.vCompanyName ?
                      <p className='text-danger'>{errors2.vCompanyName.message}</p> : ''}

                    <label htmlFor="">Address</label>
                    <input
                      {...register2('vAddress', { required: { value: true, message: "Please Enter Address" } })}
                      type="text" className="form-control rounded-pill mt-2" />
                    {errors2.vAddress ?
                      <p className='text-danger'>{errors2.vAddress.message}</p> : ''}
                    <label htmlFor="">Email</label>
                    <input
                      type="text" className="form-control rounded-pill mt-2"
                      {...register2('vEmail', {
                        required: { value: true, message: "Email is Required" }, pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please Enter Correct Email"
                        }
                      })}
                    />
                    {errors2.vEmail ?
                      <p className='text-danger'>{errors2.vEmail.message}</p> : ''}
                    <label htmlFor="">Vendor Name</label>
                    <input
                      type="text" className="form-control rounded-pill mt-2"
                      {...register2('vVendorName', { required: { value: true, message: "Please Enter Vendor Name" } })}
                    />
                    {errors2.vVendorName ?
                      <p className='text-danger'>{errors2.vVendorName.message}</p> : ''}
                    <label htmlFor="">Mobile</label>
                    <input
                      type="text" className="form-control rounded-pill mt-2"
                      {...register2('vMobile', {
                        required: { value: true, message: "Please Enter Contact Number" }, pattern: {
                          value: /^[0-9]{10}$/gm,
                          message: "Please Enter Contact Number Correctly"
                        }
                      })}
                    />
                    {errors2.vMobile ?
                      <p className='text-danger'>{errors2.vMobile.message}</p> : ''}
                    <label htmlFor="">Notes</label>
                    <input
                      type="text" className="form-control rounded-pill mt-2"
                      {...register2('tNotes')}
                    />
                    {errors2.tNotes ?
                      <p className='text-danger'>{errors2.tNotes.message}</p> : ''}
                    <label htmlFor="">City</label>
                    <input
                      type="text" className="form-control rounded-pill mt-2"
                      {...register2('vCity')}
                    />
                    {errors2.vCity ?
                      <p className='text-danger'>{errors2.vCity.message}</p> : ''}
                    <label htmlFor="">State</label>
                    <input
                      type="text" className="form-control rounded-pill mt-2"
                      {...register2('vState')}
                    />
                    {errors2.vState ?
                      <p className='text-danger'>{errors2.vState.message}</p> : ''}
                  </div>
                  <p style={{ color: "green", textAlign: "end", marginRight: "30px" }}>{vendorMessage}</p>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => reset2()}
                    >
                      Close
                    </button>

                    <button type="submit" className="btn btn-outline-dark"
                    // data-bs-dismiss="modal"
                    // disabled={
                    //   errors2
                    // }
                    // onClick={AddVendor}
                    >
                      Save changes
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="contactmodal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Contact Person
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleSubmit3(AddContactPerson)}>
                <div className="modal-body">
                  <select value={selectdcompany} 
                    disabled
                    className="form-control rounded-pill mt-2 my-2">
                    {compid &&
                      compid.map(e => {
                        return (
                          <option value={e.id}>{e.vCompanyName}</option>
                        )
                      })
                    }
                  </select>
                  <label htmlFor="">Name</label>
                  <input
                    type="text" className="form-control rounded-pill mt-2" 
                    {...register3('vName',{required:{
                      value:true,message:"Please Provide Name"
                    }})}
                    />
                  {errors3.vName && <p style={{ color: "red" }}>{errors3.vName.message}</p> }
                  <label htmlFor="">Mobile</label>
                  <input
                    // {...register('vMobile', { required: true })}
                    type="text" className="form-control rounded-pill mt-2" 
                    {...register3('vMobile',{required:{
                      value:true,message:"Please Provide Contact"
                    },
                    pattern: {
                      value: /^[0-9]{10}$/gm,
                      message: "Please Enter Contact Number Correctly"
                    }
                  })}
                     />
                  {errors3.vMobile ? <p style={{ color: "red" }}>{errors3.vMobile.message}</p> : ""}
                  {/* {errors.vMobile && <p className="error">Field is required.</p>} */}
                  <label htmlFor="">Email</label>
                  <input
                    // {...register('vEmail', { required: true })}
                    type="text" className="form-control rounded-pill mt-2"
                    {...register3('vEmail',{required:{
                      value:true,message:"Please Provide Email"
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please Enter Correct Email"
                    }
                  })}
                    />
                  {errors3.vEmail ? <p style={{ color: "red" }}>{errors3.vEmail.message}</p> : ""}
                  {/* {errors3ors.vEmail && <p className="error">Field is required.</p>} */}
                  <label htmlFor="">Skype</label>
                  <input
                    // {...register('vSkype', { required: true })}
                    type="text" className="form-control rounded-pill mt-2" 
                    {...register3('vSkype',{required:{
                      value:true,message:"Please Provide Skype"
                    }})}
                   />
                  {errors3.vSkype ? <p style={{ color: "red" }}>{errors3.vSkype.message}</p> : ""}
                  {/* {errors.vSkype && <p className="error">Field is required.</p>} */}
                </div>
                <p style={{ color: "green", textAlign: "end", marginRight: "30px" }}>{personMessage}</p>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"

                  >
                    Close
                  </button>
                   <button type="submit"  className="btn btn-outline-dark"
                  // data-bs-dismiss="modal"
                  >
                    Save changes
                  </button> 
                  
                </div>
                </form>
              </div>
            </div>
          </div>
          {modal ?
            <>


              <div className='modal_'>
                <div className='modalBody'>

                  {message}

                  <div className="modal-button">
                    {/* <button className="modal-btn">Ok</button> */}
                    <button className="modal-btn" onClick={handleClose}>Ok</button>
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