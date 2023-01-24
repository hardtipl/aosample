// import React from "react";
// import Sidebar from "../sidebar/sidebar";
// import axios from "axios";
// import { useEffect,useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from 'react-hook-form';
// import { sourcelist,technologylist } from "../../constfiles";

// const Lead =()=>{

//   const navigate=  useNavigate()
//   const[modal,setModal] = useState(false)
//   const[message, setMessage] = useState(false)
//   const [Sourcelistdropdown,setSourcelistdropdown] = useState(sourcelist);
//   const [technologydropdown] = useState(technologylist);
//     const { inquiryid } = useParams();
//     const [selectedFile, setSelectedFile] = useState();
//     const [registrationform, Setregistrationform] = useState({
//       iiInquiryId: localStorage.getItem("id"),
//       iAccountHolderId: localStorage.getItem("userid"),
  
//       // vTitle: "",
//       // vTechnology: "",
//       // vSourceOfInquiry: "",
//       // iAccountHolderId: 0,
//       // eTypeofInquiry: "",
//       // tDescription: "",
//       // vInquiryFromClientName: "",
//       // vCountryName: "",
//       // vClientEmail: "",
//       // vClientSkpe: "",
//       // vClientMobile: "",
//       // fBudget: 0,
//       // mediafiles: "",
//     });
//     const singleapi = async () => {
//       // alert(Leadid)
//       const result = await fetch(
//         `${process.env.REACT_APP_APIURL}/inquiry/${inquiryid}`,
//         {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("Token")}`,
//           },
//         }
//       );
  
//       // localStorage.setItem("lead id", Leadid)
//       const apiresponse = await result.json();
//       const check = apiresponse.inquirylist;
//       Setregistrationform({ ...registrationform, ...check[0] });
//       // setDoc(check)
  
//     };
//     useEffect(() => {
//       singleapi(inquiryid);
//     }, []);
//     useEffect(() => {
//     }, [registrationform]);



  
//     const handelsubmit = (e) => {
  
//       // alert(JSON.stringify(selectedFile));
//       // console.log(selectedFile);
//       // alert("in handle submit");
//       const formData = new FormData();
//       if (selectedFile != undefined) {
        
//         for (let i = 0; i < selectedFile.length; i++) {
//           formData.append("requiredprojectfiles", selectedFile[i]);
//         }}
//         formData.append("iiInquiryId", inquiryid);
//         formData.append("eTypeOfProject", registrationform.eTypeOfProject);
//         formData.append("vTitleProject", registrationform.vTitleProject);
//         formData.append("fCostOfProject", registrationform.fCostOfProject);
//         formData.append("vTechnology", registrationform.vTechnology);
//         formData.append("vHireResource", registrationform.vHireResource);
//         // formData.append("iVendorId", registrationform.iVendorId);
//         formData.append("dBillingCycleDate", registrationform.dBillingCycleDate);
//         formData.append("fHireBillingAmount", registrationform.fHireBillingAmount);
//         formData.append("dconvertedDate", registrationform.dconvertedDate);
//         formData.append("fProjectCost", registrationform.fProjectCost);
//         formData.append("iAccountHolderId", registrationform.iAccountHolderId);
//         formData.append("tNotes", registrationform.tNotes);
//         formData.append("vHireDuration", registrationform.vHireDuration);
//         formData.append("vHireMonthlyBudget", registrationform.vHireMonthlyBudget);
//         formData.append("vExperienceRequired", registrationform.vExperienceRequired);
//         formData.append("fAtCostResourceToVendor", registrationform.fAtCostResourceToVendor);
//         formData.append("eProjectStatus", registrationform.eProjectStatus);
//         formData.append("eStatus", registrationform.eStatus);
  
//         const token = localStorage.getItem("Token");
  
//         // for (var value of formData.values()) {
//         //   console.log(value);
//         // }
  
//         const imageupdateapicall = async () => {
//           // alert("called image api");
//           let callingurl = `${process.env.REACT_APP_APIURL}/lead`;
//           // console.log(callingurl);
//           const returneddetail = await axios({
//             method: "post",
//             url: callingurl,
//             data: formData,
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("Token")}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           // console.log(returneddetail);
//           setSelectedFile(undefined);
//           const respo = returneddetail.data;
//           const check = respo?.Message;
//           // alert("check", JSON.stringify(check));

