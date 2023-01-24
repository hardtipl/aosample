import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [companylist, setCompanylist] = useState([]);
  const fetchingallcompanies = async () => {
    try {
      const fetchingcomany = await axios.get(
        `${process.env.REACT_APP_APIURL}/vendor`
      );
      const fetchedcompnies = await fetchingcomany.data;
      setCompanylist(fetchedcompnies.vendorlist);
    } catch (e) {}
  };
  useEffect(() => {
    fetchingallcompanies();
  }, []);
  return (
    <div className="px-5 py-2">
      {/* <h1 className="text-center">Company listing</h1> */}
      {/* <table>
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Company Name</th>
            <th>Go to Contact Person</th>
          </tr>
        </thead>
        <tbody>
          {companylist.map((e, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{e.vCompanyName}</td>
                <td>
                  <Link to={`${e.id}`}>
                    <a>Contact list</a>
                  </Link>
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
            <th>Company Name</th>
            <th>Go to Contact Person</th>
          </tr>
  </thead>
  <tbody>
  {companylist.map((e, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{e.vCompanyName}</td>
                <td>
                  <Link to={`${e.id}`}>
                    <a>Contact list</a>
                  </Link>
                </td>
              </tr>
            );
          })}
  </tbody>
</table>



    </div>
  );
};

export default Index;
