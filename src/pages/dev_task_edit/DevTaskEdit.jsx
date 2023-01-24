import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";


const Dev_Task_Edit = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState({})

  const { projectid, milestoneid, moduleid, id } = useParams()
  console.log(id)
  const navigate = useNavigate();
  const [data, setData] = useState({

  });
  // alert(moduleid)


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
      verificationdata.task_name == undefined ||
      verificationdata.task_name == ""
    ) {
      errors.task_name = "Field should not be empty";
    }
    if (
      verificationdata.task_estimated_time == undefined ||
      verificationdata.task_estimated_time == ""
    ) {
      errors.task_estimated_time = "Field should not be empty";
    }
    if (
      verificationdata.estatus == undefined ||
      verificationdata.estatus == ""
    ) {
      errors.estatus = "Field should not be empty";
    }
    if (
      verificationdata.assign_to == undefined ||
      verificationdata.assign_to == ""
    ) {
      errors.assign_to = "Field should not be empty";
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

  const taskapi = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_APIURL}/task/singletask/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const apiresponse = await result.json();
    const check = apiresponse.tasklist;
    setData({ ...data, ...check[0] });
    console.log(data)
    console.log(check);
  };





  useEffect(() => {
    taskapi();
  }, []);

  useEffect(() => {
  }, [data]);




  const taskData = (e) => {
    delete data.id
    e.preventDefault();
    // const alloweditms=["iprojectid","vTitleofMilestone","dDeadlineDate","fAmount",
    // "tNotes",
    // "eSttaus",
    // "iAccountHolderId"]

    const apicall = () => {
      const apidata = axios({
        method: "put",
        url: `${process.env.REACT_APP_APIURL}/task/${id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      })
      // console.log(apidata);
      const respo = apidata.data;
      const check = respo?.Message;
      // console.log(respo)
      setUpdated(true)
      setIsUpdate(false)
    };
    try {

      apicall();

    } catch (e) {
    }
  }

  // const handleBack=()=>{
  //   navigate("/mlist/" + `${projectid}`)
  // }


  useEffect(() => {
    // console.log(error)
  }, [error])

  const [dev, setdev] = useState([{
    id: 0,
    vname: ""
  }]);
  const geting = () => {
    axios
      .get("http://192.168.5.21:7000/developer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((respond) => respond.data)
      .then((res) => {
        setdev(res.developerlist);
      });
  };

  useEffect(() => {
    geting();
  }, []);



  return (
      <>
        <Sidebar IsSales={true} />
        <div>
          <div className="set">

            <div className="Milebody">

              <div className="container my-3 p-5">
                <button type="submit" onClick={() => navigate(-1)} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
                  Back
                </button>
                <div className="row ">
                  <div className="col-12 text-center mb-2">
                    <h1 className="title">Task</h1>
                    <h5 style={{ color: "green" }}> {updated ? "Updated Successfully" : ""}</h5>
                  </div>

                  <div className="col-xxl-12 col-xl-12 col-lg-6 col-md-12 col-sm-12 my-3 ">
                    <div className="col-6 my-2 px-3 mx-auto">
                      <label htmlFor="">Name</label>
                      {/* <input type="text" className="inputField col-12 mb-3" /> */}
                      <input
                        type="text"
                        className="form-control rounded-pill mt-2"
                        name="task_name"
                        value={data.task_name}
                        onChange={handleChange}
                        disabled
                      />
                      {error.task_name ? <p style={{ color: "red" }}>{error.task_name}</p> : ""}
                    </div>

                    {/* <div className="col-6 my-2 px-3 mx-auto">
        <label htmlFor="">Created Date</label>
        <input
      type="date"
      className="form-control rounded-pill mt-2"
      name="dCreateddate"
      placeholder="Deadline Date"
      value= {new Date(data.dCreateddate).toLocaleDateString("en-CA")}
     
      onChange={handleChange}
    />
      </div> */}

                    <div className="col-6 my-2 px-3 mx-auto">
                      <label htmlFor="">Estimated Time</label>
                      {/* <input type="text" className="inputField col-12 mb-3" /> */}
                      <input
                        type="text"
                        className="form-control rounded-pill mt-2"
                        name="task_estimated_time"
                        placeholder="Estimated Time"
                        value={data.task_estimated_time}
                        onChange={handleChange}
                        disabled
                      />
                      {error.task_estimated_time ? <p style={{ color: "red" }}>{error.task_estimated_time}</p> : ""}
                    </div>



                    <div className="col-6 my-2 px-3 mx-auto">
                      <label htmlFor="">Status</label>
                      <select
                        name="estatus"
                        className="form-control rounded-pill mt-2"
                        value={data.estatus}
                        onChange={handleChange}
                        
                      >
                        <option value="">Select</option>

                        <option value="pending">Pending</option>
                        <option value="inprogress">Inprogress</option>
                        <option value="waiting for confirmation">Waiting For Confirmation</option>
                        <option value="completed">Completed</option>
                      </select>
                      {error.estatus ? <p style={{ color: "red" }}>{error.estatus}</p> : ""}
                    </div>

                    <div className="col-6 my-2 px-3 mx-auto">
                      <label htmlFor="">Status</label>
                      <select
                      // onClick={geting}
                      onChange={handleChange}
                      name="assign_to"
                      value={data.assign_to}
                      id=""
                      className="form-control rounded-pill mt-2"
                      disabled
                    >
                      <option value="">Select</option>
                      {dev?.map((e) => {
                        return <option value={e.id}>{e.vname}</option>;
                      })}
                    </select>
                      {error.estatus ? <p style={{ color: "red" }}>{error.estatus}</p> : ""}
                    </div>





                  </div>
                  {isUpdate ? <button
                    type="submit"
                    onClick={taskData}
                    value="Register"
                    className="mx-auto btn btn-outline-dark w-25"
                  >
                    Submit
                  </button> :
                    <button
                      type="submit"
                      onClick={taskData}
                      value="Register"
                      className="mx-auto btn btn-outline-dark w-25"
                      disabled
                    >
                      Update
                    </button>
                  }
                  {/* <Link to={"/modlist/"+`${milestoneid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Modules
          </Link>
      <Link to={"/cmodule/"+`${milestoneid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25">
            Create Module
          </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>


    </>

  )

}
export default Dev_Task_Edit 