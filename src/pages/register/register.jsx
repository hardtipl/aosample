import React, { useEffect, useState } from "react";
import "./register.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { useForm } from 'react-hook-form';


const Register = () => {


   const refreshPage=()=> {
    window.location.reload(false);
  }
  const navigate = useNavigate();
  const[modal,setModal] = useState(false)
  const[message, setMessage] = useState(false)
  const [registrationform, Setregistrationform] = useState({
    vemailid: "",
    isInhouse: true,
    vpassword: "",
    vusername: "",
    vname: "",
    etype: "",
    vskypeid: "",
    vcontactno: "",
  });

  const hadlechange = (e) => {
    let objname = e.target?.name;
    let value = e.target?.value;
    Setregistrationform({ ...registrationform, [objname]: value });
  };

  // useEffect(() => {}, [registrationform]);

  const registrationapicall = async (e) => {

    const responseapi = await fetch(
      `${process.env.REACT_APP_APIURL}/Register`,

      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let check = await responseapi.json();

    if(check.success == 1)
    {
      setModal(true)
      setMessage("Registered Successfully")
    }
    else{
      setModal(true)
      setMessage(check.message)
    }

    // localStorage.setItem("Token", check.token);
    // localStorage.setItem("userid", check.userid);

    // alert(JSON.stringify(check));
    // console.log(check);

    // alert("in else");
    
  };
  const data = {
    vemailid: registrationform.vemailid,
    isInhouse: registrationform.isInhouse,
    vpassword: registrationform.vpassword,
    vusername: registrationform.vusername,
    vname: registrationform.vname,
    etype: registrationform.etype,
    vskypeid: registrationform.vskypeid,
    vcontactno: registrationform.vcontactno,
  };

  // const validate = (values) => {
  //   const errors = {};

  //   if (!values.username) {
  //     errors.username = "Required";
  //   } else if (values.username.length < 4) {
  //     errors.username = "Must be 5 characters or more";
  //   }

  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (values.email.length < 4) {
  //     errors.email = "Must be 5 characters or more";
  //   }

  //   if (!values.password) {
  //     errors.password = "Required";
  //   } else if (values.password.length < 8) {
  //     errors.password = "Must be 8 characters or more";
  //   } else if (values.password === "12345678") {
  //     errors.password = "Must not be 12345678 !!!";
  //   }

  //   return errors;
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     email: "",
  //     password: "",
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  // const navigate = useNavigate();
  // const [loginform, setLoginForm] = useState({
  //   username: "",
  //   password: "",
  // });

  // const hadlechange = (e) => {
  //   let objname = e.target?.name;
  //   let value = e.target?.value;
  //   setLoginForm({ ...loginform, [objname]: value });
  // };
  // const loginapi = async () => {
  //   // alert(`${process.env.REACT_APP_API_KEY}/login`);
  //   // alert(JSON.stringify(loginform));
  //   const responseapi = await fetch(
  //     `${process.env.REACT_APP_API_KEY}/login`,

  //     {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginform),
  //     }
  //   );
  //   let check = await responseapi.json();
  //   // alert(JSON.stringify(check));
  //   // console.log(check);

  //   if (
  //     check?.status == 400 ||
  //     check?.status == 401 ||
  //     check?.status == 403 ||
  //     check?.success === 0 ||
  //     check?.status == 500
  //   ) {
  //     // alert("in if");
  //     alert(check.Message);
  //     // alert(check.Message);
  //     throw check.Message;
  //   } else {
  //     alert("in else");
  //     navigate("/users");
  //   }
  //   // alert(ok);
  // };

  // useEffect(() => {}, [loginform]);
  // const handelsubmit = (e) => {
  //   e.preventDefault();
  //   loginapi();
  // };
  useEffect(() => {
  }, [data])
  const handleLogin = () => {
    navigate("/login");
  };

  const handleClose=()=>{
    setModal(false)
    // reset()
    refreshPage()
   
  }




  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 

  return (
    <>
     <Sidebar IsSales={true}/> 
     <div className="set">
       <div className="regbody">
      <div className="container">
        <div className="row d-inline-flex  justify-content-between">
          <div className="col-12 text-center mb-4">
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
              name="vemailid"
              value={registrationform.vemailid}
              onChange={hadlechange}
            />
             {errors.vemailid && <p className="error">{errors.vemailid.message}</p>}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              In House
            </label>
            <select
            {...register('isInhouse', { required: true })}
              name="isInhouse"
              className="form-control rounded-pill mt-2"
              value={registrationform.isInhouse}
              onChange={hadlechange}
            >
              {/* <option value="">Select</option> */}

              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {registrationform.isInhouse==""?errors.isInhouse && <p className="error">Select anyone</p>:""}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Password
            </label>
            <input
             {...register('vpassword', { required: true })}
              type="password"
              className="form-control rounded-pill mt-2"
              name="vpassword"
              placeholder="Password"
              value={registrationform.vpassword}
              onChange={hadlechange}
            />
            {registrationform.vpassword==""?errors.vpassword && <p className="error">Password is required</p>:""}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              User Name
            </label>
            <input
            {...register('vusername', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="vusername"
              placeholder="Username"
              value={registrationform.vusername}
              onChange={hadlechange}
            />
            {registrationform.vusername==""?errors.vusername && <p className="error">UserName is required</p>:""}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Name
            </label>
            <input
             {...register('vname', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="vname"
              placeholder="name"
              value={registrationform.vname}
              onChange={hadlechange}
            />
            {registrationform.vname==""?errors.vname && <p className="error">Name is required</p>:""}
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              User Type
            </label>
            <select
             {...register('etype', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="etype"
              value={registrationform.etype}
              onChange={hadlechange}
            >
              <option value="">Select</option>

              <option value="Admin">Admin</option>
              <option value="Sales">Sales</option>
              <option value="Developer">Developer</option>
            </select>
            {registrationform.etype==""?errors.etype && <p className="error">Select Type</p>:""}
          </div>

         

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Contact Number
            </label>
            <input
             {...register('vcontactno', { required: "Contact is Required" , 
             pattern: {
               value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
               message: "invalid Contact Number"
             }
           })}
              type="text"
              className="form-control rounded-pill mt-2 " 
              name="vcontactno"
              placeholder="Contact no"
              value={registrationform.vcontactno}
              onChange={hadlechange}
            />
            {errors.vcontactno && <p className="error">{errors.vcontactno.message}</p>}
          </div>


          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2">
            <label htmlFor="" className="label">
              Skype Id
            </label>
            <input
            {...register('vskypeid', { required: true })}
              type="text"
              className="form-control rounded-pill mt-2"
              name="vskypeid"
              placeholder="Skype id"
              value={registrationform.vskypeid}
              onChange={hadlechange}
            />
            {registrationform.vskypeid==""?errors.vskypeid && <p className="error">Skypeid is required</p>:""}
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

              onClick={handleSubmit(registrationapicall)}
              value="Register"
            />



          {/* <div className="col-1 my-6 button">
            <input type="Login" className="btn btn-outline-dark " onClick={submitData} />
          </div> */}
        </div>

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
