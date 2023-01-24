import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
// import "./mod_list.css"
const Task_List=()=>{

    const navigate = useNavigate()

    const {milestoneid,moduleid} = useParams()

    const [data,setData] = useState([{
    }])


    const listapi = async () => {
        const result = await fetch(`${process.env.REACT_APP_APIURL}/task/${moduleid}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
    
       
        
        const apiresponse = await result.json();
       
        const apicheck = apiresponse?.tasklist;
      // console.log(apicheck)
        setData(apicheck);
        
      };
    
      useEffect(() => {
        listapi();
        
      }, []);
    
      useEffect(() => {
        // console.log(data);
      }, [data]);

    //   const handleBack=()=>{
    //     navigate("/p_edit/"+`${projectid}`)
    //   }

    return(
        <>




<Sidebar IsSales={true}/>

<div className='set'>
  <div className="container my-3 body p-5">
  <h1 className="logo text-center">Tasks</h1>
  <div className="d-flex justify-content-between">
  <button type="submit" onClick={() => navigate(-1)}  className=" bg-dark text-white btn btn-outline-dark w-25">
            Go Back
          </button>
          <Link to={"/ctask/"+`${moduleid}`} className=" bg-dark text-white btn btn-outline-dark w-25">
            Create Task
          </Link> 
          </div>
  {/* <button type="submit" onClick={handleBack}  className="my-2 bg-dark text-white btn btn-outline-dark w-25">
            Back to Project
          </button> */}
    
          
         
        
    <div className="row "></div>
<div><table class="table">
<thead class="thead-dark">
  <tr>
    {/* <th scope="col">#</th> */}
    <th scope="col">Id</th>
    <th scope="col">Assigned To</th>
    <th scope="col">Task Name</th>
    <th scope="col">Estimated Time</th>
    {/* <th scope="col">Priority</th> */}
    {/* <th scope="col">Last Date</th>
    <th scope="col">Amount</th>
    <th scope="col">Notes</th>*/}
    <th scope="col">Status</th>
    <th scope="col">Edit</th> 
    {/* <th scope="col">Task</th>  */}
    {/* <th scope="col">Progress</th> */}
  </tr>
</thead>


<tbody>
            {data?.map((e,index) => {
              // console.log(e);
              return (
                <tr>
                  <td data-column="First Name">{index+1}</td>
                  <td data-column="Last Name">{e.vname}</td>
                  <td data-column="Last Name">{e.task_name}</td>
                  <td data-column="Last Name">{e.task_estimated_time}</td>
                  <td data-column="Last Name">{e.estatus}</td>
                  {/* <td data-column="Last Name">{e.dDeadlineDate}</td>
                  <td data-column="Job Title">{e.fAmount}</td>
                  <td data-column="Twitter">{e.tNotes}</td>
                  {e.eSttaus=="Active" ? <td className="Active" data-column="Twitter">{e.eSttaus}</td>:""}
                  {e.eSttaus=="Inactive" ? <td className="Inactive" data-column="Twitter">{e.eSttaus}</td>:""} */}
                  <td data-column="Status">
                  <Link to={"/task_edit/" + `${e.id}`}>
                    {" "}
                     <button className="btn">Edit</button>
                  </Link>
                  </td>
                  {/* <td>
                  <Link to={"/ctask/" + `${e.moduleid}`}>
                  <button className="btn">Add Task</button>
                  </Link>
                  </td> */}
                  {/* <td data-column="Last Name">{e.succespercent + "%"}</td> */}
                </tr>
              );
            })}
          </tbody>

</table>

</div>
</div>
</div>
        </>
    )

}
export default Task_List