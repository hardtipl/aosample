import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { sourcelist, technologylist } from "../../constfiles";
const Iedit = () => {

  const [isUpdate, setIsUpdate] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState({})
  const navigate = useNavigate();
  const { projectid } = useParams();
  const [selectedFile, setSelectedFile] = useState();
  const [Sourcelistdropdown, setSourcelistdropdown] = useState(sourcelist);
  const [technologydropdown] = useState(technologylist);
  const [doc, setDoc] = useState([])
  // const [updateForm, SetUpdateForm] = useState({});
  const { inquiryid } = useParams();
  // alert(inquiryid);
  const [data, setData] = useState({
    inquiryid: inquiryid,
  });

  // alert(inquiryid)

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
    setIsUpdate(true)
  };




  const isvalid = (verificationdata) => {
    let errors = {};
    if (
      verificationdata.eTypeofInquiry == undefined ||
      verificationdata.eTypeofInquiry == ""
    ) {
      errors.eTypeofInquiry = "Field should not be empty";
    }
    if (
      verificationdata.vTitle == undefined ||
      verificationdata.vTitle == ""
    ) {
      errors.vTitle = "Field should not be empty";
    }
    if (
      verificationdata.vTechnology == undefined ||
      verificationdata.vTechnology == ""
    ) {
      errors.vTechnology = "Field should not be empty";
    }
    if (
      verificationdata.vSourceOfInquiry == undefined ||
      verificationdata.vSourceOfInquiry == ""
    ) {
      errors.vSourceOfInquiry = "Field should not be empty";
    }
    if (
      verificationdata.tDescription == undefined ||
      verificationdata.tDescription == ""
    ) {
      errors.tDescription = "Field should not be empty";
    }
    if (
      verificationdata.vHireDuration == undefined ||
      verificationdata.vHireDuration == ""
    ) {
      errors.vHireDuration = "Field should not be empty";
    }
    if (
      verificationdata.vHireMonthlyBudget == undefined ||
      verificationdata.vHireMonthlyBudget == ""
    ) {
      errors.vHireMonthlyBudget = "Field should not be empty";
    }
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

    return errors;
  };

  useEffect(() => {
    if (Object.keys(data).length != 0) {
      setError(isvalid(data));
    } else {

      return;
    }
  }, [data]);

  const singleapi = async (inquiryid) => {
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
    // localStorage.setItem("id" ,inquiryid)
    const apiresponse = await result.json();
    const check = apiresponse.inquirylist;
    console.log(check)
    setData({ ...data, ...check[0] });
    setDoc(check)
    // alert(JSON.stringify(check));
    // console.log(check);
  };





  useEffect(() => {
    singleapi(inquiryid);


  }, []);

  useEffect(() => {

  }, [data]);




  const inquiryData = (e) => {
    const formData = new FormData();
    if (selectedFile != undefined) {
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append("mediafiles", selectedFile[i]);
      }
    }
    formData.append("inquiryid", inquiryid);
    const token = localStorage.getItem("Token");

    formData.append("eTypeofInquiry", data.eTypeofInquiry);
    formData.append("vTitle", data.vTitle);
    formData.append("vTechnology", data.vTechnology);
    formData.append("vSourceOfInquiry", data.vSourceOfInquiry);
    formData.append("tDescription", data.tDescription);
    formData.append("vHireDuration", data.vHireDuration);
    formData.append("vHireMonthlyBudget", data.vHireMonthlyBudget);
    formData.append("vExperienceRequired", data.vExperienceRequired);
    // formData.append("vendorid", data.vendorid);
    formData.append("eStatus", data.eStatus);

    const apicall = () => {
      // alert(JSON.stringify(formData));
      const apidata = axios({
        method: "put",
        url: `${process.env.REACT_APP_APIURL}/inquiry/${inquiryid}`,
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
      // console.log(error)
      if (isUpdate && Object.keys(error).length == 0) {
        apicall();
        singleapi(inquiryid);
      }


    } catch (e) {

    }
    setSelectedFile(null);
  }


  const uploadimage = (e) => {
    setIsUpdate(true)
    setSelectedFile(e.target.files);
  };


  const handlenavi = () => {
    navigate("/project/" + `${inquiryid}`);
  };
  const handleLead = () => {
    navigate("/lead/" + `${inquiryid}`);
  }
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
              <h1 className="title">INQUIRY</h1>
            </div>
            <div className="row">
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Type of Inquire
                </label>
                <select
                  className="form-control rounded-pill mt-2"
                  type="text"
                  name="eTypeofInquiry"
                  placeholder="Type of Inquiry"
                  value={data.eTypeofInquiry}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Hire">Hire</option>
                  <option value="Project Basis">Project Basis</option>
                  <option value="Fix Cost - Less than 2 weeks">
                    Fix Cost - Less than 2 weeks
                  </option>
                </select>
                {error.eTypeofInquiry ? <p style={{ color: "red" }}>{error.eTypeofInquiry}</p> : ""}
              </div>
             { data.eTypeofInquiry==="Hire"&&<div className="col-6  my-2 px-3">
                <label htmlFor="">Type of Hire</label>
                <select
                  className="form-control rounded-pill mt-2"
                  type="text"
                  name="eTypeofHire"
                  placeholder="Type of Inquiry"
                  value={data.eTypeofHire}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Hourly">Hourly</option>
                </select>
                {error.vTitle ? <p style={{ color: "red" }}>{error.vTitle}</p> : ""}
              </div>}

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Title</label>
                <input
                  className="form-control rounded-pill mt-2"
                  type="text"
                  placeholder=""
                  name="vTitle"
                  value={data.vTitle}
                  onChange={handleChange}
                />
                {error.vTitle ? <p style={{ color: "red" }}>{error.vTitle}</p> : ""}
              </div>
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Technology
                </label>

                <select name="vTechnology" id=""
                  className="form-control rounded-pill mt-2"
                  onChange={handleChange}
                  value={data.vTechnology}
                >
                  <option value="">select</option>
                  {technologydropdown.map((e) => {
                    return (
                      <option value={e}>{e}</option>
                    )
                  })}
                </select>
                {error.vTechnology ? <p style={{ color: "red" }}>{error.vTechnology}</p> : ""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Source of Inquiry</label>
                <select name="vSourceOfInquiry" id=""
                  className="form-control rounded-pill mt-2"
                  onChange={handleChange}
                  value={data.vSourceOfInquiry}
                >
                  <option value="">select</option>
                  {Sourcelistdropdown.map((e) => {
                    return <option value={e}>{e}</option>
                  })
                  }
                </select>
                {error.vSourceOfInquiry ? <p style={{ color: "red" }}>{error.vSourceOfInquiry}</p> : ""}
              </div>
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Description</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
                  type="text"
                  className="form-control rounded-pill mt-2"
                  placeholder=""
                  name="tDescription"
                  value={data.tDescription}
                  onChange={handleChange}
                />
                {error.tDescription ? <p style={{ color: "red" }}>{error.tDescription}</p> : ""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Hire Duration</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
                  type="text"
                  className="form-control rounded-pill mt-2"
                  placeholder=""
                  name="vHireDuration"
                  value={data.vHireDuration}
                  onChange={handleChange}
                />
                {error.vHireDuration ? <p style={{ color: "red" }}>{error.vHireDuration}</p> : ""}
              </div>
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Hire Monthly Budget</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
                  type="text"
                  className="form-control rounded-pill mt-2"
                  placeholder=""
                  name="vHireMonthlyBudget"
                  value={data.vHireMonthlyBudget}
                  onChange={handleChange}
                />
                {error.vHireMonthlyBudget ? <p style={{ color: "red" }}>{error.vHireMonthlyBudget}</p> : ""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Experience Required</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
                  type="text"
                  className="form-control rounded-pill mt-2"
                  placeholder=""
                  name="vExperienceRequired"
                  value={data.vExperienceRequired}
                  onChange={handleChange}
                />
                {error.vExperienceRequired ? <p style={{ color: "red" }}>{error.vExperienceRequired}</p> : ""}
              </div>
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Document:</label><br />
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
                  className="form-control rounded-pill mt-2"
                  type="file"
                  name="mediafiles"
                  id="upload"
                  accept="image/*"
                  onChange={uploadimage}
                  multiple
                />

              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Status</label>

                <select
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
              </div>
              <h3 >Documents</h3>
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
                    doc.length > 0 ? doc.map((e) => {
                      // console.log(e,"e is here")

                      // Documentname,Documenttitle
                      return (
                        <>
                          <br />
                          <a href={`${process.env.REACT_APP_APIURL}/${e.Documentname}`} target="_blank" className="inputField col-12 mb-3"> {e.Documenttitle}</a>

                        </>
                      )
                    }) : ""
                  }
                </div>
              </div>
            </div>
            <h5 style={{ color: "green", textAlign: "center" }}> {updated ? "Updated Successfully" : ""}</h5>
            {isUpdate ? <button type="submit" onClick={inquiryData} className="mx-auto btn btn-outline-dark w-25">
              Update
            </button> :
              <button type="submit" onClick={inquiryData} disabled className="mx-auto btn btn-outline-dark w-25">
                Update
              </button>

            }
            <button type="submit" onClick={handlenavi} className="mx-auto  text-white bg-dark btn btn-outline-dark w-25">
              Convert into Project
            </button>
            <button type="submit" onClick={handleLead} className="mx-auto  text-white bg-dark btn btn-outline-dark w-25">
              Convert into Lead
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Iedit