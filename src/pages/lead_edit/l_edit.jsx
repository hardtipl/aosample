import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import fileDownload from 'js-file-download'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { sourcelist,technologylist } from "../../constfiles";


const L_edit = () => {
  // const[error,setError] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [Sourcelistdropdown,setSourcelistdropdown] = useState(sourcelist);
  const [technologydropdown] = useState(technologylist);
  const navigate = useNavigate();
  const [doc, setDoc] = useState([])



  const [error, setError] = useState({})
  const [selectedFile, setSelectedFile] = useState();
  // const [updateForm, SetUpdateForm] = useState({});
  const { projectid, Leadid, inquiryid } = useParams();
  // alert(Leadid)
  // const { iProjectId } = useParams();

  // const [milestone, setMilestone] = useState({
  //   iProjectId: projectid,
  // });
  // alert(inquiryid);
  const [data, setData] = useState({
    iLeadid: Leadid,
    vTechnology:""
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
      verificationdata.eTypeOfProject == undefined ||
      verificationdata.eTypeOfProject == ""
    ) {
      errors.eTypeOfProject = "Field should not be empty";
    }
    if (
      verificationdata.vTitleProject == undefined ||
      verificationdata.vTitleProject == ""
    ) {
      errors.vTitleProject = "Field should not be empty";
    }
    if (
      verificationdata.fCostOfProject == undefined ||
      verificationdata.fCostOfProject == ""
    ) {
      errors.fCostOfProject = "Field should not be empty";
    }
    if (
      verificationdata.vTechnology == undefined ||
      verificationdata.vTechnology == ""
    ) {
      errors.vTechnology = "Field should not be empty";
    }
    if (
      verificationdata.vHireResource == undefined ||
      verificationdata.vHireResource == ""
    ) {
      errors.vHireResource = "Field should not be empty";
    }
    // if (
    //   verificationdata.tNotes == undefined ||
    //   verificationdata.tNotes == ""
    // ) {
    //   errors.tNotes = "Field should not be empty";
    // }
    if (
      verificationdata.vExperienceRequired == undefined ||
      verificationdata.vExperienceRequired == ""
    ) {
      errors.vExperienceRequired = "Field should not be empty";
    }
    if (
      verificationdata.eStatus == undefined ||
      verificationdata.eStatus == ""
    ) {
      errors.eStatus = "Field should not be empty";
    }
    // if (
    //   verificationdata.iVendorId == undefined ||
    //   verificationdata.iVendorId == ""
    // ) {
    //   errors.iVendorId = "Field should not be empty";
    // }
    if (
      verificationdata.dBillingCycleDate == undefined ||
      verificationdata.dBillingCycleDate == ""
    ) {
      errors.dBillingCycleDate = "Field should not be empty";
    }
    if (
      verificationdata.fHireBillingAmount == undefined ||
      verificationdata.fHireBillingAmount == ""
    ) {
      errors.fHireBillingAmount = "Field should not be empty";
    }
    if (
      verificationdata.dconvertedDate == undefined ||
      verificationdata.dconvertedDate == ""
    ) {
      errors.dconvertedDate = "Field should not be empty";
    }
    if (
      verificationdata.vHireDuration == undefined ||
      verificationdata.vHireDuration == ""
    ) {
      errors.vHireDuration = "Field should not be empty";
    }
    if (
      verificationdata.fProjectCost == undefined ||
      verificationdata.fProjectCost == ""
    ) {
      errors.fProjectCost = "Field should not be empty";
    }
    if (
      verificationdata.fAtCostResourceToVendor == undefined ||
      verificationdata.fAtCostResourceToVendor == ""
    ) {
      errors.fAtCostResourceToVendor = "Field should not be empty";
    }
    if (
      verificationdata.vHireMonthlyBudget == undefined ||
      verificationdata.vHireMonthlyBudget == ""
    ) {
      errors.vHireMonthlyBudget = "Field should not be empty";
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

  // alert(inquiryid);

  const singleapi = async (Leadid) => {
    // alert(Leadid)
    const result = await fetch(
      `${process.env.REACT_APP_APIURL}/lead/${Leadid}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );

    localStorage.setItem("lead id", Leadid)
    const apiresponse = await result.json();
    const check = apiresponse.leadsfound;
    setData({ ...data, ...check[0] });
    setDoc(check)

  };
  useEffect(() => {
    singleapi(Leadid);
  }, []);
  useEffect(() => {
  }, [data]);



  const leadpost = (e) => {
    // e.preventDefault();
    // alert(JSON.stringify(data))
    const formData = new FormData();
    if (selectedFile != undefined) {
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append("requiredprojectfiles", selectedFile[i]);
      }
    }

    formData.append("iLeadid", Leadid);

    formData.append("eTypeOfProject", data.eTypeOfProject);
    formData.append("vTitleProject", data.vTitleProject);
    formData.append("fCostOfProject", data.fCostOfProject);
    formData.append("vTechnology", data.vTechnology);
    formData.append("vHireResource", data.vHireResource);
    formData.append("tNotes", data.tNotes);
    formData.append("iVendorId", data.iVendorId);
    formData.append("dBillingCycleDate", data.dBillingCycleDate);
    formData.append("fHireBillingAmount", data.fHireBillingAmount);
    formData.append("dconvertedDate", data.dconvertedDate);
    formData.append("fProjectCost", data.fProjectCost);
    formData.append("vExperienceRequired", data.vExperienceRequired);
    formData.append("vHireMonthlyBudget", data.vHireMonthlyBudget);
    formData.append("fAtCostResourceToVendor", data.fAtCostResourceToVendor);
    formData.append("vHireDuration", data.vHireDuration);
    formData.append("eStatus", data.eStatus);
    const apicall = () => {
      // alert(Leadid)
      // alert(JSON.stringify(formData));
      const apidata = axios({
        method: "put",
        url: `${process.env.REACT_APP_APIURL}/lead/${Leadid}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      // console.log(apidata);
      setSelectedFile(undefined);
      const respo = apidata.data;
      const check = respo?.Message;
      setUpdated(true)
      setIsUpdate(false)
    };
    try {
      if(isUpdate && Object.keys(error).length==0){
        apicall();
        singleapi(Leadid);
      }
      
    } catch (e) {
      // alert(e)
      // alert(e)
    }
    setSelectedFile(null);
  }


  const uploadimage = (e) => {
    setIsUpdate(true)

    setSelectedFile(e.target.files);
    // console.log(e.target.files)
  };




  const handleConvert = () => {
    navigate("/lead_project/" + `${Leadid}`)
  }




  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();


  useEffect(() => {
    // console.log(error)
  }, [error])

  return (
    <>


      <Sidebar IsSales={true} />

      <div className='set'>

        <div className="container my-3 body p-5">



          <div className="row ">





            <div className="col-12 text-center mb-2 ">
              <h1 className="title">Lead</h1>
            </div>



            <div>
              <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-2 d-inline-flex ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="" className="d-block">
                    Type of Project
                  </label>
                  <select
                    // {...register('eTypeOfProject', { required: true })}
                    className="form-control rounded-pill mt-2"
                    type="text"
                    name="eTypeOfProject"
                    placeholder="Type of Project"
                    value={data.eTypeOfProject}
                    onChange={handleChange}
                  // defaultValue={data.eTypeOfProject}
                  >
                    <option value="">Select</option>
                    <option value="Hire">Hire</option>
                    <option value="Project Basis">Project Basis</option>
                    <option value="Fix Cost - Less than 2 weeks">
                      Fix Cost - Less than 2 weeks
                    </option>
                  </select>
                  {error.eTypeOfProject ? <p style={{ color: "red" }}>{error.eTypeOfProject}</p> : ""}
                  {/* {errors.eTypeOfProject && <p className="error">Field is required</p>} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Title</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vTitle" value={inquiryform.vTitle} onChange={handleChange} placeholder="Inquiry Title" /> */}
                  <input
                    // {...register('vTitleProject', { required: true })}
                    className="form-control rounded-pill mt-2"
                    type="text"
                    name="vTitleProject"
                    placeholder="Project Title"
                    value={data.vTitleProject}
                    onChange={handleChange}
                  />
                  {error.vTitleProject ? <p style={{ color: "red" }}>{error.vTitleProject}</p> : ""}
                  {/* {errors.vTitleProject && <p className="error">{errors.vTitleProject.message}</p>} */}
                </div>
              </div>
              <div className="col-12 my-2 d-inline-flex ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="" className="d-block">
                    Technology
                  </label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vTechnology" value={inquiryform.vTechnology} onChange={handleChange} placeholder="Inquiry Technology" /> */}
                  {/* <input
                    // {...register('vTechnology', { required: true })}
                    type="text"
                    className="form-control rounded-pill mt-2"
                    name="vTechnology"
                    placeholder="Technology"
                    value={data.vTechnology}
                    onChange={handleChange}
                  /> */}
                    <select name="vTechnology" id=""
                // {...register('vTechnology', { required: true })}
                className="form-control rounded-pill mt-2" 
                onChange={handleChange}
                // value={data.vTechnology}
                >
                  <option value="">select</option>
                  {technologydropdown.map((e)=>{
                    return(
                      <option value={e} selected={data?.vTechnology.toLowerCase()==e.toLowerCase()?"selected":""}>{e}</option>
                    )
                  })}
                </select>
                  {error.vTechnology?<p style={{color:"red"}}>{error.vTechnology}</p>:""}
                  {/* {errors.vTechnology && <p className="error">Technology is required.</p>} */}
                </div>


                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Hire Resource</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vSourceOfInquiry" value={inquiryform.vSourceOfInquiry} onChange={handleChange} placeholder="Source of Inquiry" /> */}
                  <input
                    // {...register('vHireResource', { required: true })}
                    type="text"
                    className="form-control rounded-pill mt-2"
                    name="vHireResource"
                    placeholder="Hire Resource"
                    value={data.vHireResource}
                    onChange={handleChange}


                  />
                  {error.vHireResource?<p style={{color:"red"}}>{error.vHireResource}</p>:""}
                  {/* {errors.vHireResource && <p className="error">Hire Resource is required.</p>} */}
                </div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Billing Date</label>
                  {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                  <input
                    //  {...register('dBillingCycleDate', { required: true })}
                    type="date"
                    className="form-control rounded-pill mt-2"
                    name="dBillingCycleDate"
                    placeholder="Billing Date"
                    value={new Date(data.dBillingCycleDate).toLocaleDateString("en-CA")}
                    onChange={handleChange}
                  />
                  {error.dBillingCycleDate?<p style={{color:"red"}}>{error.dBillingCycleDate}</p>:""}
                  {/* {errors.dBillingCycleDate && <p className="error">Billing Cycle Date is required.</p>} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Billing Amount</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vHireDuration" value={inquiryform.vHireDuration} onChange={handleChange} placeholder="Hire Duration" /> */}
                  <input
                    //  {...register('fHireBillingAmount', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fHireBillingAmount"
                    placeholder="Billing Amount"
                    value={data.fHireBillingAmount}
                    onChange={handleChange}
                  />
                  {error.fHireBillingAmount?<p style={{color:"red"}}>{error.fHireBillingAmount}</p>:""}
                  {/* {errors.fHireBillingAmount && <p className="error">Billing Amount is required.</p>} */}
                </div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Converted Date</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vHireMonthlyBudget" value={inquiryform.vHireMonthlyBudget} onChange={handleChange} placeholder="Hire Monthly Budget" /> */}
                  <input
                    //  {...register('dconvertedDate', { required: true })}
                    type="date"
                    className="form-control rounded-pill mt-2"
                    name="dconvertedDate"
                    placeholder="Converted Date"
                    value={new Date(data.dconvertedDate).toLocaleDateString("en-CA")}
                    onChange={handleChange}
                  />
                  {error.dconvertedDate?<p style={{color:"red"}}>{error.dconvertedDate}</p>:""}
                  {/* {errors.dconvertedDate && <p className="error">Converted Date is required.</p>} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Project Cost</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    //  {...register('fProjectCost', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fProjectCost"
                    placeholder="Project Cost"
                    value={data.fProjectCost}
                    onChange={handleChange}
                  />
                  {error.fProjectCost?<p style={{color:"red"}}>{error.fProjectCost}</p>:""}
                  {/* {errors.fProjectCost && <p className="error">Project Cost is required.</p>} */}
                </div>
              </div>



              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Cost of Project</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    //  {...register('fCostOfProject', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fCostOfProject"
                    placeholder="Cost of Project"
                    value={data.fCostOfProject}
                    onChange={handleChange}
                  />
                  {error.fCostOfProject?<p style={{color:"red"}}>{error.fCostOfProject}</p>:""}
                  {/* {errors.fCostOfProject && <p className="error">Cost Of Project is required.</p>} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Monthly Budget</label>
                  <input
                    //  {...register('vHireMonthlyBudget', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="vHireMonthlyBudget"
                    placeholder="Monthly budget"
                    value={data.vHireMonthlyBudget}
                    onChange={handleChange}
                  />
                  {error.vHireMonthlyBudget?<p style={{color:"red"}}>{error.vHireMonthlyBudget}</p>:""}
                  {/* {errors.vHireMonthlyBudget && <p className="error">Hire Monthly Budget is required.</p>} */}
                  {/* <label htmlFor="">Notes</label>
                <input
              type="text"
              className="inputField col-12 mb-3"
              name="tNotes"
              placeholder="Notes"
              value={data.tNotes}
              onChange={handleChange}
            /> */}
                </div>
              </div>






              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Experienced Required</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    //  {...register('vExperienceRequired', { required: true })}
                    type="text"
                    className="form-control rounded-pill mt-2"
                    name="vExperienceRequired"
                    placeholder="Experienced Required"
                    value={data.vExperienceRequired}
                    onChange={handleChange}
                  />
                  {error.vExperienceRequired?<p style={{color:"red"}}>{error.vExperienceRequired}</p>:""}
                  {/* {errors.vExperienceRequired && <p className="error">Experience Required is required.</p>} */}
                </div>
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Cost of Resource</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    //  {...register('fAtCostResourceToVendor', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fAtCostResourceToVendor"
                    placeholder="Cost of Resource"
                    value={data.fAtCostResourceToVendor}
                    onChange={handleChange}
                  />
                  {error.fAtCostResourceToVendor?<p style={{color:"red"}}>{error.fAtCostResourceToVendor}</p>:""}
                  {/* {errors.fAtCostResourceToVendor && <p className="error">Cost Resource To Vendor Required is required.</p>} */}
                </div>


              </div>


              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Hire Duration</label>
                  <input
                    //  {...register('vHireDuration', { required: true })}
                    type="text"
                    className="form-control rounded-pill mt-2"
                    name="vHireDuration"
                    placeholder="Hire Duration"
                    value={data.vHireDuration}
                    onChange={handleChange}
                  />
                  {error.vHireDuration?<p style={{color:"red"}}>{error.vHireDuration}</p>:""}
                  {/* {errors.vHireDuration && <p className="error">Cost of Project Required is required.</p>} */}
                  {/* <label htmlFor="">Project Status</label>
                <select
                    className="formcontrol d-block dropdownWidth mb-3"
              type="text"
              name="eProjectStatus"
              placeholder="Type of Project"
              value={data.eProjectStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Lead">Lead</option>
              <option value="Project">Project</option>
             
            </select> */}
                </div>
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Status</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <select
                    // {...register('eStatus', { required: true })}
                    className="form-control rounded-pill mt-2"
                    type="text"
                    name="eStatus"
                    placeholder="Type of Project"
                    value={data.eStatus}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Converted">Converted</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rejected">Rejected</option>
                    <option value="OnHold">OnHold</option>
                    <option value="No Response From Client">No Response From Client</option>


                  </select>
                  {error.eStatus?<p style={{color:"red"}}>{error.eStatus}</p>:""}
                  {/* {errors.eStatus && <p className="error">Status Required is required.</p>} */}
                </div>


              </div>





              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  {/* <label htmlFor="">Notes</label>
                <input
              type="text"
              className="inputField col-12 mb-3"
              name="tNotes"
              placeholder="Notes"
              value={data.tNotes}
              onChange={handleChange}
            /> */}
                  <label htmlFor="">Document:</label><br />
                  <input
                    // {...register('requiredprojectfiles', { required: true })}
                    type="file"
                    className="form-control rounded-pill mt-2"
                    name="requiredprojectfiles"
                    id="upload"
                    accept="image/*"
                    onChange={uploadimage}
                    multiple
                  />
                  {/* {errors.requiredprojectfiles && <p className="error">Project files Required is required.</p>} */}
                </div>

                <div className="col-6  my-2 px-3">



                </div>






              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">

                {/* <div className="col-6  my-2 px-3">
                <label htmlFor="">Vendor id</label>
                <input
              type="number"
              className="inputField col-12 mb-3"
              name="iVendorId"
              placeholder="Cost of Project"
              value={data.iVendorId}
              onChange={handleChange}
            />
              </div> */}

                {/* 
              <div className="col-6  my-2  px-3">
                <label htmlFor="">Documents</label>
                <input
              type="file"
              className=" col-12 mb-3"
              name="requiredprojectfiles"
              id="upload"
              accept="image/*"
              onChange={uploadimage}
              multiple
            />
              </div> */}


              </div>




              <h3>Documents</h3>

              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Document Title:</label>

                  <br />
                  <span className="inputField col-12 mb-3">
                    {data.vDocumentTitle}
                  </span>
                  {/* <br /> */}
                  {/* <span className="text-primary">Click to Download</span> */}

                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Document Name:</label>
                  <span className="text-primary m-2">Click on file to view</span>

                  {
                    doc.map((e) => {
                      // console.log(e, "e is here")

                      // Documentname,Documenttitle
                      return (

                        <>

                          <br />

                          <a href={`${process.env.REACT_APP_APIURL}/${e.vdocumentName}`} target="_blank" className="inputField col-12 mb-3"> {e.vDocumentTitle}</a>

                        </>
                      )
                    })
                  }

                </div>





              </div>
              {/* <button onClick={() => handleClickD(`${process.env.REACT_APP_APIURL}/project/${projectid}`,'sample')}>
        Download the File</button> */}





            </div>
            <h5 style={{ color: "green", textAlign: "center" }}> {updated ? "Updated Successfully" : ""}</h5>
            {isUpdate ? <button type="submit" onClick={leadpost} className="mx-auto btn btn-outline-dark w-25">
              Update
            </button> :
              <button type="submit" onClick={leadpost} disabled className="mx-auto btn btn-outline-dark w-25">
                Update
              </button>
            }
            <button type="submit" onClick={handleConvert} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
              Convert it to Project
            </button>
            {/* <Link to={"/milestone/"+`${projectid}`} className="mx-auto btn btn-outline-dark w-25">
            Create Milestone
          </Link> */}

          </div>
        </div>
      </div>
    </>
  )


}
export default L_edit