//           if(returneddetail.status == 200)
//           {
//             setModal(true)
//             setMessage("Converted into Lead")
//           }
//           else{
//             setModal(true)
//             setMessage("Something Went Wrong")
//           }
//         };
//         try {
//           imageupdateapicall();
//         } catch (e) {
//           // alert(e)
//         }
//         setSelectedFile(null);
      
//     };
//     // useEffect(() => {
//     //   console.log(selectedFile);
//     // }, [selectedFile]);
//     const uploadimage = (e) => {
//       // if (e.target.files[0].size <= 1000000 * 2) {
  
//       setSelectedFile(e.target.files);
//       // console.log(e.target.files);
//     };
  
//     const hadlechange = (e) => {
//       let objname = e.target?.name;
//       let value = e.target?.value;
//       Setregistrationform({ ...registrationform, [objname]: value });
//     };
  
//     // useEffect(() => {}, [registrationform]);

//     const handleBack=()=>{
//       navigate("/i_edit/" + `${inquiryid}`)
//     }

//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm();


//     const handleClose=()=>{
//       setModal(false)
//       navigate("/lead_list")
//     }

//     const handleToInquiries=()=>{
//       setModal(false)
//       navigate("/inquiry_list")
//     }

//     return(
//         <>

// <Sidebar IsSales={true}/> 

// <div className='set'>

//       <div className="container my-3 body p-5">
        
//         <button type="submit"  onClick={handleBack} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
//             Back to Inquiry
//           </button>
        
      
//         <div className="row ">


       


//         <div className="col-12 text-center mb-2 ">
//             <h1 className="title">Lead</h1>
//           </div>

          

//           <div>
//             <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-2 d-inline-flex ">
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="" className="d-block">
//                   Type of Project
//                 </label>
               

//                 {/* <select className="formcontrol d-block dropdownWidth mb-3" name="eTypeofInquiry" value={inquiryform.eTypeofInquiry} onChange={handleChange}>
//                         <option>Select</option>
//                         <option value="Hire">Hire</option>
//                         <option value="Project Basis">Project Basis</option>
//                         <option value="Fix Cost - Less than 2 Weeks">Fix Cost - Less than 2 Weeks</option>
//                     </select> */}



//                     <select
//                     {...register('eTypeOfProject', { required: true })}
//                     className="form-control rounded-pill mt-2"
//               type="text"
//               name="eTypeOfProject"
//               placeholder="Type of Project"
//               value={registrationform.eTypeofInquiry?registrationform.eTypeofInquiry:registrationform.eTypeOfProject}
//               onChange={hadlechange}
//             >
//               <option value="">Select</option>
//               <option value="Hire">Hire</option>
//               <option value="Project Basis">Project Basis</option>
//               <option value="Fix Cost - Less than 2 weeks">
//                 Fix Cost - Less than 2 weeks
//               </option>
//             </select>
//             {registrationform.eTypeOfProject==""||null?errors.eTypeOfProject && <p className="error">Select anyone</p>:""}
//               </div>

//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Title</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vTitle" value={inquiryform.vTitle} onChange={handleChange} placeholder="Inquiry Title" /> */}
//                 <input
//                 {...register('vTitleProject', { required: true })}
//                 className="form-control rounded-pill mt-2"
//               type="text"
//               name="vTitleProject"
//               placeholder="Project Title"
//               value={registrationform.vTitle?registrationform.vTitle:registrationform.vTitleProject}
//               onChange={hadlechange}
//             />
//             {registrationform.vTitleProject==""||null?errors.vTitleProject && <p className="error">Title is required</p>:""}
//               </div>
//             </div>
//             <div className="col-12 my-2 d-inline-flex ">
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="" className="d-block">
//                   Technology
//                 </label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vTechnology" value={inquiryform.vTechnology} onChange={handleChange} placeholder="Inquiry Technology" /> */}
//                 {/* <input
//                 {...register('vTechnology', { required: true })}
//               type="text"
//               className="form-control rounded-pill mt-2"
//               name="vTechnology"
//               placeholder="Technology"
//               value={registrationform.vTechnology}
//               onChange={hadlechange}
//             /> */}
//              <select name="vTechnology" id=""
//                 {...register('vTechnology', { required: true })}
//                 className="form-control rounded-pill mt-2" 
//                 onChange={hadlechange}
//                 value={registrationform.vTechnology}
//                 >
//                   <option value="">select</option>
//                   {technologydropdown.map((e)=>{
//                     return(
//                       <option value={e}>{e}</option>
//                     )
//                   })}
//                 </select>
//             {registrationform.vTechnology==""||null?errors.vTechnology && <p className="error">Technology is required</p>:""}
//               </div>

