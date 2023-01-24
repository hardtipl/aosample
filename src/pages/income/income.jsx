import Sidebar from "../sidebar/sidebar";
import { Controller, useForm, useWatch } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";

const Expanse = () => {
  const currencyoptions = [
    { label: '$', value: 'Dollar' },
    { label: 'Inr', value: 'Rupees' }
  ]

  const [options, setOptions] = useState([])
  // const [showcurrencyrate, setShowcurrencyrate] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    watch,

    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Incomedate: '',
      Givenform: 'Cash',
      Amount: '',
      Projectid: '',
      Currencytype: ''
    }
  });
  const watchShowAge = useWatch({
    control,
    name: "Currencytype",
  });
  console.log("firstName", watchShowAge)
  const postingdataonserver = async (data) => {
    try {
      console.log("income data", data)
      const formData = new FormData();
      if (data.transactionfile.length !== 0) {
        formData.append("transactionfile", data.transactionfile)
      }
      formData.append("Incomedate", data.Paiddate)
      formData.append("Expencein", data.Expencein)
      formData.append("Givenform", data.Givenform)
      formData.append("Amount", data.Amount)
      formData.append("Projectid", data.Projectid.value)
      formData.append("Currencytype", data.Currencytype.value)
      formData.append("Currencyrate", data.Currencyrate)
      const postingexpense = await axios.post(
        `${process.env.REACT_APP_APIURL}/transaction/income`, formData

      );
      await postingexpense.data;
      reset();
    } catch (error) {
      console.log(error)
    }
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
  useEffect(() => {
    fetchingprojects()
    return () => {
      // watchShowAge=""
    }
  }, [])
  useEffect(() => console.log("errors", errors), [errors])
  return (
    <>
      <Sidebar IsSales={true} />
      <form onSubmit={handleSubmit(postingdataonserver)}>
       <div className="set">
          {/* <div className="regbody"> */}
            {/* <div className="container"> */}
              {/* <div className="row d-inline-flex  justify-content-between"> */}
                <div >
                  <label htmlFor="">Income Amount</label>
                  <input type="number" {...register('Amount', {
                  required: `Amount is required`,
                  min: {
                  value: 0,
                  message: "Minimum amount should be 0 atleast"
                  },
                  max: 1000000
                  })} 
                  />
                  {errors.Amount && <p className="text-danger">{errors.Amount.message}</p>}
                </div>

                <div>
                  <label htmlFor="">Income Date</label>
                 <div >
                  <Controller
                  
                    control={control}
                    name="Incomedate"
                    rules={{
                      required: {
                        value: true,
                        message: "Please Choose a date"
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched/blur
                        selected={value}
                        minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                        maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
                      />
                    )}
                  />
                  {errors.Incomedate && <p className="text-danger">{errors.Incomedate.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="">Project List</label>
                  <Controller
                    control={control}
                    name="Projectid"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        defaultValue={value}
                        onChange={onChange}
                        options={options}
                      />
                    )}
                  />
                  {errors.Projectid && <p className="text-danger">{errors.Projectid.message}</p>}
                </div>

                <div>
                  <label htmlFor="">Payment Method</label>
                      <div>
                        <label htmlFor="">Chaque</label>
                        <input type="radio" {...register("Givenform")} value={"Chaque"} />
                      </div>
                      <div>
                        <label htmlFor="">Cash</label>
                        <input type="radio" {...register("Givenform")} value={"Cash"} />
                      </div>
                      <div>
                        <label htmlFor="">NEFT</label>
                        <input type="radio" {...register("Givenform")} value={"NEFT"} />
                      </div>
                        {/* <input type="number" {...register('Expencein', { */}
                        {/* required: `Amount is required` */}
                        {/* })} /> */}
                        {errors.Givenform && <p className="text-danger">{errors.Givenform.message}</p>}
                </div>
                <div >
                    <label className="label" htmlFor="">Currency List</label>
                    {/* <input type="number" {...register('Givenform', {
                      required: `Amount is required`
                    })} /> */}
                    <Controller
                    
                      control={control}
                      name="Currencytype"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          defaultValue={value}
                          onChange={onChange}
                          options={currencyoptions}
                        />
                      )}
                    />
                    {errors.Currencytype && <p className="text-danger">{errors.Currencytype.message}</p>}
                </div>
                  {
                    watchShowAge?.value !== "Rupees" && watchShowAge && <>
                      <div>
                        <label htmlFor="">Currency Rate to Inr Per </label>
                        <input type="text"
                          placeholder="Rate of Inr per Currency"
                          {...register("Currencyrate", {
                            required: { value: true, message: "Please Provide me Currency rate" },
                            min: { value: 10, message: "Currency rate can't be less than 10 Rs" },
                            max: { value: 1000, message: "Currency rate can't be greater than 1000 Rs" }
                          })} />
                        {errors.Currencyrate && <p className="text-danger">{errors.Currencyrate.message}</p>}
                      </div>
                    </>
                  }
                <div>
                  <label htmlFor="">Document</label>
                  <input type="file"  {...register("transactionfile")} 
                  className=" form-control rounded-pill mt-2"/>
                </div>
                <button id="Sub-mit" className="mx-auto btn btn-outline-dark w-25" type="submit">Submit</button>


              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
        </div>      
        
        
        



      </form>
    </>
  )
}

export default Expanse