import React, { useEffect, useState } from "react";
import "./login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';


const Login = () => {
  const navigate = useNavigate();
  const[message,setMessage] =useState(false)

  const userid = localStorage.getItem("userid");
  const usertype = localStorage.getItem("usertype");

  const [loginform, setLoginForm] = useState({
    vusername: "",
    vpassword: "",
    etype: "",
  });

  const hadlechange = (e) => {
    let objname = e.target?.name;
    let value = e.target?.value;
    setLoginForm({ ...loginform, [objname]: value });
  };
  const onSubmit = async () => {
    const responseapi = await fetch(
      `${process.env.REACT_APP_APIURL}/login`,

      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginform),
      }
    );
    // console.log("dfg", responseapi)

    if (
      responseapi?.status == 400 ||
      responseapi?.status == 401 ||
      responseapi?.status == 403 ||
      responseapi?.status == 500
    ) {
      let apirespmessage=await responseapi.text()
      // console.log(apirespmessage)
      setMessage(apirespmessage)
      // alert(responseapi.statusText)
      // throw responseapi.statusText;

    } else {
      let check = await responseapi.json();
      // alert("sdf")
      localStorage.setItem("Token", check.token);
      localStorage.setItem("userid", check.userid);
      localStorage.setItem("usertype", check.usertype);


      // alert("Success")
      if (check.usertype == "Sales") {
        navigate("/sales_dash");
      } else if (check.usertype == "Admin") {
        navigate("/admind");
      } else if (check.usertype == "Developer") {
        navigate("/devdash");
      }
    }

  };


  useEffect(() => { }, [loginform]);
  const handelsubmit = (e) => {
    onSubmit();
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  return (
    <>
      <div className="loginBody">
        <div className="container">
          <div className="row d-block">
            <div className="col-12 my-3">
              <h1 className="logo text-center">Login</h1>
            </div>
           
            <div className="col-6 mb-3 loginMargin">
              <label htmlFor="">Username</label>
              <input
                {...register('vusername', { required: true })}
                type="text"
                className="form-control rounded-pill mt-2"
                name="vusername"
                value={loginform.username}
                onChange={hadlechange}
              />
              {loginform.vusername==""?errors.vusername && <p className="error">UserName is required.</p>:""}
              {message =="Username Not Exist" && <p className="error">{message}</p>}
            </div>

            <div className="col-6 mb-3 loginMargin">
              <label htmlFor="">Password</label>
              <input
                {...register('vpassword', { required: true })}
                type="password"
                className="form-control rounded-pill mt-2"
                name="vpassword"
                placeholder="Password"
                value={loginform.password}
                onChange={hadlechange}
              />
              {loginform.vpassword==""?errors.vpassword && <p className="error">Password is required.</p>:""}
              {message =="Password not matched" && <p className="error">{message}</p>}
            </div>

            <div className="col-6 mb-3 loginMargin">
              <label htmlFor="">User Type</label>
              <select
                {...register('etype', { required: true })}
                type="text"
                className="form-control rounded-pill mt-2"
                name="etype"
                value={loginform.etype}
                onChange={hadlechange}
              >
                <option value="" >Select</option>

                <option value="Admin" >Admin</option>
                <option value="Sales" >Sales</option>
                <option value="Developer" >Developer</option>
              </select>

              {loginform.etype==""?errors.etype && <p className="error">Select anyone</p>:""}
            </div>

            <div className="button">
              <input type="submit" className="form-control my-3 btn btn-outline-dark " onClick={handleSubmit(onSubmit)} value="Log in" />

            </div>

        

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