//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Hire Resource</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vSourceOfInquiry" value={inquiryform.vSourceOfInquiry} onChange={handleChange} placeholder="Source of Inquiry" /> */}
//                 <input
//                 {...register('vHireResource', { required: true })}
//               type="text"
//               className="form-control rounded-pill mt-2"
//               name="vHireResource"
//               placeholder="Hire Resource"
//               value={registrationform.vHireResource}
//               onChange={hadlechange}
//             />
//             {errors.vHireResource && <p className="error">Hire Resource is required</p>}
//               </div>
//             </div>
//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Billing Date</label>
//                 {/* <textarea className="inputField col-12 mb-3" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea> */}
//                 <input
//                 {...register('dBillingCycleDate', { required: true })}
//               type="date"
//               className="form-control rounded-pill mt-2"
//               name="dBillingCycleDate"
//               placeholder="Billing Date"
//               value={registrationform.dBillingCycleDate}
//               onChange={hadlechange}
//             />
//             {errors.dBillingCycleDate && <p className="error">Billing Date is required</p>}
//               </div>

//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Billing Amount</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vHireDuration" value={inquiryform.vHireDuration} onChange={handleChange} placeholder="Hire Duration" /> */}
//                 <input
//                 {...register('fHireBillingAmount', { required: true })}
//               type="number"
//               className="form-control rounded-pill mt-2"
//               name="fHireBillingAmount"
//               placeholder="Billing Amount"
//               value={registrationform.fHireBillingAmount}
//               onChange={hadlechange}
//             />
//             {errors.fHireBillingAmount && <p className="error">Billing Amount is required</p>}
//               </div>
//             </div>
//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Converted Date</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vHireMonthlyBudget" value={inquiryform.vHireMonthlyBudget} onChange={handleChange} placeholder="Hire Monthly Budget" /> */}
//                 <input
//                 {...register('dconvertedDate', { required: true })}
//               type="date"
//               className="form-control rounded-pill mt-2"
//               name="dconvertedDate"
//               placeholder="Converted Date"
//               value={registrationform.dconvertedDate}
//               onChange={hadlechange}
//             />
//              {errors.dconvertedDate && <p className="error">Converted Date is required </p>}
//               </div>

//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Project Cost</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <input
//                 {...register('fProjectCost', { required: true })}
//               type="number"
//               className="form-control rounded-pill mt-2"
//               name="fProjectCost"
//               placeholder="Project Cost"
//               value={registrationform.fProjectCost}
//               onChange={hadlechange}
//             />
//             {errors.fProjectCost && <p className="error">Project cost is required</p>}
//               </div>
//             </div>



//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
//             <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Cost of Project</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <input
//                 {...register('fCostOfProject', { required: true })}
//               type="number"
//               className="form-control rounded-pill mt-2"
//               name="fCostOfProject"
//               placeholder="Cost of Project"
//               value={registrationform.fCostOfProject}
//               onChange={hadlechange}
//             />
//             {errors.fCostOfProject && <p className="error">Cost Of Project is required</p>}
//               </div>

//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Notes</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <input
//                 {...register('tNotes', { required: true })}
//               type="text"
//               className="form-control rounded-pill mt-2"
//               name="tNotes"
//               placeholder="Notes"
//               value={registrationform.tNotes}
//               onChange={hadlechange}
//             />
//             {errors.tNotes && <p className="error">Notes is required</p>}
//               </div>
//             </div>



//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
           
