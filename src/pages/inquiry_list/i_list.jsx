import React, { useCallback } from "react";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./i_list.css";
import Filter from "../filter";
import ReactPaginate from 'react-paginate';
// import { usePagination,DOTS } from "../usePagination";
// import '../pagination.css';
// import { useMemo } from "react";



const Ilist = (props)=>{
  const [data, setData] = useState([{}]);
  const [pageCount, setpageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  let itemPerPage = 10;




  const [selectedFilter,setSelectedFilter] = useState()
  const [FilterName, setFilterName] = useState()


  let controller = new AbortController();
  const filterapidata=(filterData)=>{
    setFilterName(filterData.FilterName)
    setSelectedFilter(filterData.selectedFilter)
    if(filterData.FilterName!=undefined){
     controller.abort("change filter value");
    // controller.abort("change filter value");

   }
  }
  useEffect(()=>{
    // if(FilterName?.length>0&& selectedFilter?.length>0){
    //   console.log("fffff")
  
    // }

   listapi()
  },[FilterName])



  

   

  const listapi =  async () => {
    let {signal}=controller
    
    let apihiturl = `${process.env.REACT_APP_APIURL}/inquiry?`
    
    if(selectedFilter?.length>0&&
      FilterName?.length>0)
      {
      
      apihiturl+=`${selectedFilter}=${FilterName}`
    }
    if (!selectedFilter&& FilterName?.length > 0) {
      apihiturl += `filterdata=${FilterName}`
    }
    if(itemOffset>0){
      apihiturl += `&lastinquiry=${itemOffset}`
    }
    // console.log(apihiturl,FilterName)
      const result = await fetch(apihiturl, {
        signal,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const apiresponse = await result.json();
      const apicheck = apiresponse?.inquirylist;
      setData(apicheck);
      setCurrentItem(apicheck)
      // console.log(apiresponse.inquirycount)
      setpageCount(Math.ceil(apiresponse.inquirycount/ itemPerPage))
    
  };

  useEffect(() => {
    listapi();
    
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data]);


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
  listapi();
   
 },[itemOffset])
 
 

    return(
        <>


<Sidebar IsSales={true}/>

<div className='set'>
  <div className="container my-3 body p-5">
    <div className="row "></div>
<div>
  
  <Filter tofilterdata={filterapidata} isPage={"inquiry"}/>
  
  
  <table class="table">
<thead class="thead-dark">
  <tr>
    {/* <th scope="col">#</th> */}
    <th scope="col">Title</th>
    <th scope="col">Technology</th>
    <th scope="col">Type of inquiry</th>
    <th scope="col">Monthly Budget</th>
    <th scope="col">Status</th>
    <th scope="col">View</th>
    <th scope="col">Edit</th>
  </tr>
</thead>


<tbody>
            {currentItem?.map((e) => {
              return (
                <tr>
                  <td data-column="First Name">{e.vTitle}</td>
                  <td data-column="Last Name">{e.vTechnology}</td>
                  <td data-column="Job Title">{e.eTypeofInquiry}</td>
                  <td data-column="Twitter">{e.vHireMonthlyBudget}</td>
                 {e.eStatus=="Converted" ?<td className="Converted" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="InProgress" ?<td className="Inprogress" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="Cancelled" ?<td className="Cancelled" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="Rejected" ?<td className="Rejected" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="OnHold" ?<td className="OnHold" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="No Response From Client" ?<td className="NoResponse" data-column="Status">{e.eStatus}</td>:""}
                 <td data-column="Status">
                 <Link to={"/inquiry_view/" + `${e.id}`}>
                    {" "}
                   View
                  </Link>
                  </td>
                 <td data-column="Status">
                  <Link to={"/i_edit/" + `${e.id}`}>
                    {" "}
                    Edit
                  </Link>
                  </td>
                 
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


        </>
    )

}
export default Ilist