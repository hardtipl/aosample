import React from 'react'
import { useState ,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate()
    const [contactpersonlist,setContactpersonlist]=useState([])
    const {Companyid}=useParams()
    const fetchingallcompanies = async () => {
        try {
          const fetchingcomanyemp = await axios.get(
            `${process.env.REACT_APP_APIURL}/contactperson/${Companyid}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    "Content-Type": "application/json",
                }
            }

          );
          const fetchedcompnies = await fetchingcomanyemp.data;
          console.log(fetchedcompnies.message)
          setContactpersonlist(fetchedcompnies.message);
        } catch (e) {}
      };
      useEffect(() => {
        fetchingallcompanies();
      }, []);

      const handleBack=()=>{
        navigate("/companylist")
      }
  return (
    <div className='px-5 py-2'>
      <button type="submit"  onClick={handleBack} className="mx-auto bg-dark text-white btn btn-outline-dark ">
            Back
          </button>
         {/* <table>
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Contact Person Name</th>
          </tr>
        </thead>
        <tbody>
          {contactpersonlist.map((e, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{e.vName}</td>
                <td>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
       <table class="table">
  <thead className="thead-dark">
  <tr>
            <th>Sr no.</th>
            <th>Contact Person Name</th>
          </tr>
  </thead>
  <tbody>
  {contactpersonlist.map((e, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{e.vName}</td>
                <td>
                  
                </td>
              </tr>
            );
          })}
  </tbody>
</table>
    </div>
  )
}

export default Index