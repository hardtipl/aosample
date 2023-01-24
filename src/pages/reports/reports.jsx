import React, { useState } from "react";
import "./reports.css"
import { technologylist } from "../../constfiles";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Reports = () => {
  const [searchfilter, setSearchfilter] = useState({
    serchon: "Project",
    technology:"",
    title:"",
    users:undefined
  });
  const [technologydropdown] = useState(technologylist);
  const [ok, setOk] = useState("")
  const [FilterName, setFilterName] = useState("")
  const [StartFrom, setStartFrom] = useState("")
  const [EndFrom, setEndFrom] = useState("")
  const [StartDate, setStartDate] = useState("")
  const [EndDate, setEndDate] = useState("")
 
  const handleChange = (e)=>{
    let name = e.target.name
    let value = e.target.value
    setSearchfilter({...searchfilter,[name]:value})
  }

  const [pageCount, setpageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  let itemPerPage = 10;

  const [data,setData] = useState()
  console.log(ok)
const[List, setUserList]=useState([])
  const userList = async()=>{
    const usercall = await fetch(
      `${process.env.REACT_APP_APIURL}/sales?`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }

    )
    const result = await usercall.json()
    const check = result.saleslist
    
    setUserList(check)

   
  }
  console.log(List)
  

  useEffect(()=>{
    userList()
  },[])

  const apicall = async()=>{
    let apiurl = `${process.env.REACT_APP_APIURL}/reports?`
    if(itemOffset>0){

      apiurl=  `${apiurl}offset=${itemOffset} &`
    } 
    if(searchfilter.serchon){apiurl=`${apiurl}searchon=${searchfilter.serchon}&`}
    
    if (FilterName.length > 0) {
      apiurl = `${apiurl}title=${FilterName}&`
    }

    if (ok?.length > 0) {
      apiurl = `${apiurl}technology=${ok}&`
    }
    if (StartFrom?.length > 0) {
      apiurl = `${apiurl}start=${StartFrom}&`
    }
    if (EndFrom?.length > 0) {
      apiurl = `${apiurl}end=${EndFrom}&`
    }
    if (StartDate?.length > 0) {
      apiurl = `${apiurl}startingdate=${StartDate}&`
    }
    if (EndDate?.length > 0) {
      apiurl = `${apiurl}endingdate=${EndDate}&`
    }
    if (searchfilter.users> 0) {
      apiurl = `${apiurl}user=${searchfilter.users}&`
    }
    // alert(apiurl)

    // alert(apiurl)
    const hitcall = await fetch(
      apiurl ,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }

    )
    const result = await hitcall.json()
    const check = result.Message.data
    console.log(check)
    console.log(result)
    setData(check)
    setCurrentItem(check)
    console.log(result.Message.countofdataavilable)
    setpageCount(Math.ceil(result.Message.countofdataavilable/ itemPerPage))
  }
  useEffect(()=>{
    apicall()
  },[searchfilter,FilterName,ok,StartFrom,EndFrom,StartDate,EndDate,List])

  useEffect(() => {
    // console.log(data);
  }, [data]);

  // alert(JSON.stringify(searchfilter))

  useEffect(()=>{
    const endoffset = itemOffset + itemPerPage
    // setCurrentItem(data.slice(itemOffset,endoffset))
    // setpageCount(Math.ceil(data.length/ itemPerPage))
    // console.log(endoffset)
    // console.log("current",currentItem)
    // console.log("data", data.length)
  },[itemOffset,itemPerPage,data])

  const handlePageClick=(e)=>{
    const newOffset=(e.selected*itemPerPage)
    // alert(newOffset)
    setItemOffset(newOffset)
    // console.log(newOffset)
  }
 useEffect(()=>{
  apicall();
   
 },[itemOffset])

 const handleReset=()=>{
  setSearchfilter({
    serchon: "Project",
    technology:"",
    title:"",
    users:undefined
  })
  setOk("")
  setFilterName("")
  setStartFrom("")
setEndFrom("")
setStartDate("")
setEndDate("")
}


  return (

    <div className="row ">
      <div className="col-2 filter">
      <div className="px-2 py-0">
        <div className="d-flex justify-content-between ">
        <h4 className="text-center"> Filter</h4>
        
          <u className="text-primary reset" onClick={handleReset}>
          Reset
          </u>
        
        </div>
        <div className="w-100">
        <input
            
            type="radio"
            name="serchon"
            onChange={handleChange}
            id=""
            value={"Project"}
            checked={searchfilter.serchon == "Project" ? "checked" : ""}
          />

          <label htmlFor="">Project</label>
          </div>
          <div className="w-100">
          <input
            type="radio"
            onChange={handleChange}
            name="serchon"
            id=""
            value={"Inquiry"}
            checked={searchfilter.serchon == "Inquiry" ? "checked" : ""}
          />
          <label htmlFor="">Inquiry</label>
          </div>
          <div className="w-100">
          <input
            type="radio"
            onChange={handleChange}
            name="serchon"
            id=""
            value={"Lead"}
            checked={searchfilter.serchon == "Lead" ? "checked" : ""}
          />
          <label htmlFor="">Lead</label>
          </div>

          <div className="py-3">
          <label htmlFor="" className="w-100">Technology</label>
          <select name="" id="" value={ok} className="w-100 rounded-pill py-1 px-1"
          onChange={(e)=>{
            setOk(e.target.value)}}
          >
            <option value="select">select</option>
            {technologydropdown?.map((e)=>{
                    return(
                      <option value={e}>{e}</option>
                    )
                  })}
          </select>
          

          </div>
          <div className="py-0">
          <label htmlFor="" className="w-100">Title</label>
          <input type="text" className="w-100 rounded-pill" value={FilterName}  onChange={(e)=>{
					setFilterName(e.target.value)}} />
          

          </div>

          <div className="pt-4 ">
            <h5 className="text-center">Monthly Budget</h5>
          </div>
          <div >
            <label htmlFor="" className="w-100">Start From</label>
            <input type="number" className="w-100 rounded-pill" value={StartFrom} onChange={(e)=>{setStartFrom(e.target.value)}}/>
          </div>
          <div>
            <label htmlFor="" className="w-100">End To</label>
            <input type="number" className="w-100 rounded-pill"value={EndFrom} onChange={(e)=>{setEndFrom(e.target.value)}}/>
          </div>

          <div className="pt-2 ">
            <h5 className="text-center">Date</h5>
          </div>
          <div>

            <label htmlFor="" className="w-100">Start Date</label>
            <input type="date" className="w-100 rounded-pill px-1" value={StartDate} onChange={(e)=>{setStartDate(e.target.value)}}/>
          </div>
          <div>
            <label htmlFor="" className="w-100">End Date</label>
            <input type="date" className="w-100 rounded-pill px-1" value={EndDate} onChange={(e)=>{setEndDate(e.target.value)}}/>
          </div>

          </div>
      </div>

      <div className="col-10">
        <div className="d-flex justify-content-between px-5">
      <h1 className="text-center">Reports</h1>
      <div className="py-2">
      <select name="" id="" value={List} className="rounded-pill py-2 px-5"
      onChange={(e)=>{
        setSearchfilter({...searchfilter,users:e.target.value})
        // console.log(e.target.value)
      }}
      >
      <option value="">By User</option>
      {List?.map((e)=>{
       
        return(
          <>
          
          <option value={e.id} >{e.vname}</option>
          </>
        )
      })}
        
      </select>
      </div>
      </div>
      <div className="px-5 py-2">
        
          <table class="table">
   <thead className="thead-dark">
   <tr>
              <th>Sr no</th>
              {searchfilter.serchon == "Project"&&
              <><th>Project Title</th>
              <th>Project Technology</th>
              <th>Type Of Project</th>
              <th>Hire Monthly Budget</th>
              <th>Project Process</th>
              <th>Status</th>
              <th>Action</th>
              </>
              }
               {searchfilter.serchon == "Inquiry"&&
              <><th>Inquiry Title</th>
              <th>Inquiry Technology</th>
              <th>Type Of Inquiry</th>
              <th>Hire Monthly Budget</th>
              
              <th>Status</th>
              <th>Action</th>
              </>
              }
               {searchfilter.serchon == "Lead"&&
              <><th>Project Title</th>
              <th>Project Technology</th>
              <th>Type Of Project</th>
              <th>Hire Billing Amount</th>
              <th>Hire Duration</th>
              
              <th>Status</th>
              <th>Action</th>
              </>
              }
            </tr>
  </thead>
  <tbody>
  {currentItem?.map((e,index) => {
            return (
              <tr>
                <td>{index+1}</td>
                {searchfilter.serchon == "Project"&&<>
                <td>{e.vTitleProject}</td>
                <td>{e.vTechnology}</td>
               <td>{e.eTypeOfProject}</td>
                <td>{e.vHireMonthlyBudget}</td>
                <td>{e.projectprogress}</td>
                <td>{e.eStatus}</td>
                <td>
                  <Link to={""}>
                  view
                  </Link>
                </td>
               
                </>}
                {searchfilter.serchon == "Inquiry"&&<>
                <td>{e.vTitle}</td>
                <td>{e.vTechnology}</td>
               <td>{e.eTypeofInquiry}</td>
                <td>{e.vHireMonthlyBudget}</td>
                
                <td>{e.eStatus}</td>
                <td>
                  <Link to={""}>
                  view
                  </Link>
                </td>
               
                </>}
                {searchfilter.serchon == "Lead"&&<>
                <td>{e.vTitleProject}</td>
                <td>{e.vTechnology}</td>
               <td>{e.eTypeOfProject}</td>
                <td>{e.fHireBillingAmount}</td>
                <td>{e.vHireDuration}</td>
                <td>{e.eStatus}</td>
                <td>
                  <Link to={""}>
                  view
                  </Link>
                </td>
               
                </>}
                
              </tr>
            );
          })}
  </tbody>
</table>
<div className="pagination">

<ReactPaginate
breakLabel="..."
nextLabel="next >"
onPageChange={handlePageClick}
pageRangeDisplayed={3}
pageCount={pageCount}
previousLabel="< previous"
renderOnZeroPageCount={null}
breakClassName={'page-item'}
breakLinkClassName={'page-link'}
containerClassName={'pagination'}
pageClassName={'page-item'}
pageLinkClassName={'page-link'}
previousClassName={'page-item'}
previousLinkClassName={'page-link'}
nextClassName={'page-item'}
nextLinkClassName={'page-link'}
activeClassName={'active'}


/>
</div>
</div>

      </div>
    </div>
    
    // <div>
    //   <div>
    //     <div>
    //       <input
    //         type="radio"
    //         name="serchon"
    //         id=""
    //         value={"Project"}
    //         checked={searchfilter.serchon == "Project" ? "checked" : ""}
    //       />
    //       <label htmlFor="">Project</label>
    //       <input
    //         type="radio"
    //         name="serchon"
    //         id=""
    //         value={"Inquiry"}
    //         checked={searchfilter.serchon == "Inquiry" ? "checked" : ""}
    //       />
    //       <label htmlFor="">Inquiry</label>
    //       <input
    //         type="radio"
    //         name="serchon"
    //         id=""
    //         value={"Lead"}
    //         checked={searchfilter.serchon == "Lead" ? "checked" : ""}
    //       />
    //       <label htmlFor="">Lead</label>
    //     </div>
    //     <div>
    //       <label htmlFor="">Technology</label>
    //       <input type="radio" name="" id="" />
    //       <label htmlFor="">Project</label>
    //     </div>
    //     <div>
    //       <label htmlFor="">Title</label>
    //       <input type="radio" name="" id="" />
    //       <label htmlFor="">Project</label>
    //     </div>
    //     <div>
    //       <label htmlFor="">User</label>
    //       <select name="" id="">
    //         <option value=""></option>
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor=""></label>
    //     </div>
    //     <div>
    //       <label htmlFor="">Monthly Budget</label>
    //       <div>
    //         <label htmlFor="">Start</label>
    //       </div>
    //       <div>
    //         <label htmlFor="">End</label>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <label htmlFor="">Starting Date</label>
    //       </div>
    //       <div>
    //         <label htmlFor="">Ending Date</label>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
        // {/* <table>
        //   <thead>
        //     <tr>
        //       <th>Sr No.</th>
        //       {searchfilter.serchon == "Project" ? <th>Project Title</th> : ""}
        //       {searchfilter.serchon == "Project" ? (
        //         <th>Project Technology</th>
        //       ) : (
        //         ""
        //       )}
        //          {searchfilter.serchon !== "Inquiry"?<th>Project Type</th>:""}
        //          {searchfilter.serchon == "Inquiry"?<th>Inquiry Type</th>:""}
        //          {searchfilter.serchon == "Inquiry"?<th>Inquiry Title</th>:""}
        //          {searchfilter.serchon == "Inquiry"?<th>Monthly Budget</th>:""}
        //       {searchfilter.serchon == "Project" ? (
        //         <th>Hire Monthly budget</th>
        //       ) : (
        //         ""
        //       )}
        //       {searchfilter.serchon == "Project" ? (
        //         <th>Project Progress</th>
        //       ) : (
        //         ""
        //       )}
        //       {searchfilter.serchon !== "Project" ? <th> Technology</th> : ""}
        //       {searchfilter.serchon !== "Project" ? <th> Title</th> : ""}
        //       {searchfilter.serchon !== "Project" ? <th> Technology</th> : ""}
        //       {searchfilter.serchon == "Lead" ? (
        //         <th> Hire Billing Amount</th>
        //       ) : (
        //         ""
        //       )}
        //       {searchfilter.serchon == "Lead" ? <th> Hire Duration</th> : ""}
        //       <th> Status</th>
        //     </tr>
        //   </thead>
        // </table> */}
//         <div className="px-5 py-2">
//          <table class="table">
//   <thead className="thead-dark">
//   <tr>
//               <th>Sr No.</th>
//               {searchfilter.serchon == "Project" ? <th>Project Title</th> : ""}
//               {searchfilter.serchon == "Project" ? (
//                 <th>Project Technology</th>
//               ) : (
//                 ""
//               )}
//                  {searchfilter.serchon !== "Inquiry"?<th>Project Type</th>:""}
//                  {searchfilter.serchon == "Inquiry"?<th>Inquiry Type</th>:""}
//                  {searchfilter.serchon == "Inquiry"?<th>Inquiry Title</th>:""}
//                  {searchfilter.serchon == "Inquiry"?<th>Monthly Budget</th>:""}
//               {searchfilter.serchon == "Project" ? (
//                 <th>Hire Monthly budget</th>
//               ) : (
//                 ""
//               )}
//               {searchfilter.serchon == "Project" ? (
//                 <th>Project Progress</th>
//               ) : (
//                 ""
//               )}
//               {searchfilter.serchon !== "Project" ? <th> Technology</th> : ""}
//               {searchfilter.serchon !== "Project" ? <th> Title</th> : ""}
//               {searchfilter.serchon !== "Project" ? <th> Technology</th> : ""}
//               {searchfilter.serchon == "Lead" ? (
//                 <th> Hire Billing Amount</th>
//               ) : (
//                 ""
//               )}
//               {searchfilter.serchon == "Lead" ? <th> Hire Duration</th> : ""}
//               <th> Status</th>
//             </tr>
//   </thead>
//   <tbody>
  
//   </tbody>
// </table>
// </div>
//       </div>
//     </div>


  );
};

export default Reports;
