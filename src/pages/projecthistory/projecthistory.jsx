import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { sourcelist,technologylist } from "../../constfiles";
const Iview=()=>{

  const[isUpdate,setIsUpdate] = useState(false)
  const[updated, setUpdated]= useState(false)
  const [error, setError] = useState({})
    const navigate = useNavigate();
    const { projectid } = useParams();
    const [selectedFile, setSelectedFile] = useState();
    const [Sourcelistdropdown,setSourcelistdropdown] = useState(sourcelist);
    const [technologydropdown] = useState(technologylist);
    const [doc,setDoc] = useState([])
    // const [updateForm, SetUpdateForm] = useState({});
    const { inquiryid } = useParams();
    // alert(inquiryid);
    const [data, setData] = useState({
      inquiryid: inquiryid,
    });     
    let handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setData({ ...data, [name]: value });
      setIsUpdate(true)
    };
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
      const apiresponse = await result.json();
      const check = apiresponse.inquirylist;
      setData({ ...data, ...check[0] });
      setDoc(check)
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
                if(isUpdate && Object.keys(error).length==0){
                  apicall();
                  singleapi(inquiryid);
                }
                
                
              } catch (e) {
                  
              }
              setSelectedFile(null);
      }
      
       
      const uploadimage = (e) => {
        // singleapi(inquiryid);
        setIsUpdate(true)
        setSelectedFile(e.target.files);
        // console.log(e.target.files)
       
      };
     
  
    const handlenavi = () => {
      navigate(  "/project/" + `${inquiryid}`   );
    };
    const handleLead=()=>{
      navigate(  "/lead/" + `${inquiryid}`  );
    }
    useEffect(()=>{
// console.log(error)
    },[error])
    return(
        <>


          {/* <Header/> */}
          <Sidebar IsSales={true}/> 
         <div className='set'>
      <div className="container my-3 body p-5">
        <div className="row ">
          <div className="col-12 text-center mb-2 ">
            <h1 className="title">INQUIRY</h1>
          </div>

          {/* <div className="col-12 text-left mt-5 ">
            <h3 className="title">Project Details</h3>
          </div> */}

          <div>
            <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex">
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Type of Inquire
                </label>
               

                {/* <select className="formcontrol d-block dropdownWidth mb-3" name="eTypeofInquiry" value={inquiryform.eTypeofInquiry} onChange={handleChange}>
                        <option>Select</option>
                        <option value="Hire">Hire</option>
                        <option value="Project Basis">Project Basis</option>
                        <option value="Fix Cost - Less than 2 Weeks">Fix Cost - Less than 2 Weeks</option>
                    </select> */}



                    <select
            className="form-control rounded-pill mt-2"
            type="text"
            name="eTypeofInquiry"
            placeholder="Type of Inquiry"
            value={data.eTypeofInquiry}
            onChange={handleChange}
            disabled
          >
            <option value="">Select</option>
            <option value="Hire">Hire</option>
            <option value="Project Basis">Project Basis</option>
            <option value="Fix Cost - Less than 2 weeks">
              Fix Cost - Less than 2 weeks
            </option>
          </select>
          {error.eTypeofInquiry?<p style={{color:"red"}}>{error.eTypeofInquiry}</p>:""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Title</label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vTitle" value={inquiryform.vTitle} onChange={handleChange} placeholder="Inquiry Title" /> */}
                <input
                className="form-control rounded-pill mt-2"
            type="text"
            placeholder=""
            name="vTitle"
            value={data.vTitle}
            disabled
            onChange={handleChange}
          />
          {error.vTitle?<p style={{color:"red"}}>{error.vTitle}</p>:""}
              </div>
            </div>
            <div className="col-12 my-2 d-inline-flex ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Technology
                </label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vTechnology" value={inquiryform.vTechnology} onChange={handleChange} placeholder="Inquiry Technology" /> */}
                {/* <input
            type="text"
            className="form-control rounded-pill mt-2"
            placeholder=""
            name="vTechnology"
            value={data.vTechnology}
            onChange={handleChange}
          /> */}
           <select name="vTechnology" id=""
                // {...register('vTechnology', { required: true })}
                className="form-control rounded-pill mt-2" 
                onChange={handleChange}
                disabled
                value={data.vTechnology}
                >
                  <option value="">select</option>
                  {technologydropdown.map((e)=>{
                    return(
                      <option value={e}>{e}</option>
                    )
                  })}
                </select>
          {error.vTechnology?<p style={{color:"red"}}>{error.vTechnology}</p>:""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Source of Inquiry</label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vSourceOfInquiry" value={inquiryform.vSourceOfInquiry} onChange={handleChange} placeholder="Source of Inquiry" /> */}
                {/* <input
            type="text"
            className="form-control rounded-pill mt-2"
            placeholder=""
            name="vSourceOfInquiry"
            value={data.vSourceOfInquiry}
            onChange={handleChange}
          /> */}
           <select name="vSourceOfInquiry" id=""
                // {...register('vSourceOfInquiry', { required: true })}
                className="form-control rounded-pill mt-2"
                onChange={handleChange}
                disabled
                value={data.vSourceOfInquiry}
                >
                  <option value="">select</option>
                {Sourcelistdropdown.map((e)=>{
console.log("here is source lisr",e)
                  return <option value={e}>{e}</option>
                })
                }
                </select>
          {error.vSourceOfInquiry?<p style={{color:"red"}}>{error.vSourceOfInquiry}</p>:""}
              </div>
            </div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Description</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
            type="text"
            className="form-control rounded-pill mt-2"
            placeholder=""
            disabled
            name="tDescription"
            value={data.tDescription}
            onChange={handleChange}
          />
          {error.tDescription?<p style={{color:"red"}}>{error.tDescription}</p>:""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Hire Duration</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
            type="text"
            className="form-control rounded-pill mt-2"
            placeholder=""
            disabled
            name="vHireDuration"
            value={data.vHireDuration}
            onChange={handleChange}
          />
          {error.vHireDuration?<p style={{color:"red"}}>{error.vHireDuration}</p>:""}
              </div>


          


        </div>




        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Hire Monthly Budget</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
            type="text"
            disabled
            className="form-control rounded-pill mt-2"
            placeholder=""
            name="vHireMonthlyBudget"
            value={data.vHireMonthlyBudget}
            onChange={handleChange}
          />
          {error.vHireMonthlyBudget?<p style={{color:"red"}}>{error.vHireMonthlyBudget}</p>:""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Experience Required</label>
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
            type="text"
            disabled
            className="form-control rounded-pill mt-2"
            placeholder=""
            name="vExperienceRequired"
            value={data.vExperienceRequired}
            onChange={handleChange}
          />
          {error.vExperienceRequired?<p style={{color:"red"}}>{error.vExperienceRequired}</p>:""}
              </div>


          


        </div>


        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Document:</label><br />
                {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
                <input
                className="form-control rounded-pill mt-2"
            type="file"
            disabled
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
              disabled
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
                </div> 

          


        </div>


        <h3 >Documents</h3>
         <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Document Title:</label>

                <br />
                 <span  className="inputField col-12 mb-3">
                {data.Documenttitle}
              </span>
              {/* <br /> */}
               {/* <span className="text-primary">Click to Download</span> */}
               
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Document Name:</label>
                <span className="text-primary m-2">Click on file to view</span>

                {
  doc.length>0?doc.map((e)=>{
// console.log(e,"e is here")

// Documentname,Documenttitle
return (
  
  <>
   
 <br />
 
  <a href={`${process.env.REACT_APP_APIURL}/${e.Documentname}`} target="_blank" className="inputField col-12 mb-3"> {e.Documenttitle}</a>
  
  </>
)
  }):""
}

              </div>


          


        </div> 


        





        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
              {/* <label htmlFor="">Company Name</label>
                <AsyncSelect
                        className="mb-3"
                        cacheOptions
                        defaultOptions
                        value={selectedvalue}
                        getOptionLabel={e => e.vCompanyName}
                        getOptionValue={e => e.id}
                        loadOptions={fetchData}
                        onInputChange={handleInputChange}
                        onChange={handlechange}
                    />

                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Company
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
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
                              className="form-check-input"
                              type="radio"
                              id="flexRadioDefault1"
                              onChange={handleChange} value="Consultant" name="eClienttype"
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
                              className="form-check-input"
                              type="radio"
                              id="flexRadioDefault2"
                              onChange={handleChange} value="Company" name="eClienttype"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                            >
                              Company
                            </label>
                          </div>
                        </div>
                        <label htmlFor="">Company Name</label>
                        <input type="text" className="inputField col-12 mb-3"name="vCompanyName" value={vendorform.vCompanyName} onChange={handleChange} />
                        <label htmlFor="">Address</label>
                        <input type="text" className="inputField col-12 mb-3"   name="vAddress" value={vendorform.vAddress} onChange={handleChange}/>
                        <label htmlFor="">Email</label>
                        <input type="text" className="inputField col-12 mb-3" name="vEmail" value={vendorform.vEmail} onChange={handleChange}/>
                        <label htmlFor="">Vendor Name</label>
                        <input type="text" className="inputField col-12 mb-3" name="vVendorName" value={vendorform.vVendorName} onChange={handleChange}/>
                        <label htmlFor="">Mobile</label>
                        <input type="text" className="inputField col-12 mb-3" name="vMobile" value={vendorform.vMobile} onChange={handleChange}/>
                        <label htmlFor="">Notes</label>
                        <input type="text" className="inputField col-12 mb-3" name="tNotes" value={vendorform.tNotes} onChange={handleChange}/>
                        <label htmlFor="">City</label>
                        <input type="text" className="inputField col-12 mb-3"  name="vCity" value={vendorform.vCity} onChange={handleChange}/>
                        <label htmlFor="">State</label>
                        <input type="text" className="inputField col-12 mb-3" name="vState" value={vendorform.vState} onChange={handleChange}/>
                       
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" onClick={AddVendor} className="btn btn-outline-dark">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>*/}
              </div> 

              <div className="col-6  my-2 px-3">
              {/* <label htmlFor="">Company Name</label>
                <AsyncSelect
                        className="mb-3"
                        cacheOptions
                        defaultOptions
                        value={selectedvalue}
                        getOptionLabel={e => e.vCompanyName}
                        getOptionValue={e => e.id}
                        loadOptions={fetchData}
                        onInputChange={handleInputChange}
                        onChange={handlechange}
                    />

                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Company
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
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
                              className="form-check-input"
                              type="radio"
                              id="flexRadioDefault1"
                              onChange={handleChange} value="Consultant" name="eClienttype"
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
                              className="form-check-input"
                              type="radio"
                              id="flexRadioDefault2"
                              onChange={handleChange} value="Company" name="eClienttype"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                            >
                              Company
                            </label>
                          </div>
                        </div>
                        <label htmlFor="">Company Name</label>
                        <input type="text" className="inputField col-12 mb-3"name="vCompanyName" value={vendorform.vCompanyName} onChange={handleChange} />
                        <label htmlFor="">Address</label>
                        <input type="text" className="inputField col-12 mb-3"   name="vAddress" value={vendorform.vAddress} onChange={handleChange}/>
                        <label htmlFor="">Email</label>
                        <input type="text" className="inputField col-12 mb-3" name="vEmail" value={vendorform.vEmail} onChange={handleChange}/>
                        <label htmlFor="">Vendor Name</label>
                        <input type="text" className="inputField col-12 mb-3" name="vVendorName" value={vendorform.vVendorName} onChange={handleChange}/>
                        <label htmlFor="">Mobile</label>
                        <input type="text" className="inputField col-12 mb-3" name="vMobile" value={vendorform.vMobile} onChange={handleChange}/>
                        <label htmlFor="">Notes</label>
                        <input type="text" className="inputField col-12 mb-3" name="tNotes" value={vendorform.tNotes} onChange={handleChange}/>
                        <label htmlFor="">City</label>
                        <input type="text" className="inputField col-12 mb-3"  name="vCity" value={vendorform.vCity} onChange={handleChange}/>
                        <label htmlFor="">State</label>
                        <input type="text" className="inputField col-12 mb-3" name="vState" value={vendorform.vState} onChange={handleChange}/>
                       
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" onClick={AddVendor} className="btn btn-outline-dark">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>


          


        </div>
       
      </div>
      {/* <h5 style={{color:"green", textAlign:"center"}}> {updated?"Updated Successfully":""}</h5> */}
     {/* {isUpdate? <button type="submit" onClick={inquiryData}  className="mx-auto btn btn-outline-dark w-25">
            Update
          </button>:
          <button type="submit" onClick={inquiryData} disabled  className="mx-auto btn btn-outline-dark w-25">
          Update
        </button>
          
          }
          <button type="submit" onClick={handlenavi}  className="mx-auto  text-white bg-dark btn btn-outline-dark w-25">
            Convert into Project
          </button>
          <button type="submit" onClick={handleLead}  className="mx-auto  text-white bg-dark btn btn-outline-dark w-25">
            Convert into Lead
          </button> */}
          <div className="text-center">
          <button type="submit" onClick={() => navigate(-1)}  className=" bg-dark text-white btn btn-outline-dark w-25">
            Back
          </button>
          </div>
    </div>
    </div>
    </div>
        </>
    )
}

export default Iview