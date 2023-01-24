import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import fileDownload from 'js-file-download'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import { sourcelist, technologylist } from "../../constfiles";



const P_edit = () => {
  const [selectusers, setselectusers] = useState()
  const [alreadypresent, setAlreadypresent] = useState()
  const [Sourcelistdropdown, setSourcelistdropdown] = useState(sourcelist);
  const [technologydropdown] = useState(technologylist);
  const [dev, setDev] = useState([{
    "id": 0,
    "vname": ""
  }])

  const handleselectusers = () => {
    setselectusers()

  }

  const { projectid } = useParams();
  const check = localStorage.setItem("projectid", projectid)
  const posting = () => {
    if (selectusers.length != 0) {
      console.log("list ofusers to send", selectusers)
      const passingids = selectusers?.map((e) => {
        console.log(e)
        return e.value
      })
      console.log(passingids)
      const passdatatocreateam = {
        iProjectid: projectid,
        userlist: passingids
      }
      axios.post(`${process.env.REACT_APP_APIURL}/projectteam/createteam`, passdatatocreateam, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
      }).then(() => {
        console.log(respo => (respo.data))


      }).catch(e => {
        let nameofuseralreadyexites = []
        const reusedmembers = e.response.data.slice(35)
        const gettedmember = reusedmembers.split(",")
        let username = gettedmember.map((e) => {
          selectusers.filter((h) => {
            if (h.value === e) {
              nameofuseralreadyexites.push(h.label)
              return h
            }
          })
        })
        setAlreadypresent(nameofuseralreadyexites)
      })
    }
  }


  let errorMessage = ""
  const [isUpdate, setIsUpdate] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState({})
  const [gettedoption, setGettedoption] = useState([{}])
  const [createTeam, setCreateTeam] = useState(false)
  const [cancel, setCancel] = useState(false)

  const navigate = useNavigate();
  const [doc, setDoc] = useState([])

  const [selectedFile, setSelectedFile] = useState();
  // const [updateForm, SetUpdateForm] = useState({});
  // const { iProjectId } = useParams();

  const [milestone, setMilestone] = useState({
    iProjectId: projectid,
  });
  // alert(inquiryid);
  const [data, setData] = useState({
    // iiInquiryId: inquiryid,
    iprojectid: projectid,
    vTechnology: ""
  });

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
    setIsUpdate(true)
    setUpdated(false)
  };

  const devpost = () => {
    axios.get("http://192.168.5.21:7000/developer", {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "`Bearer ${localStorage.getItem('Token')"
      }
    }).then(respo => (respo.data)).then(res => {
      setDev(res.developerlist)
      setIsUpdate(false)

    })
  }

  useEffect(() => {
    devpost()
  }, [])
  useEffect(() => {

    alreadypresent?.map((e) => {
      errorMessage += `${e} ,`
    })
    console.log("Already present", alreadypresent, errorMessage)
  }, [alreadypresent])
  useEffect(() => {
    let noofdeveloers = []
    dev.map(e => {
      noofdeveloers.push({
        value: e.id,
        label: e.vname
      })
      setGettedoption(noofdeveloers)

    })
  }, [dev])

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

  const singleapi = async (projectid) => {
    // alert("in call");
    const result = await fetch(
      `${process.env.REACT_APP_APIURL}/projects/${projectid}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    // localStorage.setItem("project id", projectid);
    // localStorage.getItem("inquiry id", inquiryid);

    const apiresponse = await result.json();
    const check = apiresponse.userid;
    setData({ ...data, ...check[0] });
    setDoc(check)
    // console.log(check);
  };
  useEffect(() => {
    singleapi(projectid);
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data]);










  const inquiryData = (e) => {
    // e.preventDefault();
    // alert(JSON.stringify(data))
    const formData = new FormData();
    if (selectedFile != undefined) {
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append("requiredprojectfiles", selectedFile[i]);
      }
    }

    formData.append("iprojectid", projectid);
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
      // alert(JSON.stringify(formData));
      const apidata = axios({
        method: "put",
        url: `${process.env.REACT_APP_APIURL}/projects/${projectid}`,
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
      if (isUpdate && Object.keys(error).length == 0) {
        apicall();
        posting()
        singleapi(projectid);
      }

    } catch (e) {
      // alert(e)
      // alert(e)
    }
    setSelectedFile(null);
  }


  const uploadimage = (e) => {
    setIsUpdate(true)
    // setUpdated(false)

    setSelectedFile(e.target.files);
    // console.log(e.target.files)
  };


  const handleCreate = () => {
    setCreateTeam(true)
    // setIsUpdate(true)

  }

  const handleCancel = () => {
    setCreateTeam(false)
    // setIsUpdate(false)

  }


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();


  useEffect(() => {
    // console.log(error)
  }, [error])
  useEffect(() => {
    setIsUpdate(true)
    setUpdated(false)
    setAlreadypresent()
    console.log("from user got", selectusers)
  }, [selectusers])



  return (
    <>

      <Sidebar IsSales={true} />

      <div className='set'>

        <div className="container my-3 body p-5">

          {/* <button type="submit"  onClick={handleBack} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Back 
          </button> */}


          <div className="row ">





            <div className="col-12 text-center mb-2 ">
              <h1 className="title">PROJECT</h1>
            </div>



            <div>
              <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-2 d-inline-flex ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="" className="d-block">
                    Type of Project
                  </label>


                  {/* <select className="formcontrol d-block dropdownWidth mb-3" name="eTypeofInquiry" value={inquiryform.eTypeofInquiry} onChange={handleChange}>
                        <option>Select</option>
                        <option value="Hire">Hire</option>
                        <option value="Project Basis">Project Basis</option>
                        <option value="Fix Cost - Less than 2 Weeks">Fix Cost - Less than 2 Weeks</option>
                    </select> */}



                  <select
                    // {...register('eTypeOfProject', { required: true })}
                    className="form-control rounded-pill mt-2"
                    type="text"
                    name="eTypeOfProject"
                    placeholder="Type of Project"
                    value={data.eTypeOfProject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Hire">Hire</option>
                    <option value="Project Basis">Project Basis</option>
                    <option value="Fix Cost - Less than 2 weeks">
                      Fix Cost - Less than 2 weeks
                    </option>
                  </select>
                  {error.eTypeOfProject ? <p style={{ color: "red" }}>{error.eTypeOfProject}</p> : ""}

                  {/* {data.eTypeOfProject==""||null||undefined?errors.eTypeOfProject && <p className="error">Type is required.</p>:""} */}
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

                  {/* {data.vTitleProject==""||null||undefined?errors.vTitleProject && <p className="error">Title is required.</p>:""} */}
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
                    {technologydropdown.map((e) => {
                      // console.log(typeof data.vTechnology,data.vTechnology,data.vTechnology?.toLowerCase()==e.toLowerCase())
                      return (
                        <option value={e} selected={data?.vTechnology.toLowerCase() == e.toLowerCase() ? "selected" : ""}>{e}</option>
                      )
                    })}
                  </select>
                  {error.vTechnology ? <p style={{ color: "red" }}>{error.vTechnology}</p> : ""}
                  {/* {data.vTechnology==""||null||undefined?errors.vTechnology && <p className="error">Technology is required.</p>:""} */}
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
                  {error.vHireResource ? <p style={{ color: "red" }}>{error.vHireResource}</p> : ""}
                  {/* {data.vHireResource==""||null||undefined?errors.vHireResource && <p className="error">HireResource is required.</p>:""} */}
                </div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Billing Date</label>
                  {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                  <input
                    // {...register('dBillingCycleDate', { required: true })}
                    type="date"
                    className="form-control rounded-pill mt-2"
                    name="dBillingCycleDate"
                    placeholder="Billing Date"
                    value={new Date(data.dBillingCycleDate).toLocaleDateString("en-CA")}
                    onChange={handleChange}
                  />
                  {error.dBillingCycleDate ? <p style={{ color: "red" }}>{error.dBillingCycleDate}</p> : ""}
                  {/* {data.dBillingCycleDate==""||null||undefined?errors.dBillingCycleDate && <p className="error">Billing Cycle Date is required.</p>:""} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Billing Amount</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vHireDuration" value={inquiryform.vHireDuration} onChange={handleChange} placeholder="Hire Duration" /> */}
                  <input
                    // {...register('fHireBillingAmount', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fHireBillingAmount"
                    placeholder="Billing Amount"
                    value={data.fHireBillingAmount}
                    onChange={handleChange}
                  />
                  {error.fHireBillingAmount ? <p style={{ color: "red" }}>{error.fHireBillingAmount}</p> : ""}
                  {/* {data.fHireBillingAmount==""||null||undefined?errors.fHireBillingAmount && <p className="error">Hire Billing VAmount is required.</p>:""} */}
                </div>

              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Converted Date</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vHireMonthlyBudget" value={inquiryform.vHireMonthlyBudget} onChange={handleChange} placeholder="Hire Monthly Budget" /> */}
                  <input
                    // {...register('dconvertedDate', { required: true })}
                    type="date"
                    className="form-control rounded-pill mt-2"
                    name="dconvertedDate"
                    placeholder="Converted Date"
                    value={new Date(data.dconvertedDate).toLocaleDateString("en-CA")}
                    onChange={handleChange}
                  />
                  {error.dconvertedDate ? <p style={{ color: "red" }}>{error.dconvertedDate}</p> : ""}
                  {/* {data.dconvertedDate==""||null||undefined?errors.dconvertedDate && <p className="error">Converted Date is required.</p>:""} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Project Cost</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    // {...register('fProjectCost', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fProjectCost"
                    placeholder="Project Cost"
                    value={data.fProjectCost}
                    onChange={handleChange}
                  />
                  {error.fProjectCost ? <p style={{ color: "red" }}>{error.fProjectCost}</p> : ""}
                  {/* {data.fProjectCost==""||null||undefined?errors.fProjectCost && <p className="error">Project Cost is required.</p>:""} */}
                </div>

              </div>



              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Cost of Project</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    // {...register('fCostOfProject', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fCostOfProject"
                    placeholder="Cost of Project"
                    value={data.fCostOfProject}
                    onChange={handleChange}
                  />
                  {error.fCostOfProject ? <p style={{ color: "red" }}>{error.fCostOfProject}</p> : ""}
                  {/* {data.fCostOfProject==""||null||undefined?errors.fCostOfProject && <p className="error">Cost Of Project is required.</p>:""} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Monthly Budget</label>
                  <input
                    // {...register('vHireMonthlyBudget', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="vHireMonthlyBudget"
                    placeholder="Monthly budget"
                    value={data.vHireMonthlyBudget}
                    onChange={handleChange}
                  />
                  {error.vHireMonthlyBudget ? <p style={{ color: "red" }}>{error.vHireMonthlyBudget}</p> : ""}
                  {/* {data.vHireMonthlyBudget==""||null||undefined?errors.vHireMonthlyBudget && <p className="error">Hire Monthly Budget is required.</p>:""} */}
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
                    // {...register('vExperienceRequired', { required: true })}
                    type="text"
                    className="form-control rounded-pill mt-2"
                    name="vExperienceRequired"
                    placeholder="Experienced Required"
                    value={data.vExperienceRequired}
                    onChange={handleChange}
                  />
                  {error.vExperienceRequired ? <p style={{ color: "red" }}>{error.vExperienceRequired}</p> : ""}
                  {/* {data.vExperienceRequired==""||null||undefined?errors.vExperienceRequired && <p className="error">Experience Required is required.</p>:""} */}
                </div>
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Cost of Resource</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <input
                    // {...register('fAtCostResourceToVendor', { required: true })}
                    type="number"
                    className="form-control rounded-pill mt-2"
                    name="fAtCostResourceToVendor"
                    placeholder="Cost of Resource"
                    value={data.fAtCostResourceToVendor}
                    onChange={handleChange}
                  />
                  {error.fAtCostResourceToVendor ? <p style={{ color: "red" }}>{error.fAtCostResourceToVendor}</p> : ""}

                  {/* {data.fAtCostResourceToVendor==""||null||undefined?errors.fAtCostResourceToVendor && <p className="error">Cost Resource To Vendor Required is required.</p>:""} */}
                </div>

              </div>


              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Project Status</label>
                  {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                  <select
                    // {...register('eProjectStatus', { required: true })}
                    className="form-control rounded-pill mt-2"
                    type="text"
                    name="eProjectStatus"
                    placeholder="Type of Project"
                    value={data.eProjectStatus}
                    onChange={handleChange}
                    disabled
                  >
                    <option value="">Select</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Lead">Lead</option>
                    <option value="Project">Project</option>

                  </select>
                  {error.eProjectStatus ? <p style={{ color: "red" }}>{error.eProjectStatus}</p> : ""}
                  {/* {data.eProjectStatus==""||null||undefined?errors.eProjectStatus && <p className="error">Project Status is required.</p>:""} */}
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
                  {error.eStatus ? <p style={{ color: "red" }}>{error.eStatus}</p> : ""}
                  {/* {data.eStatus==""||null||undefined?errors.eStatus && <p className="error">Status Required is required.</p>:""} */}
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
                  {error.vHireDuration ? <p style={{ color: "red" }}>{error.vHireDuration}</p> : ""}
                  {/* {data.vHireDuration==""||null||undefined?errors.vHireDuration && <p className="error">Hire Duration Required is required.</p>:""} */}
                </div>

                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Document:</label><br />
                  <input
                    type="file"
                    className="form-control rounded-pill mt-2"
                    name="requiredprojectfiles"
                    id="upload"
                    accept="image/*"
                    onChange={uploadimage}
                    multiple
                  />


                </div>





              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">

                <div className="col-6  my-2 px-3">
                  {!createTeam ? <button type="submit" onClick={handleCreate} style={{ marginTop: "30px" }} className="mx-auto  btn btn-outline-dark w-50">
                    Add Team Member
                  </button> :
                    <button type="submit" onClick={handleCancel} style={{ marginTop: "30px" }} className="mx-auto  btn btn-outline-dark w-50">
                      cancel
                    </button>
                  }

                </div>




                {createTeam && <div className="col-6  my-2  px-3">
                  <label htmlFor="" className="form-label select-label">Create a Team</label>

                  <Select
                    defaultValue={selectusers}
                    isMulti
                    options={gettedoption}
                    onChange={setselectusers}
                  />{
                    console.log("from the html", errorMessage)
                  }
                  {alreadypresent?.length > 0 &&

                    <>
                      <p style={{ color: "red" }}>{JSON.stringify(alreadypresent + " is already added , Please remove it first to add new members")}</p>
                    </>
                  }
                  {/* {!alreadypresent?.length<0&&
                   
                   <>
                  <p style={{color:"green"}}>Added</p>
                   </>
                  } */}

                </div>}




              </div>




              <h3>Documents</h3>

              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
                <div className="col-6  my-2 px-3">
                  <label htmlFor="">Document Title:</label>

                  <br />
                  <span className="inputField col-12 mb-3">
                    {data.Documenttitle}
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

                          <a href={`${process.env.REACT_APP_APIURL}/${e.Documentname}`} target="_blank" className="inputField col-12 mb-3" rel="noreferrer"> {e.Documenttitle}</a>

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
            {isUpdate ? <button type="submit" onClick={() => {
              inquiryData()
            }} className="mx-auto btn btn-outline-dark w-25">
              Update
            </button> :
              <button type="submit" disabled onClick={inquiryData} className="mx-auto btn btn-outline-dark w-25">
                Update
              </button>
            }
            {/* <Link to={"/cmodule"} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Modules
          </Link> */}
            {/* <Link to={"/milestone/"+`${projectid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Create Milestone
          </Link> */}
            {/* <Link to={"/mlist/"+`${projectid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Modules
          </Link> */}
            <Link to={"/mlist/" + `${projectid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
              MileStones / Modules
            </Link>

          </div>
        </div>
      </div>
    </>
  )


}
export default P_edit