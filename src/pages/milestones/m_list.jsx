import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import "./m_list.css"
const M_List=()=>{

    const navigate = useNavigate()

    const {projectid} = useParams()
// localStorage.setItem("iprojectid")
    const [data,setData] = useState([{
        // iProjectId:projectid
    }])


    const listapi = async () => {
        // alert(projectid)
        const result = await fetch(`${process.env.REACT_APP_APIURL}/milestone/${projectid}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
    
       
        
        const apiresponse = await result.json();
       
        const apicheck = apiresponse?.Message;
        
      
        setData(apicheck);
        
      };
    
      useEffect(() => {
        listapi();
        
      }, []);
    
      useEffect(() => {
        // console.log(data[0].projecttitle)
        // console.log(data);
      }, [data]);

      const handleBack=()=>{
        navigate("/p_edit/"+`${projectid}`)
      }

     

    return(
        <>




<Sidebar IsSales={true}/>

<div className='set'>
  <div className="container my-3 body p-5">
  <h1 className="logo text-center">Milestones ({data[0]?.projecttitle})</h1>
    
  <button type="submit" onClick={handleBack}  className="my-2 bg-dark text-white btn btn-outline-dark w-25">
            Back to Project
          </button>
    
          <Link to={"/milestone/"+`${projectid}`} className="mx-auto bg-dark text-white btn btn-outline-dark w-25 toright">
            Create Milestone
          </Link>
         
        
    <div className="row "></div>
<div><table class="table">
<thead class="thead-dark">
  <tr>
    {/* <th scope="col">#</th> */}
    <th scope="col">Title</th>
    <th scope="col">Created on</th>
    <th scope="col">Last Date</th>
    <th scope="col">Amount</th>
    <th scope="col">Notes</th>
    <th scope="col">Status</th>
    <th scope="col">Edit</th>
    <th scope="col">Modules</th>
    <th scope="col">Progress</th>
  </tr>
</thead>


<tbody>
            {data.length>0?data.map((e) => {
              console.log(e);
              return (
                <tr>
                  {/* {new Date(data.dDeadlineDate).toLocaleDateString("en-CA")} */}
                  <td data-column="First Name">{e.vTitleofMilestone}</td>
                  <td data-column="Last Name">{new Date(e.dCreateddate).toLocaleDateString("en-ca")}</td>
                  <td data-column="Last Name">{new Date(e.dDeadlineDate).toLocaleDateString("en-CA")}</td>
                  <td data-column="Job Title">{e.fAmount}</td>
                  <td data-column="Twitter">{e.tNotes}</td>
                  {e.eStatus=="Active" ? <td className="Active" data-column="Twitter">{e.eStatus}</td>:""}
                  {e.eStatus=="Inactive" ? <td className="Inactive" data-column="Twitter">{e.eStatus}</td>:""}
                 {/* {e.eStatus=="Converted" ?<td className="Converted" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="InProgress" ?<td className="Inprogress" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="Cancelled" ?<td className="Cancelled" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="Rejected" ?<td className="Rejected" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="OnHold" ?<td className="OnHold" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="No Response From Client" ?<td className="NoResponse" data-column="Status">{e.eStatus}</td>:""} */}
                  {/* <Link to={"/medit/" + `${e.id}`}> */}
                  <td data-column="Status">
                  <Link to={"/medit/" +projectid+"/"+ `${e.id}`}>
                    {" "}
                   <button className="btn">Edit</button>
                  </Link>
                  </td>
                  <td data-column="Status">
                  <Link to={"/modlist/" + `${e.id}`}>
                    {" "}
                   <button className="btn">Modules</button>
                  </Link>
                  </td>
                  <td data-column="Twitter">{Math.ceil( e.suceesrate) + "%"}</td>
                </tr>
              );
            }):""}
          </tbody>

</table>

</div>
</div>
</div>
        </>
    )

}
export default M_List