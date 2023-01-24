import React from "react";
import Sidebar from "../sidebar/sidebar";
// import { useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from 'axios'

const Expanse = () => {
 
  const options = [
    { value: 'Internet', label: 'Internet' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Tea/Coffee', label: 'Tea/Coffee' },
    { value: 'Housekeeping', label: 'Housekeeping' },
    { value: 'Grocerry', label: 'Grocerry' },
    { value: 'Linkdin Renewal', label: 'Linkdin Renewal' },
    { value: 'Hardware Purchase', label: 'Hardware Purchase' },
    { value: 'Plumbing', label: 'Plumbing' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Maintainance', label: 'Maintainance' },
    { value: 'Water', label: 'Water' },
    { value: 'Cabe', label: 'Cabe' },
  ];
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Paiddate: '',
      Expencein:
      {value: 'Internet', label: 'Internet'},
      Givenform:'Cash',
      Amount:0
    }
  });
  const postingdataonserver = async (data) => {
    try {
    const formData = new FormData();
if(data.transactionfile.length!==0){
formData.append("transactionfile",data.transactionfile)
}
formData.append("Paiddate",data.Paiddate)
formData.append("Expencein",data.Expencein.value)
formData.append("Givenform",data.Givenform)
formData.append("Amount",data.Amount)
  const postingexpense = await axios.post(
    `${process.env.REACT_APP_APIURL}/transaction/expense`,formData

  );
  await postingexpense.data;
  reset(); 
} catch (error) {
  
}
  }
  
  return (
    <>
      <Sidebar IsSales={true} />
      <form onSubmit={handleSubmit(postingdataonserver)}>
        <div className="set">
        <div>
          <label htmlFor="">Expense Amount</label>
          <input type="number" {...register('Amount', {
            required: `Amount is required`,
            min:{
              value:0,
              message:"Minimum amount should be 0 atleast"
            },
            max:1000000
          })} />
          {errors.Amount && <p className="text-danger">{errors.Amount.message}</p>}
        </div>
        <div className="rounded-pill " >
          <label htmlFor="">Select Date</label>
          <Controller
            control={control}
            name="Paiddate"
            
            rules={{ required: {
              value:true,
              message:"Please Choose a date"
            } }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                selected={value}
                minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
              />
            )}
          />
          {errors.Paiddate && <p className="text-danger">{errors.Paiddate.message}</p>}
        </div>
        <div>
          <label htmlFor="">Expense In</label>
          {/* <input type="number" {...register('Givenform', {
            required: `Amount is required`
          })} /> */}
           <Controller
            control={control}
            name="Expencein"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
              defaultValue={value}
              onChange={onChange}
              options={options}
      />
            )}
            
          />
           {errors.Expencein && <p className="text-danger">{errors.Expencein.message}</p>}
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
          {/* <input type="number" {...register('Expencein', { */}
            {/* required: `Amount is required` */}
          {/* })} /> */}
          {errors.Givenform && <p className="text-danger">{errors.Givenform.message}</p>}
        </div>
        <div>
          <label htmlFor="">Document</label>
          <input  type="file"  {...register("transactionfile")} />
        </div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Expanse