//             <div className="col-6  my-2 px-3">
//             <label htmlFor="">Hire Duration</label>
//                 <input
//                 {...register('vHireDuration', { required: true })}
//               type="text"
//               className="form-control rounded-pill mt-2"
//               name="vHireDuration"
//               placeholder="Hire Duration"
//               value={registrationform.vHireDuration}
//               onChange={hadlechange}
//             />
//             {registrationform.vHireDuration==""||null?errors.vHireDuration && <p className="error">Hire Duration is required</p>:""}
               
//               </div>
           
//             {/* <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Vendor id</label>
//                 <input
//                  {...register('iVendorId', { required: true })}
//               type="number"
//               className="form-control rounded-pill mt-2"
//               name="iVendorId"
//               placeholder="Vendor id"
//               value={registrationform.iVendorId}
//               onChange={hadlechange}
//             />
//             {errors.iVendorId && <p className="error">VendorId is required</p>}
//               </div> */}
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Monthly Budget</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <input
//                  {...register('vHireMonthlyBudget', { required: true })}
//               type="number"
//               className="form-control rounded-pill mt-2"
//               name="vHireMonthlyBudget"
//               placeholder="Monthly budget"
//               value={registrationform.vHireMonthlyBudget}
//               onChange={hadlechange}
//             />
//              {registrationform.vHireMonthlyBudget==""||null?errors.vHireMonthlyBudget && <p className="error">Monthly budget is required</p>:""}
//               </div>

             
//             </div>


//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
//             <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Experienced Required</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <input
//                  {...register('vExperienceRequired', { required: true })}
//               type="text"
//               className="form-control rounded-pill mt-2"
//               name="vExperienceRequired"
//               placeholder="Experience Required"
//               value={registrationform.vExperienceRequired}
//               onChange={hadlechange}
//             />
//             {registrationform.vExperienceRequired==""||null?errors.vExperienceRequired && <p className="error">This Field is required</p>:""}
//               </div>
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Cost of Resource</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <input
//                 {...register('fAtCostResourceToVendor', { required: true })}
//               type="number"
//               className="form-control rounded-pill mt-2"
//               name="fAtCostResourceToVendor"
//               placeholder="Cost of Resource"
//               value={registrationform.fAtCostResourceToVendor}
//               onChange={hadlechange}
//             />
//             {errors.fAtCostResourceToVendor && <p className="error">Cost Of Resource is required</p>}
//               </div>

             
//             </div>


//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
           
//               <div className="col-6  my-2 px-3">
//                 <label htmlFor="">Status</label>
//                 {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
//                 <select
//                  {...register('eStatus', { required: true })}
//                     className="form-control rounded-pill mt-2"
//               type="text"
//               name="eStatus"
//               placeholder="Status"
//               value={registrationform.eStatus}
//               onChange={hadlechange}
//             >
//               <option value="">Select</option>
//               <option value="Converted">Converted</option>
//               <option value="InProgress">InProgress</option>
//               <option value="Cancelled">Cancelled</option>
//               <option value="Rejected">Rejected</option>
//               <option value="OnHold">OnHold</option>
//               <option value="No Response From Client">No Response From Client</option>
              
              
//             </select>
//             {registrationform.eStatus==""||null?errors.eStatus && <p className="error">Status is required</p>:""}
//               </div>

             
//             </div>



//             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
//             <div className="col-6  my-2 px-3">
//             <label htmlFor="">Documents</label>
//                 {/* <input type="file" className=" col-12 mb-3" /> */}
//                 {/* <input type="file" name="mediafiles" value={inquiryform.mediafiles} onChange={handleimage} className=" col-12 mb-3" multiple/> */}
//                 <input
//               type="file"
//               className="form-control rounded-pill mt-2"
//               name="requiredprojectfiles"
//               id="upload"
//               accept="image/*"
//               onChange={uploadimage}
//               multiple
//             />
              
//               </div>
//               <div className="col-6  my-2 ">
//               <div className="col-6  my-2  px-3">
              
//               </div>
//             </div>

             
//             </div>


           





          

          
         
//           </div>

//           <button type="submit"  onClick={handleSubmit(handelsubmit)} className="mx-auto btn btn-outline-dark w-25">
//             Submit
//           </button>

//             </div>
//             {modal?
//         <>
  
 
//   <div className='modal_'>
//         <div className='modalBody'>
          
//         {message}

