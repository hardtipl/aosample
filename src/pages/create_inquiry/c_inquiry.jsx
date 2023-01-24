import axios from 'axios'
import AsyncSelect from 'react-select/async'
import { useCallback } from 'react'
import React, { useState , useEffect } from 'react'
import "./c_inquiry.css"
import Header from '../../header/header'
import Sidebar from '../sidebar/sidebar'
import Select from 'react-select/async'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import {sourcelist ,technologylist} from "../../constfiles"

export default function Inquiry() {

const navigate = useNavigate()

  const refreshPage=()=> {
    window.location.reload(false);
  }
    // <AsyncSearchBar SetContactPerson={SetContactPerson} />
    // const [ok, setOk] = useState()
    const [vendorAdded, setVendorAdded]=useState(false)
    const [vendorMessage, setVendorMessage]=useState(false)
    const [personAdded, setPersonAdded]=useState(false)
    const [personMessage, setPersonMessage]=useState(false)
    const [btn,setbtn] = useState(0)


    const[modal,setModal] = useState(false)
    const[message, setMessage] = useState(false)
    const [err, setError] = useState({
    })
    const [verr, setvError] = useState({})
    const [inquiryform, SetInquiryForm] = useState({
      // vTechnology:""
        // iAccountHolderId: localStorage.getItem("Account Holder ID"),
    })
    const [media, SetMedia] = useState({})
    const [vendorform, SetVendorForm] = useState({
        vCompanyName: "",
        vAddress: "",
        vEmail: "",
        vVendorName: "",
        vMobile: "",
        tNotes: "",
        eClienttype: "Company",
        vCity: "",
        vState: ""
    })
    const [compid, setcompid] = useState([]);
    const [conatctinputvalue, setConatctValue] = useState([]);
    const [selectedvalue, SetSelectedValue] = useState(null);
    const [Sourcelistdropdown,setSourcelistdropdown] = useState(sourcelist);
    const [technologydropdown] = useState(technologylist);
    const [id, setId] = useState('');
    const [contactperson, SetContactPerson] = useState({
        // iCompanyid: selectedvalue,
        // iAccountHolder: localStorage.getItem("Account Holder ID"),
        // vName: "",
        // vMobile: "",
        // vSkype: "",
        // vEmail: ""
    })


    const handleInputChange = value => {
     
        setcompid(value);
    }
    
    const handleinput = value => {
      
        setConatctValue(value);
    }

    useEffect(() => {
        fetchConatctData();
    }, [id])



    const isvalid = (verificationdata) => {
      let errors = {};

      let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      let contactRegex = /^[0-9]{10}$/gm;
     
 
      if (
        verificationdata.vName == undefined ||
        verificationdata.vName == ""
      ) {
        errors.vName = "Field should not be empty";
      } 
      if (
        verificationdata.vMobile == undefined ||
        verificationdata.vMobile == ""
      ) {
        errors.vMobile = "Field should not be empty";
      } else if (
        !contactRegex.test(verificationdata.vMobile)
      ) {
        errors.vMobile = "Contact is not valid ";
      }
      if (
        verificationdata.vSkype == undefined ||
        verificationdata.vSkype == ""
      ) {
        errors.vSkype = "Field should not be empty";
      } 
      if (
        verificationdata.vEmail == undefined ||
        verificationdata.vEmail == ""
      ) {
        errors.vEmail = "Field should not be empty";
      } else if (
        !emailRegex.test(verificationdata.vEmail)
      ) {
        errors.vEmail = "Email is not valid ";
      }
     
      return errors;
    };

   
    useEffect(()=>{
// console.log("form the err useeffect",err)
const contactValues=Object.values(contactperson)
if(Object.keys(err)==0&&err&&contactValues[0]!=""){
  hereistoaddcontact()
  // alert("calling add contact person api")
}
    },[err])


    // vCompanyName: "",
    // vAddress: "",
    // vEmail: "",
    // vVendorName: "",
    // vMobile: "",
    // tNotes: "",
    // eClienttype: "",
    // vCity: "",
    // vState: ""

    const isvalidCompany = (verificationdata) => {
      let errors = {};
      let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      let contactRegex = /^[0-9]{10}$/gm;
 
      if (
        verificationdata.vCompanyName == undefined ||
        verificationdata.vCompanyName == ""
      ) {
        errors.vCompanyName = "Field should not be empty";
      } 
      if (
        verificationdata.vAddress == undefined ||
        verificationdata.vAddress == ""
      ) {
        errors.vAddress = "Field should not be empty";
      } 
      if (
        verificationdata.vEmail == undefined ||
        verificationdata.vEmail == ""
      ) {
        errors.vEmail = "Field should not be empty";
      } else if (
        !emailRegex.test(verificationdata.vEmail)
      ) {
        errors.vEmail = "Email is not valid ";
      }
      if (
        verificationdata.vVendorName == undefined ||
        verificationdata.vVendorName == ""
      ) {
        errors.vVendorName = "Field should not be empty";
      } 
      if (
        verificationdata.vMobile == undefined ||
        verificationdata.vMobile == ""
      ) {
        errors.vMobile = "Field should not be empty";
      } else if (
        !contactRegex.test(verificationdata.vMobile)
      ) {
        errors.vMobile = "Contact is not valid ";
      }
      if (
        verificationdata.tNotes == undefined ||
        verificationdata.tNotes == ""
      ) {
        errors.tNotes = "Field should not be empty";
      } 
      if (
        verificationdata.eClienttype == undefined ||
        verificationdata.eClienttype == ""
      ) {
        errors.eClienttype = "Field should not be empty";
      } 
      if (
        verificationdata.vCity == undefined ||
        verificationdata.vCity == ""
      ) {
        errors.vCity = "Field should not be empty";
      } 
      if (
        verificationdata.vState == undefined ||
        verificationdata.vState == ""
      ) {
        errors.vState = "Field should not be empty";
      } 

     
    
      return errors;
    };

    useEffect(()=>{
      // console.log("form the err useeffect",verr,vendorform)
      const vendorvalues=Object.values(vendorform)
      if(Object.keys(verr)==0&&verr&&vendorvalues[0]!=""){
        
        hereistoaddvendor()
        // alert("calling add contact person api")
      }
          },[verr])


  

  
   

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

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        // console.log(value,name)
        SetInquiryForm({ ...inquiryform, [name]: value })
        SetVendorForm({ ...vendorform, [name]: value })
        SetContactPerson({ ...contactperson, [name]: value })
        // console.log(name,value)
        setVendorAdded(true)
        setPersonAdded(true)
        setPersonMessage(false)
        setVendorMessage(false)
    }
    
    const AddVendor = async(e) => {
      e.preventDefault()
      setvError(isvalidCompany(vendorform))
    }
    const hereistoaddvendor=async()=>{
        const data = {
            ...vendorform
        }
        const apidata = await axios({
            method: "post",
            url: `${process.env.REACT_APP_APIURL}/vendor/addvendor`,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
            },
        })
        const respo = await apidata.data;
        const check = await respo?.Message;
        fetchData()
        setVendorAdded(false)

        if(apidata.status==200){
          // setVendorAdded(true)
          setVendorMessage("Added")
        }
    }
    useEffect(()=>{
      fetchData()
    },[])
    
    const AddContactPerson =  (e) => {
      e.preventDefault()
      setError(isvalid(contactperson))
    }
    const hereistoaddcontact=async()=>{

        const data = {
            ...contactperson,  iCompanyid: selectedvalue,
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
        const respo = await apidata.data;
        const check = await respo?.Message;
        fetchConatctData(selectedvalue)
        setPersonAdded(false)
        if(apidata.status==200){
          // setVendorAdded(true)
          setPersonMessage("Added")
        }

        
    }
    
    const handleimage = (e) => {
        SetMedia(e.target.files);
    }
    
    const inquiryData = (e) => {
      // e.target.reset();
        // alert( JSON.stringify(inquiryform));
        const formData = new FormData();
        if (media != undefined) {
            for (let i = 0; i < media.length; i++) {
                formData.append("mediafiles", media[i]);
            }
          }
            
            formData.append("vTitle", inquiryform.vTitle);
            formData.append("vTechnology", inquiryform.vTechnology);
            formData.append("vSourceOfInquiry", inquiryform.vSourceOfInquiry);
            // formData.append("iAccountHolderId", inquiryform.iAccountHolderId);
            formData.append("eTypeofInquiry", inquiryform.eTypeofInquiry);
            formData.append("tDescription", inquiryform.tDescription);
            formData.append("vHireDuration", inquiryform.vHireDuration);
            formData.append("vHireMonthlyBudget", inquiryform.vHireMonthlyBudget);
            formData.append("vExperienceRequired", inquiryform.vExperienceRequired);
            formData.append("vendorid", inquiryform.vendorid);
            const apicall = async() => {
      
                const apidata = await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_APIURL}/inquiry`,
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                SetMedia(undefined);
              //  console.log(apidata)
                const respo = await apidata.data;
                const check = respo?.Message;
                if(apidata.status == 200)
                {
                  setModal(true)
                  setMessage("Inquiry Created")
                }
                else{
                  setModal(true)
                  setMessage("Something Went Wrong")
                }
            };
            try {
                apicall();
              
            } catch (e) {
                // alert(e)
            }
            SetMedia(null);
    }

    const handleClose=()=>{
      setModal(false)
      refreshPage()
      
    }


    const handleVendorReset=()=>{
      setError({})
      SetContactPerson({
        vName: "",
        vMobile: "",
        vSkype: "",
        vEmail: ""
      })
    }

    const handleCompanyReset=()=>{
      setVendorMessage(false)
      setvError({})
      SetVendorForm({
        vCompanyName: "",
        vAddress: "",
        vEmail: "",
        vVendorName: "",
        vMobile: "",
        tNotes: "",
        eClienttype: "Company",
        vCity: "",
        vState: ""
      })
    }
console.log("array of string as sourcelist",sourcelist,technologydropdown)
    // const aquaticCreatures = ok?.map(e => ({ label: e.vCompanyName, value: e.id }));
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

const handleToDashboard = ()=>{
  if(localStorage.getItem("usertype")=="Sales"){
    navigate("/sales_dash")
}
else if(localStorage.getItem("usertype")=="Admin"){
    navigate("/admind")
}
else if(localStorage.getItem("usertype")=="Developer"){
  navigate("/devdash")
}
}

    return (

        <>
         {/* <Header/> */}
        {/* <Sidebar IsSales={true}/>  */}
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
            <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-2 d-inline-flex ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Type of Inquire
                </label>
               

                <select 
                
                className="form-control rounded-pill mt-2"
                {...register('eTypeofInquiry', { required: true })}
                name="eTypeofInquiry" value={inquiryform.eTypeofInquiry} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Hire">Hire</option>
                        <option value="Project Basis">Project Basis</option>
                        <option value="Fix Cost - Less than 2 Weeks">Fix Cost - Less than 2 Weeks</option>
                    </select>
                    {inquiryform.eTypeofInquiry == null?errors.eTypeofInquiry && <p className="error">Field is required.</p>:""}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Title</label>
                <input 
                 {...register('vTitle', { required: true })}
                type="text" className="form-control rounded-pill mt-2" name="vTitle" value={inquiryform.vTitle} onChange={handleChange} placeholder="Inquiry Title" />
              {inquiryform.vTitle == null?errors.vTitle && <p className="error">Field is required.</p>:""}
              </div>
            </div>
            <div className="col-12 my-2 d-inline-flex ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="" className="d-block">
                  Technology
                </label>
              
                 <select name="vTechnology" id=""
                {...register('vTechnology', { required: true })}
                className="form-control rounded-pill mt-2" 
                onChange={handleChange}
                // value={inquiryform.vTechnology}
                >
                  <option value="">select</option>
                  {technologydropdown.map((e)=>{
                    return(
                      <option value={e} >{e}</option>
                    )
                  })}
                </select>
                {inquiryform.vTechnology == null?errors.vTechnology && <p className="error">Field is required.</p>:""}
                {/* <input 
                 {...register('vTechnology', { required: true })}
                type="text" className="form-control rounded-pill mt-2" name="vTechnology" value={inquiryform.vTechnology} onChange={handleChange} placeholder="Inquiry Technology" />
 {inquiryform.vTechnology == null?errors.vTechnology && <p className="error">Field is required.</p>:""} */}
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Source of Inquiry</label>
                <select name="vSourceOfInquiry" id=""
                {...register('vSourceOfInquiry', { required: true })}
                className="form-control rounded-pill mt-2"
                onChange={handleChange}
                >
                  <option value="">select</option>
                {Sourcelistdropdown.map((e)=>{
console.log("here is source lisr",e)
                  return <option value={e}>{e}</option>
                })
                }
                </select>
                {inquiryform.vSourceOfInquiry == null?errors.vSourceOfInquiry && <p className="error">Field is required.</p>:""}
                {/* <input 
                {...register('vSourceOfInquiry', { required: true })}
                type="text" className="form-control rounded-pill mt-2" name="vSourceOfInquiry" value={inquiryform.vSourceOfInquiry} onChange={handleChange} placeholder="Source of Inquiry" />
 {inquiryform.vSourceOfInquiry == null?errors.vSourceOfInquiry && <p className="error">Field is required.</p>:""} */}

              </div>
            </div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Description</label>
                <textarea 
                 {...register('tDescription', { required: true })}
                className="form-control rounded-pill mt-2" name="tDescription" value={inquiryform.tDescription} onChange={handleChange} placeholder="Description"></textarea>
{inquiryform.tDescription == null?errors.tDescription && <p className="error">Field is required.</p>:""}
              </div>

              <div className="col-6  my-2 px-3">
              {inquiryform.eTypeofInquiry=="Hire"&&<label htmlFor="">Hire Duration</label>} 
              {inquiryform.eTypeofInquiry=="Project Basis"&&<label htmlFor="">Project Duration</label>} 
              {inquiryform.eTypeofInquiry=="Fix Cost - Less than 2 Weeks"&&<label htmlFor=""> Duration</label>} 
              
                <input 
                {...register('vHireDuration', { required: true })}
                type="text" className="form-control rounded-pill mt-2" name="vHireDuration" value={inquiryform.vHireDuration} onChange={handleChange} placeholder="Hire Duration" />
{inquiryform.vHireDuration == null?errors.vHireDuration && <p className="error">Field is required.</p>:""}
              </div>
            </div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex  ">
              <div className="col-6  my-2 px-3">
               
                {inquiryform.eTypeofInquiry=="Hire"&& <label htmlFor="">Hire Monthly Budget</label>} 
                {inquiryform.eTypeofInquiry=="Project Basis"&&<label htmlFor="">Project Monthly Budget</label>} 
              {inquiryform.eTypeofInquiry=="Fix Cost - Less than 2 Weeks"&&<label htmlFor=""> Monthly Budget</label>} 
                <input 
                {...register('vHireMonthlyBudget', { required: true })}
                type="text" className="form-control rounded-pill mt-2" name="vHireMonthlyBudget" value={inquiryform.vHireMonthlyBudget} onChange={handleChange} placeholder="Hire Monthly Budget" />
{inquiryform.vHireMonthlyBudget == null?errors.vHireMonthlyBudget && <p className="error">Field is required.</p>:""}

              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Experience Required</label>
                <input 
                 {...register('vExperienceRequired', { required: true })}
                type="text" className="form-control rounded-pill mt-2" name="vExperienceRequired" value={inquiryform.vExperienceRequired} onChange={handleChange} placeholder="Experience Required" />
{inquiryform.vExperienceRequired == null?errors.vExperienceRequired && <p className="error">Field is required.</p>:""}

              </div>
            </div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 col-sm-6 my-2 d-inline-flex ">
              <div className="col-6  my-2 px-3">
                <label htmlFor="">Company Name</label>
                {/* <AsyncSelect
                        className="my-2"
                        cacheOptions
                        defaultOptions
                        // options={fetchData}
                        isSearchable={true}
                        value={selectedvalue}
                        getOptionLabel={e => e.vCompanyName}
                        getOptionValue={e => e.id}
                        loadOptions={fetchData}
                        onInputChange={handleInputChange}
                        onChange={handlechange}
                    /> */}
<select 

{...register('vCompanyName', { required: true })}
onClickCapture={(e)=>{
  fetchConatctData(e.target.value)
  SetSelectedValue(e.target.value)
  setbtn(e.target.value)
  }} className="form-control rounded-pill mt-2 my-2">
  <option value="">Select company</option>
  {compid&&
  compid.map(e=>{
    return(
      <option value={e.id}>{e.vCompanyName}</option>
    )
  })
  }
</select>
{inquiryform.vCompanyName == null||undefined||null?errors.vCompanyName && <p className="error">Field is required.</p>:""}
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={handleCompanyReset}
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
                              className=""
                              type="radio"
                              id="flexRadioDefault1"
                              onChange={handleChange} value="Individual" name="eClienttype"
                              // {...register('eClienttype', { required: true })}
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
                              className=""
                              type="radio"
                              id="flexRadioDefault2"
                              checked
                              onChange={handleChange} value="Company" name="eClienttype"
                              // {...register('eClienttype', { required: true })}
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                            >
                              Company
                            </label>

                           

                          </div>
                          {/* {errors.eClienttype && <p className="error">Select anyone</p>} */}
                        </div>
                        <label htmlFor="">Company Name</label>
                        <input 
                        // {...register('vCompanyName', { required: true })}
                        type="text" className="form-control rounded-pill mt-2"name="vCompanyName" value={vendorform.vCompanyName} onChange={handleChange} />
                        {verr.vCompanyName?<p style={{color:"red"}}>{verr.vCompanyName}</p>:""}
                        {/* {errors.vCompanyName && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">Address</label>
                        <input 
                        // {...register('vAddress', { required: true })}
                        type="text" className="form-control rounded-pill mt-2"   name="vAddress" value={vendorform.vAddress} onChange={handleChange}/>
                        {verr.vAddress?<p style={{color:"red"}}>{verr.vAddress}</p>:""}
                        {/* {errors.vAddress && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">Email</label>
                        <input 
                        // {...register('vEmail', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vEmail" value={vendorform.vEmail} onChange={handleChange}/>
                        {verr.vEmail?<p style={{color:"red"}}>{verr.vEmail}</p>:""}
                        {/* {errors.vEmail && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">Vendor Name</label>
                        <input 
                        // {...register('vVendorName', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vVendorName" value={vendorform.vVendorName} onChange={handleChange}/>
                        {verr.vVendorName?<p style={{color:"red"}}>{verr.vVendorName}</p>:""}
                        {/* {errors.vVendorName && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">Mobile</label>
                        <input 
                        // {...register('vMobile', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vMobile" value={vendorform.vMobile} onChange={handleChange}/>
                        {verr.vMobile?<p style={{color:"red"}}>{verr.vMobile}</p>:""}
                        {/* {errors.vMobile && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">Notes</label>
                        <input 
                        // {...register('tNotes', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="tNotes" value={vendorform.tNotes} onChange={handleChange}/>
                        {verr.tNotes?<p style={{color:"red"}}>{verr.tNotes}</p>:""}
                        {/* {errors.tNotes && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">City</label>
                        <input 
                        // {...register('vCity', { required: true })}
                        type="text" className="form-control rounded-pill mt-2"  name="vCity" value={vendorform.vCity} onChange={handleChange}/>
                        {verr.vCity?<p style={{color:"red"}}>{verr.vCity}</p>:""}
                        {/* {errors.vCity && <p className="error">Field is required.</p>} */}


                        <label htmlFor="">State</label>
                        <input 
                        // {...register('vState', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vState" value={vendorform.vState} onChange={handleChange}/>
                        {/* <label htmlFor="">Address</label>
                        <input type="text" className="inputField col-12 mb-3" /> */}
                      {verr.vState?<p style={{color:"red"}}>{verr.vState}</p>:""}
                      {/* {errors.vState && <p className="error">Field is required.</p>} */}
                      </div>

                      <p style={{color:"green" , textAlign:"end", marginRight:"30px"}}>{vendorMessage}</p>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      {vendorAdded?  <button type="submit"  className="btn btn-outline-dark"
                        // data-bs-dismiss="modal"
                        onClick={AddVendor}
                        >
                          Save changes
                        </button>:

                        <button type="submit"  className="btn btn-outline-dark"
                        // data-bs-dismiss="modal"
                        onClick={AddVendor}
                        disabled
                        >
                          Save changes
                        </button>
}

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6  my-2 px-3">
                <label htmlFor="">Contact Person</label>
                <select
                {...register('vendorid', { required: true })}
                  name="vendorid"
                  id=""
                  onClick={handleChange}
                  className="form-control rounded-pill mt-2 my-2"
                  
                >
                  <option value="">Select...</option>
                  {
                    conatctinputvalue.map(e=>{
                      return(
                        <option value={e.id}>{e.vName}</option>
                      )
                    })
                  }
                </select>
                {inquiryform.vendorid == null||undefined||null?errors.vendorid && <p className="error">Field is required.</p>:""}

{/* } */}
                {/* <AsyncSelect
                    className="my-2"
                    cacheOptions
                    defaultOptions
                    value={contactselectedvalue}
                    getOptionLabel={conatctinputvalue => conatctinputvalue.vName}
                    getOptionValue={conatctinputvalue => conatctinputvalue.id}
                    loadOptions={fetchConatctData}
                    onInputChange={handleinput}
                    onChange={handle}
                /> */}
             {btn!=0?   <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#contactmodal"
                  onClick={handleVendorReset}

                >
                  Add Contact Person
                </button>:
                
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#contactmodal"
                  onClick={handleVendorReset}
                  disabled

                >
                  Add Contact Person
                </button>
                }

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
                      <div className="modal-body">
                        {/* <select
                          name=""
                          id=""
                          className="formcontrol d-block dropdownWidth mb-3"
                        >
                          <option value="">Select...</option>
                        </select> */}
                       <select value={selectedvalue} name={contactperson.iCompanyid} onChange={(e)=>fetchConatctData(e.target.value)} 
                       disabled
                       className="form-control rounded-pill mt-2 my-2">
  {/* <option value="">Select company</option> */}
  {compid&&
  compid.map(e=>{
    return(
      <option value={e.id}>{e.vCompanyName}</option>
    )
  })
  }
</select>
                        <label htmlFor="">Name</label>
                        <input 
                        // {...register('vName', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vName" value={contactperson.vName} onChange={handleChange}/>
                         {err.vName?<p style={{color:"red"}}>{err.vName}</p>:""}
                        {/* {errors.vName && <p className="error">Field is required.</p>} */}
                        <label htmlFor="">Mobile</label>
                        <input 
                        // {...register('vMobile', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vMobile" value={contactperson.vMobile} onChange={handleChange}/>
                        {err.vMobile?<p style={{color:"red"}}>{err.vMobile}</p>:""}
                       {/* {errors.vMobile && <p className="error">Field is required.</p>} */}
                        <label htmlFor="">Email</label>
                        <input 
                        // {...register('vEmail', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vEmail" value={contactperson.vEmail} onChange={handleChange}/>
                         {err.vEmail?<p style={{color:"red"}}>{err.vEmail}</p>:""}
                        {/* {errors.vEmail && <p className="error">Field is required.</p>} */}
                        <label htmlFor="">Skype</label>
                        <input 
                        // {...register('vSkype', { required: true })}
                        type="text" className="form-control rounded-pill mt-2" name="vSkype" value={contactperson.vSkype} onChange={handleChange}/>
                       {err.vSkype?<p style={{color:"red"}}>{err.vSkype}</p>:""}
                      {/* {errors.vSkype && <p className="error">Field is required.</p>} */}
                      </div>
                      <p style={{color:"green" , textAlign:"end", marginRight:"30px"}}>{personMessage}</p>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          
                        >
                          Close
                        </button>
                     {personAdded?   <button type="button" onClick={AddContactPerson} className="btn btn-outline-dark"
                        // data-bs-dismiss="modal"
                        >
                          Save changes
                        </button>:
                        
                        <button type="button" onClick={AddContactPerson} className="btn btn-outline-dark"
                        // data-bs-dismiss="modal"
                        disabled
                        >
                          Save changes
                        </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6  my-2 ">
              <div className="col-6  my-2  px-3">
                <label htmlFor="">Documents</label>
                {/* <input type="file" className=" col-12 mb-3" /> */}
                <input 
                
                type="file" name="mediafiles" value={inquiryform.mediafiles} onChange={handleimage} className=" form-control rounded-pill mt-2" multiple/>

              </div>
            </div>
          </div>

          <button type="submit" onClick={handleToDashboard} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Back
          </button>
          <button type="submit" onClick={handleSubmit(inquiryData)} className="mx-auto btn btn-outline-dark w-25">
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
            <button className="modal-btn"  onClick={handleClose}>Ok</button>
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