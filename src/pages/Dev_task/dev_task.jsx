import React from "react";

import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dev_task.css"

const Dev_task = ()=>{

  const [ completed, setCompleted] = useState(false)
const [seletedstatus,setSelectedstatus]=useState()
  const[modal,setModal] = useState(false)
  const[message, setMessage] = useState(false)

  const [data, setData] = useState([{}]);
const [updatetask,setUpdatetask]=useState(0)
const putapicalling=async()=>{
  try{
    const putapicallonserver=await fetch(`${process.env.REACT_APP_APIURL}/task/${updatetask}` , {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({estatus:seletedstatus}),
    })
    const serverresponse=await putapicallonserver.json()
    listapi();

  }
  catch(e){

  }
}
  const listapi = async () => {
    const result = await fetch(`${process.env.REACT_APP_APIURL}/developer/tasklist`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    
    
    const apiresponse = await result.json();
   
    const apicheck = apiresponse?.developerlist;
   
    
    
   

   
    

    setData(apicheck);
   
   
  };

  useEffect(() => {
    listapi();
    
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data]);

const openModal = ()=>{
  setModal(true)
  setMessage("Sure You Want To Proceed")
}


const handleClose=()=>{
  setModal(false)
  
}

const handleCompleted=()=>{
  setModal(false)
  setCompleted(true)
  putapicalling()
}
useEffect(()=>{
  console.log(updatetask)
},[updatetask])
useEffect(()=>{
  console.log(seletedstatus)
},[seletedstatus])

// if(completed){


// }

return(
    <>


<Sidebar IsSales={true}/>

<div className='set'>
  <div className="container my-3 body p-5">
    <div className="row "></div>
<div><table class="table">
<thead class="thead-dark">
  <tr>
    {/* <th scope="col">#</th> */}
    <th scope="col">Task Name</th>
    <th scope="col">Estimated Time</th>
    <th scope="col">Status</th>
    {/* <th scope="col">Edit</th> */}
    
    {/* <th scope="col">Edit</th> */}
    <th scope="col">Progress</th>
  </tr>
</thead>


<tbody>
            {data?.map((e) => {
              console.log(e);
              return (
                <tr>
                  <td data-column="First Name">{e.task_name}</td>
                  <td data-column="Last Name">{e.task_estimated_time}</td>
                 
                
                 {e.estatus=="completed" ?<td className="Converted" data-column="Status">{e.estatus}</td>:""}
                 {e.estatus=="pending" ?<td className="OnHold" data-column="Status">{e.estatus}</td>:""}
                 {e.estatus=="inprogress" ?<td className="Inprogress" data-column="Status">{e.estatus}</td>:""}
                 {e.estatus=="waiting for confirmation" ?<td className="NoResponse" data-column="Status">{e.estatus}</td>:""}
                 
                 {/* <td data-column="Status">
                  <Link to={"/dev_task_edit/" + `${e.id}`}>
                    {" "}
                   <button className="btn">Edit</button>
                  </Link>
                  </td> */}
                  <td >
                  <Link to={""}>
                    {" "}
{/* {completed? */}
                  {/* //  <button className="btn bg-success" disabled >Update</button> */}
           {/* :  */}
                <button className="btn" disabled={e.estatus=="completed"?"disables":""} onClick={()=>{if(e.estatus!="completed"){setUpdatetask(e.id)
            setSelectedstatus(e.estatus)
              openModal()}
            }
          }>Update</button>
          {/* }   */}
                  </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>

</table>

</div>
{modal?
        <>
  
 
  <div className='modal_'>
        <div className='modalBody'>
          
        {/* {message} */}
        <select name="selectedstatus" id="" value={seletedstatus} onChange={(e)=>{
          setSelectedstatus(e.target.value)
        }}>
          <option value="completed">completed</option>
          <option value="pending">pending</option>
          <option value="inprogress">inprogress</option>
          <option value="waiting for confirmation">waiting for confirmation</option>
        </select>
          <div className="modal-button">
            {/* <button className="modal-btn">Ok</button> */}
            <button className="modal-btn" onClick={handleCompleted}>Update</button>
            <button className="modal-btn" onClick={handleClose}>Cancel</button>
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

export default Dev_task