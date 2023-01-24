import React from "react";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../filter";
import ReactPaginate from "react-paginate";
 


const L_list = ()=>{
  const [selectedFilter,setSelectedFilter] = useState()
  const [FilterName, setFilterName] = useState()
    const [data, setData] = useState([{}]);
    const [pageCount, setpageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItem, setCurrentItem] = useState(null);
    let itemPerPage = 10;



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

  const listapi = async (passFilterParam) => {

    let {signal}=controller
    let apihiturl = `${process.env.REACT_APP_APIURL}/lead?`
    if(selectedFilter?.length>0&&
      FilterName?.length>0)
      {
      
      apihiturl+=`${selectedFilter}=${FilterName}`
    }
    if (!selectedFilter&& FilterName?.length > 0) {
      apihiturl += `filterdata=${FilterName}`
    }
    if(itemOffset>0){
      apihiturl += `&lastlead=${itemOffset}`
    }
    const result = await fetch(apihiturl, {
      signal,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },  
    });

    
    
    const apiresponse = await result.json();
   
    const apicheck = apiresponse?.leadsfound;
    setData(apicheck);
    setCurrentItem(apicheck)
    // console.log(apiresponse.leadscount)
    setpageCount(Math.ceil(apiresponse.leadscount/ itemPerPage))
    
  };

  useEffect(() => {
    listapi();
    
  }, []);

  useEffect(() => {
    // console.log("from currentitem",currentItem);
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
  <Filter tofilterdata={filterapidata} isPage={"lead"}/>
  
  <table class="table">
<thead class="thead-dark">
  <tr>
    {/* <th scope="col">#</th> */}
    <th scope="col">Title</th>
    <th scope="col">Technology</th>
    <th scope="col">Type of Project</th>
    <th scope="col">Hire Resource</th>
    <th scope="col">Hire Billing Amount</th>
    <th scope="col">Hire Duration</th>
    <th scope="col">Status</th>
    <th scope="col">Edit</th>
  </tr>
</thead>


<tbody>
            {data.length>0&&Object.keys(data[0]).length>0?currentItem?.map((e) => {
              // console.log("from the lead list",Object.keys(e).length);
              return (
                <tr>
                  <td data-column="First Name">{e.vTitleProject}</td>
                  <td data-column="Last Name">{e.vTechnology}</td>
                  <td data-column="Job Title">{e.eTypeOfProject}</td>
                  <td data-column="Job Title">{e.vHireResource}</td>
                  <td data-column="Twitter">{e.fHireBillingAmount}</td>
                  <td data-column="Status">{e.vHireDuration}</td>
                  {e.eStatus=="Converted" ?<td className="Converted" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="InProgress" ?<td className="Inprogress" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="Cancelled" ?<td className="Cancelled" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="Rejected" ?<td className="Rejected" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="OnHold" ?<td className="OnHold" data-column="Status">{e.eStatus}</td>:""}
                 {e.eStatus=="No Response From Client" ?<td className="NoResponse" data-column="Status">{e.eStatus}</td>:""}
                 <td data-column="Status">                 
                  <Link to={"/l_edit/" + `${e.id}`}>
                    {" "}
                   Edit
                  </Link>
                  </td>
                </tr>
              );
            })
          :""}
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
export default L_list