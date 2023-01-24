import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { useForm } from 'react-hook-form';
import {  technologylist } from "../../constfiles"
import aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from "react";
const Register = () => {
  const [technologydropdown] = useState(technologylist);
  const navigate = useNavigate();
  const[modal,setModal] = useState(false)
  const[message, setMessage] = useState(false)
  // const [registrationform, Setregistrationform] = useState({
  //   vemailid: "",
  //   isInhouse: true,
  //   vpassword: "",
  //   vusername: "",
  //   vname: "",
  //   etype: "",
  //   vskypeid: "",
  //   vcontactno: "",
  // });
useEffect(()=>{
aos.init({duration:2000})
},[])
  const registrationapicall = async (personinfo) => {

    const responseapi = await fetch(
      `${process.env.REACT_APP_APIURL}/Register`,

      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personinfo),
      }
    );

    let check = await responseapi.json();

    if(check.success == 1)
    {
      setModal(true)
      reset()
      setMessage("Registered Successfully")
    }
    else{
      setModal(true)
      setMessage(check.message)
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClose=()=>{
    setModal(false)
    // reset()
    // refreshPage()
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm({
    defaultValues:{
      isInhouse:true
    }
  });
  const selecteusertype=watch("etype",false)
  return (
    <>
     <Sidebar IsSales={true}/> 
     <div className="set">
       <div className="regbody">
      <div className="container">
        <form onSubmit={handleSubmit(registrationapicall)}>
        <div className="row d-inline-flex  justify-content-between">
          <div className="col-12 text-center mb-4"  data-aos="fade-right" >
            <h1 className="logo">Register</h1>
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Email Id
            </label>
            <input
             {...register('vemailid', { required: "Email is Required" , 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
              type="text"
              className="form-control rounded-pill mt-2"
              placeholder="email"
             
            />
             {errors.vemailid && <p className="error">{errors.vemailid.message}</p>}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              In House
            </label>
            <select
            {...register('isInhouse', { required: true })}
              className="form-control rounded-pill mt-2"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {errors.isInhouse && <p className="error">Select anyone</p>}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Password
            </label>
            <input
             {...register('vpassword', { required: true })}
              type="password"
              className="form-control rounded-pill mt-2"
              placeholder="Password"
            />
            {errors.vpassword && <p className="error">Password is required</p>}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              User Name
            </label>
            <input
            {...register('vusername', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              placeholder="Username"
            />
            {errors.vusername && <p className="error">UserName is required</p>}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Name
            </label>
            <input
             {...register('vname', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              placeholder="name"
            />
            {errors.vname && <p className="error">Name is required</p>}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              User Type
            </label>
            <select
             {...register('etype', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
            >
              <option value="">Select</option>

              <option value="Admin">Admin</option>
              <option value="Sales">Sales</option>
              <option value="Developer">Developer</option>
            </select>
            {errors.etype && <p className="error">Select Type</p>}
          </div>

         

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Contact Number
            </label>
            <input
             {...register('vcontactno', { required: "Contact is Required" , 
             pattern: {
               // eslint-disable-next-line no-useless-escape
               value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
               message: "invalid Contact Number"
             }
           })}
              type="text"
              className="form-control rounded-pill mt-2 " 
              placeholder="Contact no"
            />
            {errors.vcontactno && <p className="error">{errors.vcontactno.message}</p>}
          </div>
         { selecteusertype==="Developer"&&
         <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Technology
            </label>
            <select name="vTechnology" id=""
                      {...register('vTechnology', { required: {
                        value:true,
                        message:'Technology is Required'
                      } })}
                      className="form-control rounded-pill mt-2"
                    >
                      <option value="">select</option>
                      {technologydropdown.map((e) => {
                        return (
                          <option value={e} >{e}</option>
                        )
                      })}
                    </select>
          
            {errors.vTechnology && <p className="error">{errors.vTechnology.message}</p>}
          </div>
}

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Skype Id
            </label>
            <input
            {...register('vskypeid', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              placeholder="Skype id"
            />
            {errors.vskypeid && <p className="error">Skypeid is required</p>}
          </div>
          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2"    data-aos="fade-right" >
            <label htmlFor="" className="label">
              Salary
            </label>
            <input
            {...register('salary', { required: {
              value:true,
              message:"Please Mention Salary"
            } })}
              type="number"
              className="form-control rounded-pill mt-2"
              placeholder="salery"
            />
            {errors.salary && <p className="error">{errors.salary.message}</p>}
          </div>
          {/* <p className="text-center">
            Already a members ? <Link to="/login" onClick={handleLogin}> Log In </Link>
          </p> */}

          {/* <p className="text-center">
          <input type="submit" className="btn btn-outline-dark button" onClick={handleLogin} value="Login" />
          </p> */}

          <input
              type="submit"
              className="btn btn-outline-dark button"
           
              // onClick={handleSubmit(registrationapicall)}
              value="Register"
            />



          {/* <div className="col-1 my-6 button">
            <input type="Login" className="btn btn-outline-dark " onClick={submitData} />
          </div> */}
        </div>
        </form>
        {modal?
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

        :""}
      </div>
    </div>
    </div>
    </>
  );
};

export default Register;
