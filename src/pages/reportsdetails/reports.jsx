import React, { useState } from "react";
import "./reports.css"
import { useEffect } from "react";
import Select from "react-select";
import Chart from "chart.js/auto"
import { Doughnut, Line, Bar } from "react-chartjs-2"
import axios from "axios";
const Reports = () => {
  const chartoptions = {
    plugins: {
    title: {
      display: true,
      text: 'years transaction '
    }
  },
  responsive: true,
  }
  const optionschart = {
  plugins: {
    title: {
      display: true,
      text: 'Rupees earned from Sales',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
  const [searchfilter, setSearchfilter] = useState({
    serchon: "Sales",
    technology: "",
    title: "",
    users: undefined
  });
  const [options, setOptions] = useState([])
  const [devdetails, setDevdetails] = useState([])
  const [chartdata, setChartdata] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'expense',
        data: [12, 19, 3, 5, 2, 3],
        // data: [10, 17, 3, 5, 2, 13],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: [10, 17, 3, 5, 2, 13],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
      {
        label: 'Income2',
        // data: [12, 19, 3, 5, 2, 3],
        data: [10, 17, 3, 5, 2, 13],
        backgroundColor: 'pink',
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
      {
        label: 'Income3',
        // data: [12, 19, 3, 5, 2, 3],
        data: [10, 17, 3, 5, 2, 13],
        backgroundColor: 'red',
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  });
  const [chartdatadollar, setChartdatadoallar] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'expense',
        data: [12, 19, 3, 5, 2, 3],
        // data: [10, 17, 3, 5, 2, 13],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Income',
        data: [10, 17, 3, 5, 2, 13],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Income2',
        // data: [12, 19, 3, 5, 2, 3],
        data: [10, 17, 3, 5, 2, 13],
        backgroundColor: 'pink',
        stack: 'Stack 0',
        borderWidth: 1,
      },
      {
        label: 'Income3',
        // data: [12, 19, 3, 5, 2, 3],
        data: [10, 17, 3, 5, 2, 13],
        backgroundColor: 'red',
        borderWidth: 1,
      },
    ],
  });
  const [StartDate, setStartDate] = useState("")
  const [EndDate, setEndDate] = useState("")
  // const [isActive, setActive] = useState(false);
  const [selecteproject, setSelecteproject] = useState(false);
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setSearchfilter({ ...searchfilter, [name]: value })
  }
  const [defaultview, setDefaultview] = useState('Income');
  const [income, setIncome] = useState([])
  const [expense, setExpense] = useState([])
  const [expensechart, setExpensechart] = useState(
    {
      labels: ['2023-1', '2023-2'],
    datasets: [
      {
        label: 'expense',
        data: [12, 19],
        // data: [10, 17, 3, 5, 2, 13],
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Income',
        data: [10, 17],
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Income2',
        data: [10, 17],
        backgroundColor: 'pink',
        stack: 'Stack 0',
        borderWidth: 1,
      },
      {
        label: 'Income3',
        data: [8, 17],
        backgroundColor: 'red',
        borderWidth: 1,
      },
    ],  
    }
  )
  const [data, setData] = useState()
  useEffect(() => {
    return () => {
      setDefaultview('')
    }
  }, [])

  const apicall = async () => {
    let chartapiurl = `${process.env.REACT_APP_APIURL}/reports/chart?`
    let apiurl = `${process.env.REACT_APP_APIURL}/reports/detailreport?`
    if (searchfilter.serchon) { apiurl = `${apiurl}searchon=${searchfilter.serchon}&` }
    if (StartDate?.length > 0) {
      apiurl = `${apiurl}startingdate=${StartDate}&`
      chartapiurl = `${chartapiurl}startingdate=${StartDate}&`
    }
    if (EndDate?.length > 0) {
      apiurl = `${apiurl}endingdate=${EndDate}&`
      chartapiurl = `${chartapiurl}endingdate=${EndDate}&`
    }
    if (selecteproject) apiurl = `${apiurl}projectid=${selecteproject.value}&`
    const hitcall = await fetch(
      apiurl,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
    const chartcall = await fetch(
      chartapiurl,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
    const chart = await chartcall.json()
    const chartdetails = chart.Message
    let labels = []
    let expensedata = []
    let incomedatainr = []
    let incomedatadollar = []
    for (const incomelables of chartdetails.income) {
      if (!labels.includes(incomelables.dIncomedate)) {
        labels.push(incomelables.dIncomedate)
        if (incomelables.vCurrencytype === "INR") incomedatainr.push(incomelables.amountearned)
        else incomedatadollar.push(incomelables.amountearned)
      }
      else if (incomelables.vCurrencytype === "INR") {
        let putposition = labels.indexOf(incomelables.dIncomedate)
        incomedatainr[putposition] = incomelables.amountearned
      }
      else {
        let putposition = labels.indexOf(incomelables.dIncomedate)
        incomedatadollar[putposition] = incomelables.amountearned
      }

    }
    for (const expenselables of chartdetails.expense) {
      if (!labels.includes(expenselables.dcreatedate)) {
        labels.push(expenselables.dcreatedate);
        expensedata.push(expenselables.amountgone)
      }
      else {
        let putposition = labels.indexOf(expenselables.dcreatedate)
        // expensedata.splice(putposition, 0, expenselables.amountgone)
        expensedata[putposition] = expenselables.amountgone
      }
    }
    setChartdata({
      labels,
      datasets: [
        {
          label: 'IncomeInr',
          data: incomedatainr,
          backgroundColor: '#4280FF',
          stack: 'Stack 0',
          borderWidth: 1
        },
        {
          label: 'Income$',
          data: incomedatadollar,
          backgroundColor: '#B0C65C',
          stack: 'Stack 0',
          borderWidth: 1

        },
        {
          label: 'expense',
          data: expensedata,
          backgroundColor: '#F4C2C2',
          stack: 'Stack 1',
          borderWidth: 1

        }
      ]
    })
    const result = await hitcall.json()
    let check = result.Message
    if (searchfilter.serchon === "Transaction") {
      // here extracting the expence type category wise
      let expenses=chartdetails.expensetype
      let expencetype=[]
      let charrtexpense=[]
      let labels=[]
      for (const expenceofmonth of expenses) {
        if(!expencetype.includes(expenceofmonth.vexpensetype)){
          expencetype.push(expenceofmonth.vexpensetype)
        }
        if(!labels.includes(`${expenceofmonth.spendyear}-${expenceofmonth.spendmonth}`)){
          labels.push(`${expenceofmonth.spendyear}-${expenceofmonth.spendmonth}`)
        }
      }
       // formating data for display expense chart on expense category.
      for (const chartlabel of expencetype) {
        let filterdataforlabels=expenses.filter((expenseobj) => {
          if(expenseobj.vexpensetype===chartlabel){
            return expenseobj
          }
        })
        let spendmoney=[]
        for (const amount of filterdataforlabels) {
          spendmoney.push(amount.Amountspend)
        }
        charrtexpense.push( {
          label:chartlabel ,
          data: spendmoney,
          borderWidth: 1,
          stack: 'Stack 1',
        })
      }
      setExpensechart(
        {
          labels,
          datasets:charrtexpense
        }
      )
      check = result.Message
      setExpense(check.expense)
      setIncome(check.income)
    }
    else if (searchfilter.serchon === "Sales") {
      let useridlist = []
      let datalist = []
      for (const saleslist of check.fetchingonsales) {
        debugger
        if (!useridlist.includes(saleslist.userid)) {
          useridlist.push(saleslist.userid)
          let updateondetaillist = useridlist.indexOf(saleslist.userid)
          datalist.push({ ...saleslist })
          if (saleslist.projecttypeofhire) datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["project_" + saleslist.projecttypeofhire]: saleslist.projectcreated }
          if (saleslist.inquiryhire) datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["inquiry_" + saleslist.inquiryhire]: saleslist.inquirycreated }
          if(saleslist.eTypeOfProject==="Project Basis")datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["project_projectbasis"]: saleslist.projectcreated }
          if(saleslist.eTypeofInquiry==="Project Basis")datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["inquiry_projectbasis"]: saleslist.inquirycreated }
        }
        else {
          let userid = saleslist.userid
          let updateondetaillist = useridlist.indexOf(userid)
          if (saleslist.projecttypeofhire&&saleslist.eTypeOfProject==="Hire") datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["project_" + saleslist.projecttypeofhire]: saleslist.projectcreated }
          if (saleslist.inquiryhire&& saleslist.eTypeofInquiry==="Hire") datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["inquiry_" + saleslist.inquiryhire]: saleslist.inquirycreated }
          if(saleslist.eTypeOfProject==="Project Basis")datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["project_projectbasis"]: saleslist.projectcreated }
          if(saleslist.eTypeofInquiry==="Project Basis")datalist[updateondetaillist] = { ...datalist[updateondetaillist], ["inquiry_projectbasis"]: saleslist.inquirycreated }
        }
      }
      let labels = []
      let usernamedata = []
      for (const saleslist of chartdetails.sales) {
        if (!labels.includes(saleslist.dIncomedate) && saleslist.dIncomedate) {
          labels.push(saleslist.dIncomedate);
        }
        if (!usernamedata.includes(saleslist.vname)) {
          usernamedata.push(saleslist.vname);
        }
      }
      let updatedcharddata = []
      let updateddollardata = []
      for (const username of usernamedata) {
        // debugger
        let userwiseinr = chartdetails.sales.filter((salesinfo) => {
          if (salesinfo.vname === username && salesinfo.vCurrencytype === "INR") {
            return salesinfo
          }
        })
        let userwisedollar = chartdetails.sales.filter((salesinfo) => {
          if (salesinfo.vname === username && salesinfo.vCurrencytype === "$") {
            return salesinfo
          }
        })
        let earnedrs = labels.map((year) => {
          let earnedamount = 0
          for (const inrs of userwiseinr) {
            if (inrs.dIncomedate === year) {
              earnedamount = inrs.earnedpermonth

            }
          }
          return earnedamount
        })
        let earneddollars = labels.map((year) => {
          let earnedamount = 0
          for (const inrs of userwisedollar) {
            if (inrs.dIncomedate === year) {
              earnedamount = inrs.earnedpermonth
            }
          }
          return earnedamount
        })
        updatedcharddata.push({
          label: username,
          data: earnedrs
          // stack: `Stack ${i}`
        })
        updateddollardata.push({
          label: username,
          data: earneddollars
        })
      }

      setChartdata({
        labels,
        datasets: updatedcharddata
      })
      setChartdatadoallar({
        labels,
        datasets: updateddollardata
      })
      console.log("useridlist", useridlist)
      check = datalist
    }
    else {
      check = result.Message.onbenchlist
      let devedetails = result.Message.devedetails
      console.log("devedetails",devedetails)
      let developerslist = []
      let developersdata = []
      for (const developer of devedetails) {
        debugger
        if (!developerslist.includes(developer.vname)) {
          developerslist.push(developer.vname)
          // developersdata.push({ vname: developer.vname, id: developer.userid, projectstitle: developer.vTitleProject })
          developersdata.push(developer)
        }
        else {
          let postionofdeveloper = developerslist.indexOf(developer.vname)
          let previouseprojecttitles=developersdata[postionofdeveloper]
          developersdata[postionofdeveloper] = { ...developersdata[postionofdeveloper], projectstitle: previouseprojecttitles }
        }
      }
      console.log("developersdata",developersdata)
      setDevdetails(developersdata)
    }
    console.log("check", check)
    setData(check)
  }
  useEffect(() => {
    apicall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchfilter, StartDate, EndDate, selecteproject])

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    fetchingprojects()
    return () => {
    }
  }, [])
  useEffect(() => {
    setSelecteproject('')
  }, [searchfilter])
  // searchfilter

  const handleReset = () => {
    setSearchfilter({
      serchon: "Sales",
      technology: "",
      title: "",
      users: undefined
    })
    setStartDate("")
    setEndDate("")
  }
  const fetchingprojects = async () => {
    const Projectfetching = await axios.get(
      `${process.env.REACT_APP_APIURL}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      }
    }
    );
    const projectlist = await Projectfetching.data;
    console.log("projectlist", projectlist)
    let listofproject = []
    for (const projects of projectlist?.userid) {
      let createobj = {}
      createobj.value = projects.id
      createobj.label = projects.vTitleProject
      listofproject.push(createobj)
    }
    setOptions(listofproject)
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
              value={"Sales"}
              checked={searchfilter.serchon === "Sales" ? "checked" : ""}
            />

            <label htmlFor="">Sales</label>
          </div>
          <div className="w-100">
            <input
              type="radio"
              onChange={handleChange}
              name="serchon"
              id=""
              value={"Developer"}
              checked={searchfilter.serchon === "Developer" ? "checked" : ""}
            />
            <label htmlFor="">Developer</label>
          </div>
          <div className="w-100">
            <input
              type="radio"
              onChange={handleChange}
              name="serchon"
              id=""
              value={"Transaction"}
              checked={searchfilter.serchon === "Transaction" ? "checked" : ""}
            />
            <label htmlFor="">Transaction</label>
          </div>
          <div className="pt-2 ">
            <h5 className="text-center">Date</h5>
          </div>
          <div>

            <label htmlFor="" className="w-100">Start Date</label>
            <input type="date" className="w-100 rounded-pill px-1" value={StartDate} onChange={(e) => { setStartDate(e.target.value) }} />
          </div>
          <div>
            <label htmlFor="" className="w-100">End Date</label>
            <input type="date" className="w-100 rounded-pill px-1" value={EndDate} onChange={(e) => { setEndDate(e.target.value) }} />
          </div>

        </div>
      </div>
      <div className="col-10"  >
        <div className="d-flex justify-content-between px-5">
          <h1 className="text-center">Reports Detail</h1>
          <div className="py-2">

          </div>
        </div>
        <div className="py-2">
          <div className="row">
            {searchfilter.serchon === "Transaction" && defaultview === 'Income' &&
              <>
                <div className="col-12">
                  <div className="d-flex justify-content-center">
                    <button className="col-2">Income</button>
                    <button className="col-2" onClick={() => setDefaultview("Expense")}>Expense</button>
                  </div>
                  <div>
                    <h1>Income</h1>
                    <Select
                      defaultValue={selecteproject}
                      onChange={e => setSelecteproject(e)}
                      options={options}
                    />
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Projectname</th>
                        <th>Amount</th>
                        <th>Income Came By</th>
                        <th>Currency </th>
                        <th>Currency  Rate</th>
                        <th>Paid Date</th>
                        <th>Document </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        income?.map((incomedetail, index) => {
                          console.log(incomedetail)
                          return (
                            <tr>
                              <td>{"Proj" + incomedetail.iProjectid}</td>
                              <td>{incomedetail.projecttitle}</td>
                              <td>{incomedetail.totalmountpaid}</td>
                              <td>{incomedetail.eTypecash}</td>
                              <td>{incomedetail.vCurrencytype}</td>
                              <td>{incomedetail?.iCurrencyrate}</td>
                              <td>{new Date(incomedetail.dIncomedate).toDateString()}</td>
                              <td>{incomedetail?.vDocumentpath}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </>
            }
            {searchfilter.serchon === "Transaction" && defaultview === 'Expense' &&
              <>
                <div className="col-12">
                  <div className="d-flex justify-content-center">
                    <button className="col-2" onClick={() => setDefaultview("Income")}>Income</button>
                    <button className="col-2">Expense</button>
                  </div>
                  <h1>Expense</h1>
                  <table className="table table-bordered">
                    <thead>
                      <tr>

                        <th>Expense Cash/Chaque </th>
                        <th>Amount</th>
                        <th>Expense Reason</th>
                        <th>Paid Date</th>
                        <th>Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        expense.map((expensedetail, index) => {
                          console.log(expensedetail)
                          return (
                            <tr>
                              <td>{expensedetail.eGivenform}</td>
                              <td>{expensedetail.toalpaid}</td>
                              <td>{expensedetail.vexpensetype}</td>
                              <td>{new Date(expensedetail.dcreatedate).toDateString()}</td>
                              <td>{expensedetail.vDocumentpath}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </>

            }
          </div>
        </div>
        <div className="px-5 py-2">
          {searchfilter.serchon === "Developer" &&
            <>
              <h1>Developers on Bench</h1>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.length > 0 ? data.map((listofusers, index) => {
                      console.log(listofusers)
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{listofusers.vname}</td>
                        </tr>
                      )
                    }) : ""
                  }
                </tbody>
              </table>

              <h1>Developers List with Projects</h1>
              {devdetails.map((developer) => {
                console.log("developer",developer)
                return (
                  <div className="row">
<div className="col-3">{developer.vname}</div>
<div className="col-9">{developer.vTitleProject}</div>

                  </div>
                )
              })
              }
            </>
          }
        </div>
        <div className="py-2">

          {searchfilter.serchon === "Sales" &&
            <>
              <h1>
                Sales
                
              </h1>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th colSpan={4} >
                      Inquirys
                     
                    </th>
                    <th colSpan={4}>Projects
                     
                    </th>
                    <tr>
                      <th colSpan={3}>Hire</th>
                      <th colSpan={3}>Project</th>
                    </tr>
                    <tr >
                    
                     <td>Monthly</td>
                     <td>Weekly</td>
                    <td>Hourly</td>
                      </tr>
                      <tr >
                          <td></td>
                      
                        <td>Monthly</td>
                        <td>Weekly</td>
                        <td>Hourly</td>
                      </tr>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.length > 0 ? data.map((listofusers, index) => {
                      console.log(listofusers)
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{listofusers.vname}</td>
                          <td>
                            <tr>
                              <td>{listofusers.inquiry_Monthly ? listofusers.inquiry_Monthly : ''}</td>
                              <td>{listofusers.inquiry_Weekly ? listofusers.inquiry_Weekly : ''}</td>
                              <td>{listofusers.inquiry_Hourly ? listofusers.inquiry_Hourly : ''}</td>
                            </tr>
                          </td>
                          <td>
                            <tr>
                              <td>{listofusers.project_Monthly ? listofusers.project_Monthly : ''}</td>
                              <td>{listofusers.project_Weekly ? listofusers.project_Weekly : ''}</td>
                              <td>{listofusers.project_Hourly ? listofusers.project_Hourly : ''}</td>
                              {/* inquiry_projectbasis */}
                            </tr>
                          </td>
                        </tr>
                      )
                    }) : ""
                  }
                </tbody>
              </table>
            </>
          }
        </div>
        <div className="row">
          <div className="col-md-6">
            <Bar data={chartdata} 
            options={optionschart} 
            />
          <Bar data={expensechart} 
          options={chartoptions} 
          />
          </div>
          {searchfilter.serchon === "Sales" &&
            <div className="col-md-6">
              <Bar data={chartdatadollar} 
              options={chartoptions} 
              />
            </div>
          }
        </div>
      </div>
    </div>



  );
};

export default Reports;
