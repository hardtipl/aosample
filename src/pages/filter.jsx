import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./filter.css"

const Filter = (props)=>{
const [selectedFilter,setSelectedFilter] = useState()
const [FilterName, setFilterName] = useState()
useEffect(()=>{
	props.tofilterdata({selectedFilter,FilterName})
},[selectedFilter,FilterName])
    return(
        <>
        <div className="container border border-2 rounded-pill   p-2">
	<div className="row" id="search">
		{/* <form id="search-form" action="" method="POST" enctype="multipart/form-data"> */}
      <div className="d-flex search" >
		
    <select onChange={(e)=>{setSelectedFilter(e.target.value)}} name="" id="" className="rounded-pill dropset">

<option value="">--Search All--</option>
<option value="title">Title</option>
<option value="technology">Technology</option>
{props.isPage=="inquiry"&&
<option value="monthlybudget">Monthly Budget</option>
}
{props.isPage=="project"&&
<option value="monthlybudget">Hire Monthly Budget</option>
}
{props.isPage=="lead"&&
<option value="monthlybudget">Hire Billing Amount</option>
}
</select>
			<div className="form-group col-xs-9 ">
				
     
				{selectedFilter=="monthlybudget"?<input className="p-1 rounded-pill" onChange={(e)=>{
					setFilterName(e.target.value)
				}} type="number" placeholder="Numbers Only" />:
				<input className="p-1 rounded-pill" onChange={(e)=>{
					setFilterName(e.target.value)
				}} type="text" placeholder="search here" />}
        {/* {/ <button type="submit" class="btn btn-block btn-primary">Search</button> /} */}
			</div>
      </div>
			<div className="form-group col-xs-3">
				
			</div>
		{/* </form> */}
	</div>
	<div className="row" id="filter">
		{/* <form>
			<div class="form-group col-sm-3 col-xs-6">
				<select data-filter="make" class="filter-make filter form-control">
					<option value="">Select Make</option>
					<option value="">Show All</option>
				</select>
			</div>
			<div class="form-group col-sm-3 col-xs-6">
				<select data-filter="model" class="filter-model filter form-control">
					<option value="">Select Model</option>
					<option value="">Show All</option>
				</select>
			</div>
			<div class="form-group col-sm-3 col-xs-6">
				<select data-filter="type" class="filter-type filter form-control">
					<option value="">Select Type</option>
					<option value="">Show All</option>
				</select>
			</div>
			<div class="form-group col-sm-3 col-xs-6">
				<select data-filter="price" class="filter-price filter form-control">
					<option value="">Select Price Range</option>
					<option value="">Show All</option>
				</select>
			</div>
		</form> */}
	</div>
	<div className="row" id="products">
		
	</div>
</div>
        </>
    )

}

export default Filter