//           <div className="modal-button">
//             {/* <button className="modal-btn">Ok</button> */}
//             <button className="modal-btn" onClick={handleToInquiries}>Go to Inquiries</button>
//             <button className="modal-btn" onClick={handleClose}>Check it</button>
//           </div>
//         </div>
    
//     </div>
//         </>

//         :""}
//             </div>
//             </div>
//         </>
//     )
// }

// export default Lead

import React from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { sourcelist,technologylist } from "../../constfiles";

const Lead =()=>{

  const navigate=  useNavigate()
  const [error, setError] = useState({})
  const[modal,setModal] = useState(false)
  const[message, setMessage] = useState(false)
  const [Sourcelistdropdown,setSourcelistdropdown] = useState(sourcelist);
  const [technologydropdown] = useState(technologylist);
    const { inquiryid } = useParams();
    const [selectedFile, setSelectedFile] = useState();
    const [registrationform, Setregistrationform] = useState({
      iiInquiryId: localStorage.getItem("id"),
      iAccountHolderId: localStorage.getItem("userid"),
  
      // vTitle: "",
      // vTechnology: "",
      // vSourceOfInquiry: "",
      // iAccountHolderId: 0,
      // eTypeofInquiry: "",
      // tDescription: "",
      // vInquiryFromClientName: "",
      // vCountryName: "",
      // vClientEmail: "",
      // vClientSkpe: "",
      // vClientMobile: "",
      // fBudget: 0,
      // mediafiles: "",
    });


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
      if (Object.keys(registrationform).length != 0) {
        setError(isvalid(registrationform));
      } else {
        return;
      }
    }, [registrationform]);


    const singleapi = async () => {
      // alert(Leadid)
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
  
      // localStorage.setItem("lead id", Leadid)
      const apiresponse = await result.json();
      const check = apiresponse.inquirylist;
      try{
        const updatestateobj={
          vTitleProject:check[0].vTitle,
          vTechnology:check[0].vTechnology,
          vHireDuration:check[0].vHireDuration,
          vHireMonthlyBudget:check[0].vHireMonthlyBudget,
          vExperienceRequired:check[0].vExperienceRequired,
          eStatus:check[0].eStatus,
          eTypeOfProject:check[0].eTypeofInquiry
        }
        Setregistrationform({ ...registrationform, ...check[0],...updatestateobj });
      }
      catch(e){
        console.log(e)
      }
      // Setregistrationform({ ...registrationform, ...check[0] });
      // setDoc(check)
  
    };
    useEffect(() => {
      singleapi(inquiryid);
    }, []);
    useEffect(() => {
    }, [registrationform]);



  
    const handelsubmit = (e) => {
  
      // alert(JSON.stringify(selectedFile));
      // console.log(selectedFile);
      // alert("in handle submit");
      const formData = new FormData();
      if (selectedFile != undefined) {
        
        for (let i = 0; i < selectedFile.length; i++) {
          formData.append("requiredprojectfiles", selectedFile[i]);
        }}
        formData.append("iiInquiryId", inquiryid);
        formData.append("eTypeOfProject", registrationform.eTypeOfProject);
        formData.append("vTitleProject", registrationform.vTitleProject);
        formData.append("fCostOfProject", registrationform.fCostOfProject);
        formData.append("vTechnology", registrationform.vTechnology);
        formData.append("vHireResource", registrationform.vHireResource);
        // formData.append("iVendorId", registrationform.iVendorId);
        formData.append("dBillingCycleDate", registrationform.dBillingCycleDate);
        formData.append("fHireBillingAmount", registrationform.fHireBillingAmount);
        formData.append("dconvertedDate", registrationform.dconvertedDate);
        formData.append("fProjectCost", registrationform.fProjectCost);
        formData.append("iAccountHolderId", registrationform.iAccountHolderId);
        formData.append("tNotes", registrationform.tNotes);
        formData.append("vHireDuration", registrationform.vHireDuration);
        formData.append("vHireMonthlyBudget", registrationform.vHireMonthlyBudget);
        formData.append("vExperienceRequired", registrationform.vExperienceRequired);
        formData.append("fAtCostResourceToVendor", registrationform.fAtCostResourceToVendor);
        formData.append("eProjectStatus", registrationform.eProjectStatus);
        formData.append("eStatus", registrationform.eStatus);
  
        const token = localStorage.getItem("Token");
  
        // for (var value of formData.values()) {
        //   console.log(value);
        // }
  
        const imageupdateapicall = async () => {
          // alert("called image api");
          let callingurl = `${process.env.REACT_APP_APIURL}/lead`;
          // console.log(callingurl);
          const returneddetail = await axios({
            method: "post",
            url: callingurl,
            data: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "multipart/form-data",
            },
          });
          // console.log(returneddetail);
          setSelectedFile(undefined);
          const respo = returneddetail.data;
          const check = respo?.Message;
          // alert("check", JSON.stringify(check));

          if(returneddetail.status == 200)
          {
            setModal(true)
            setMessage("Converted into Lead")
          }
          else{
            setModal(true)
            setMessage("Something Went Wrong")
          }
        };
        try {
          if (Object.keys(error).length == 0) {
          imageupdateapicall();
          }
        } catch (e) {
          // alert(e)
        }
        setSelectedFile(null);
      
    };
    // useEffect(() => {
    //   console.log(selectedFile);
    // }, [selectedFile]);
    const uploadimage = (e) => {
      // if (e.target.files[0].size <= 1000000 * 2) {
  
      setSelectedFile(e.target.files);
      // console.log(e.target.files);
    };
  
    const hadlechange = (e) => {
      let objname = e.target?.name;
      let value = e.target?.value;
      Setregistrationform({ ...registrationform, [objname]: value });
    };
  
    // useEffect(() => {}, [registrationform]);

    const handleBack=()=>{
      navigate("/i_edit/" + `${inquiryid}`)
    }

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();


    const handleClose=()=>{
      setModal(false)
      navigate("/lead_list")
    }

    const handleToInquiries=()=>{
      setModal(false)
      navigate("/inquiry_list")
    }

    return(
        <>

<Sidebar IsSales={true}/> 

<div className='set'>

      <div className="container my-3 body p-5">
        
        <button type="submit"  onClick={handleBack} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Back to Inquiry
          </button>
        
      
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
              value={registrationform.eTypeOfProject}              
              onChange={hadlechange}
            >
              <option value="">Select</option>
              <option value="Hire">Hire</option>
              <option value="Project Basis">Project Basis</option>
              <option value="Fix Cost - Less than 2 weeks">
                Fix Cost - Less than 2 weeks
              </option>
            </select>
            {error.eTypeOfProject ? <p style={{ color: "red" }}>{error.eTypeOfProject}</p> : ""}
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
              value={registrationform.vTitle?registrationform.vTitle:registrationform.vTitleProject}
              onChange={hadlechange}
            />
            {error.vTitleProject ? <p style={{ color: "red" }}>{error.vTitleProject}</p> : ""}
              </div>
            </div>
            <div className="col-12 my-2 d-inline-flex ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Technology
                </label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vTechnology" value={inquiryform.vTechnology} onChange={handleChange} placeholder="Inquiry Technology" /> */}
                {/* <input
                {...register('vTechnology', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="vTechnology"
              placeholder="Technology"
              value={registrationform.vTechnology}
              onChange={hadlechange}
            /> */}
             <select name="vTechnology" id=""
                // {...register('vTechnology', { required: true })}
                className="form-control rounded-pill mt-2" 
                onChange={hadlechange}
                value={registrationform.vTechnology}
                >
                  <option value="">select</option>
                  {technologydropdown.map((e)=>{
                    return(
                      <option value={e}>{e}</option>
                    )
                  })}
                </select>
                {error.vTechnology ? <p style={{ color: "red" }}>{error.vTechnology}</p> : ""}
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
              value={registrationform.vHireResource}
              onChange={hadlechange}
            />
            {error.vHireResource ? <p style={{ color: "red" }}>{error.vHireResource}</p> : ""}
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
              value={registrationform.dBillingCycleDate}
              onChange={hadlechange}
            />
            {error.dBillingCycleDate ? <p style={{ color: "red" }}>{error.dBillingCycleDate}</p> : ""}
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
              value={registrationform.fHireBillingAmount}
              onChange={hadlechange}
            />
            {error.fHireBillingAmount ? <p style={{ color: "red" }}>{error.fHireBillingAmount}</p> : ""}
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
              value={registrationform.dconvertedDate}
              onChange={hadlechange}
            />
            {error.dconvertedDate ? <p style={{ color: "red" }}>{error.dconvertedDate}</p> : ""}
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
              value={registrationform.fProjectCost}
              onChange={hadlechange}
            />
            {error.fProjectCost ? <p style={{ color: "red" }}>{error.fProjectCost}</p> : ""}
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
              value={registrationform.fCostOfProject}
              onChange={hadlechange}
            />
            {error.fCostOfProject ? <p style={{ color: "red" }}>{error.fCostOfProject}</p> : ""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Notes</label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                <input
                // {...register('tNotes', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="tNotes"
              placeholder="Notes"
              value={registrationform.tNotes}
              onChange={hadlechange}
            />
            {error.tNotes ? <p style={{ color: "red" }}>{error.tNotes}</p> : ""}
              </div>
            </div>



            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
           
            <div className="col-6  my-2 px-3">
            <label htmlFor="">Hire Duration</label>
                <input
                // {...register('vHireDuration', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="vHireDuration"
              placeholder="Hire Duration"
              value={registrationform.vHireDuration}
              onChange={hadlechange}
            />
            {error.vHireDuration ? <p style={{ color: "red" }}>{error.vHireDuration}</p> : ""}
               
              </div>
           
            {/* <div className="col-6  my-2 px-3">
                <label htmlFor="">Vendor id</label>
                <input
                 {...register('iVendorId', { required: true })}
              type="number"
              className="form-control rounded-pill mt-2"
              name="iVendorId"
              placeholder="Vendor id"
              value={registrationform.iVendorId}
              onChange={hadlechange}
            />
            {errors.iVendorId && <p className="error">VendorId is required</p>}
              </div> */}
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Monthly Budget</label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                <input
                //  {...register('vHireMonthlyBudget', { required: true })}
              type="number"
              className="form-control rounded-pill mt-2"
              name="vHireMonthlyBudget"
              placeholder="Monthly budget"
              value={registrationform.vHireMonthlyBudget}
              onChange={hadlechange}
            />
            {error.vHireMonthlyBudget ? <p style={{ color: "red" }}>{error.vHireMonthlyBudget}</p> : ""}
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
              placeholder="Experience Required"
              value={registrationform.vExperienceRequired}
              onChange={hadlechange}
            />
            {error.vExperienceRequired ? <p style={{ color: "red" }}>{error.vExperienceRequired}</p> : ""}
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
              value={registrationform.fAtCostResourceToVendor}
              onChange={hadlechange}
            />
            {error.fAtCostResourceToVendor ? <p style={{ color: "red" }}>{error.fAtCostResourceToVendor}</p> : ""}
              </div>

             
            </div>


            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
           
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Status</label>
                {/* <input type="text" className="inputField col-12 mb-3" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" /> */}
                <select
                //  {...register('eStatus', { required: true })}
                    className="form-control rounded-pill mt-2"
              type="text"
              name="eStatus"
              placeholder="Status"
              value={registrationform.eStatus}
              onChange={hadlechange}
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

             
            </div>



            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
            <div className="col-6  my-2 px-3">
            <label htmlFor="">Documents</label>
                {/* <input type="file" className=" col-12 mb-3" /> */}
                {/* <input type="file" name="mediafiles" value={inquiryform.mediafiles} onChange={handleimage} className=" col-12 mb-3" multiple/> */}
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
              <div className="col-6  my-2 ">
              <div className="col-6  my-2  px-3">
              
              </div>
            </div>

             
            </div>


           





          

          
         
          </div>

          <button type="submit"  onClick={handleSubmit(handelsubmit)} className="mx-auto btn btn-outline-dark w-25">
            Submit
          </button>

            </div>
            {modal?
        <>
  
 
  <div className='modal_'>
        <div className='modalBody'>
          
        {message}

          <div className="modal-button">
            {/* <button className="modal-btn">Ok</button> */}
            <button className="modal-btn" onClick={handleToInquiries}>Go to Inquiries</button>
            <button className="modal-btn" onClick={handleClose}>Check it</button>
          </div>
        </div>
    
    </div>
        </>

        :""}
            </div>
            </div>
        </>
    )
}

export default Lead