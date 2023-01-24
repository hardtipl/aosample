import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";

const Ctask = () => {
  

   const pid = localStorage.getItem("projectid")
   // alert(JSON.stringify(pid))
  const[created, isCreated] = useState(false)
  const { moduleid } = useParams();
  const[create,setCreate] = useState(false)

  const [val, setval] = useState({
    moduleid: moduleid,
    task_name: "",
    task_estimated_time: "",
    assign_to: 0,
  });


  const hadlechange = (e) => {
    console.log(e.target.value)
    let objname = e.target?.name;
    let value = e.target?.value;
    console.log({ ...val, [objname]: value });
    setval({ ...val, [objname]: value });
    setCreate(true)
  };

  const [dev, setdev] = useState([{
    id: 0,
    vname: ""
  }]);

  const geting = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/projectteam/${pid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((respond) => respond.data)
      .then((res) => {
        
        setdev(res.Message);
      });
  };
  // alert(JSON.stringify(dev))
  useEffect(() => {
    geting();
  }, []);

  const posting = () => {
    axios
      .post(`${process.env.REACT_APP_APIURL}/task/createtask`, val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      })
      isCreated(true)
      setCreate(false)
      
  };

  const navigate = useNavigate();
  // alert(milestoneid)

  // const [data, setData] = useState({
  //   imilestone_id: milestoneid,
  // });

  

  // const modulecall = async (e) => {
  //   // e.preventDefault();

  //   const responseapi = await fetch(
  //     `${process.env.REACT_APP_APIURL}/task/createtask`,

  //     {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );

  //   let check = await responseapi.json();
  //   console.log(check);
  // };
  useEffect(() => {}, [val]);

  const handleBack = () => {
    // navigate("/medit/" + `${projectid}/` + `${milestoneid}`)
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Sidebar IsSales={true} />

      <div>
        <div className="set">
          <div className="Milebody">
            <div className="container my-3 p-5">
              <button
                type="submit"
                onClick={() => navigate(-1)}
                className="mx-auto bg-dark text-white btn btn-outline-dark w-25"
              >
                Back
              </button>
              <div className="row ">
                <div className="col-12 text-center mb-2">
                  <h1 className="title">Task</h1>
                 {created? <h5 style={{color:"green"}}>Task Created</h5>:""}
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-3 ">
                  <div className="col-6 my-2 px-3 mx-auto">
                    {/* <label htmlFor="">Milestone</label> */}
                    {/* <select name="" id="" className="form-control rounded-pill mt-2">
                <option value="">Select</option>
               </select> */}
                  </div>

                  <div className="col-6 my-2 px-3 mx-auto">
                    <label htmlFor="">Task Name</label>
                    {/* <input type="text" className="inputField col-12 mb-3" /> */}
                    <input
                      {...register("task_name", { required: true })}
                      type="text"
                      className="form-control rounded-pill mt-2"
                      placeholder="Task Name"
                      name="task_name"
                      value={val.task_name}
                      onChange={hadlechange}
                    />
                    {val.task_name==""?errors.task_name && (
                      <p className="error">Module Name is required.</p>
                    ):""}
                  </div>
                  <div className="col-6 my-2 px-3 mx-auto">
                    <label htmlFor="">Estimated Time</label>
                    {/* <input type="date" className="txt-area col-12 mb-3" /> */}
                    <input
                      {...register("task_estimated_time", { required: true })}
                      type="text"
                      className="form-control rounded-pill mt-2"
                      name="task_estimated_time"
                      placeholder="time"
                      value={val.task_estimated_time}
                      onChange={hadlechange}
                    />
                    {val.task_estimated_time==""?errors.task_estimated_time && (
                      <p className="error">Estimated Time is required.</p>
                    ):""}
                  </div>

                  <div className="col-6 my-2 px-3 mx-auto">
                    <label htmlFor="">Assign To</label>
                    <select
                    //  {...register("assign_to", { required: true })}
                      // onClick={geting}
                      onChange={hadlechange}
                      name="assign_to"
                      // value={val.assign_to}
                      id=""
                      className="form-control rounded-pill mt-2"
                      
                    >
                      <option value="select ">--Select--</option>
                      {dev?.map((e) => 
                      
                      {
                        return <option value={e.iUserid}>{e.vname}</option>;
                      })}
                    </select>
                    {/* {val.assign_to=="select"?errors.assign_to && (
                      <p className="error">Required</p>
                    ):""} */}
                  </div>
                </div>
              {create?  <button
                  type="submit"
                  onClick={handleSubmit(posting)}
                  value="Register"
                  className="mx-auto btn btn-outline-dark w-25"
                >
                  Submit
                </button>:
                
                <button
                  type="submit"
                  onClick={handleSubmit(posting)}
                  value="Register"
                  className="mx-auto btn btn-outline-dark w-25"
                  disabled
                >
                  Submit
                </button>
                
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Ctask;