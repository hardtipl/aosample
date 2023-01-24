import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import Filter from "../filter";
import ReactPaginate from "react-paginate";

const Plist = () => {
  const [selectedFilter, setSelectedFilter] = useState()
  const [FilterName, setFilterName] = useState()
  const [pageCount, setpageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  let itemPerPage = 10;



  let controller = new AbortController();
  const filterapidata = (filterData) => {
    setFilterName(filterData.FilterName)
    setSelectedFilter(filterData.selectedFilter)
    setItemOffset(0)
    if (filterData.FilterName != undefined) {
      controller.abort("change filter value");
      // controller.abort("change filter value");

    }
  }
  useEffect(() => {
    // if(FilterName?.length>0&& selectedFilter?.length>0){
    //   console.log("fffff")

    // }

    listapi()
  }, [FilterName])

  const [data, setData] = useState([]);

  const listapi = async (passFilterParam) => {
    let { signal } = controller
    // console.log("signal",signal)
    let apihiturl = `${process.env.REACT_APP_APIURL}/projects?`
    if(selectedFilter?.length>0&&
      FilterName?.length>0)
      {
      
      apihiturl+=`${selectedFilter}=${FilterName}`
    }
    if (!selectedFilter&& FilterName?.length > 0) {
      apihiturl += `filterdata=${FilterName}`
    }
    if(itemOffset>0){
      apihiturl += `&lastproject=${itemOffset}`
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
    // console.log(apiresponse);
    const apicheck = apiresponse?.userid;


    setData(apicheck);
    setCurrentItem(apicheck)
    // console.log(apiresponse.projectcount)
    setpageCount(Math.ceil(apiresponse.projectcount/ itemPerPage))

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
 

  return (
    <>


      <Sidebar IsSales={true} />

      <div className='set'>
        <div className="container my-3 body p-5">
          <div className="row "></div>
          <div>
            <Filter tofilterdata={filterapidata} isPage={"project"} />

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Title</th>
                  <th scope="col">Technology</th>
                  <th scope="col">Type of project</th>
                  <th scope="col">Hire Monthly Budget</th>
                  <th scope="col">Status</th>
                  {/* <th scope="col">Monthly Budget</th> */}

                  <th scope="col">Edit</th>
                  <th scope="col">Progress</th>
                </tr>
              </thead>


              <tbody>
                {currentItem?.map((e) => {
                  // console.log(e);
                  return (
                    <tr>
                      <td data-column="First Name">{e.vTitleProject}</td>
                      <td data-column="Last Name">{e.vTechnology}</td>
                      <td data-column="Job Title">{e.eTypeOfProject}</td>
                      <td data-column="Job Title">{e.vHireMonthlyBudget}</td>
                      {e.eStatus == "Converted" ? <td className="Converted" data-column="Status">{e.eStatus}</td> : ""}
                      {e.eStatus == "InProgress" ? <td className="Inprogress" data-column="Status">{e.eStatus}</td> : ""}
                      {e.eStatus == "Cancelled" ? <td className="Cancelled" data-column="Status">{e.eStatus}</td> : ""}
                      {e.eStatus == "Rejected" ? <td className="Rejected" data-column="Status">{e.eStatus}</td> : ""}
                      {e.eStatus == "OnHold" ? <td className="OnHold" data-column="Status">{e.eStatus}</td> : ""}
                      {e.eStatus == "No Response From Client" ? <td className="NoResponse" data-column="Status">{e.eStatus}</td> : ""}

                      {/* <td data-column="Status">{e.fCostOfProject}</td> */}
                      <Link to={"/p_edit/" + `${e.id}`}>
                        {" "}
                        <td data-column="Status">Edit</td>
                      </Link>
                      <td data-column="Job Title">{Math.ceil( e.projectprogress) + "%"}</td>
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

export default Plist