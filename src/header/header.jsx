import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"
import { Link } from "react-router-dom";
const Header = ({ usertype }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">


          {usertype === "Sales" &&

            <div style={{ width: "30%", height: "150%", zIndex: "100000", marginRight: "auto" }} >
              <ul className="navlist" style={{ display: "inline-flex " }}>
                <Link to="/sales_dash" style={{ color: "white", padding: "0 15px" }}> <li  > Dashboard</li></Link>
                {/* <select name="" id="">
                  <option value="">
                </option>
                </select> */}
                <Link to="/inquiry_list" style={{ color: "white", padding: "0 15px" }}> <li> Inquiries</li></Link>


                <Link to="/project_list" style={{ color: "white", padding: "0 15px" }}> <li> Projects</li></Link>
                <Link to="/lead_list" style={{ color: "white", padding: "0 15px" }}> <li> Leads</li></Link>
              </ul>
            </div>

          }


          {usertype == "Sales" && <span>


            <a href="/inquiry" className="li-link mx-4"> Create Inquiry</a>

            <button onClick={handleLogout} className="bg-dark border-0"><a href="#" className="btn btn-light rounded-pill">Logout</a></button>
          </span>}

          {usertype == "Admin" &&

            <div style={{ width: "30%", height: "150%", zIndex: "100000", marginRight: "auto" }} >
              <ul className="navlist" style={{ display: "inline-flex " }}>
                <Link to="/admind" style={{ color: "white", padding: "0 15px" }}> <li > Dashboard</li></Link>
                {/* <select name="" id="" className="bg-dark text-white border-0 ">
                  <option value="">
                <Link to="/inquiry_list" style={{ color: "white", padding: "0 15px" }}> <li> Inquiries</li></Link>
                </option>
                </select> */}
                <Link to="/inquiry_list" style={{ color: "white", padding: "0 15px" }}> <li> Inquiries</li></Link>
                <Link to="/project_list" style={{ color: "white", padding: "0 15px" }}> <li> Projects</li></Link>
                <Link to="/lead_list" style={{ color: "white", padding: "0 15px" }}> <li> Leads</li></Link>
                <Link to="/companylist" style={{ color: "white", padding: "0 15px" }}> <li> Companies</li></Link>
                <Link to="/reports" style={{ color: "white", padding: "0 15px" }}> <li>Reports</li></Link>
                <Link to="/detailreport" style={{ color: "white", padding: "0 15px" }}><li>DetailedReport</li></Link>
                <Link to="/income" style={{ color: "white", padding: "0 15px" }}><li>Income</li></Link>
                <Link to="/expense" style={{ color: "white", padding: "0 15px" }}><li>Expense</li></Link>


              </ul>
            </div>

          }
          {usertype == "Admin" && <span>


            <Link to="/register"  className="li-link mx-4">Register User</Link>
            <Link to="/inquiry"  className="li-link mx-4">Create Inquiry</Link>

            <button onClick={handleLogout} className="bg-dark border-0"><a href="#" className="btn btn-light rounded-pill">Logout</a></button>
          </span>}


          {usertype == "Developer" &&

            <div style={{ width: "30%", height: "150%", zIndex: "100000", marginRight: "auto" }} >
              <ul className="navlist" style={{ display: "inline-flex " }}>
                <Link to="/devdash" style={{ color: "white", padding: "0 15px" }}> <li> Dashboard</li></Link>
                <Link to="/dev_task" style={{ color: "white", padding: "0 15px" }}> <li> Tasks</li></Link>
              </ul>
            </div>

          }

          {usertype == "Developer" && <span>




            <button onClick={handleLogout} className="bg-dark border-0"><a href="#" className="btn btn-light rounded-pill">Logout</a></button>
          </span>}
        </div>
      </nav>
    </>
  )
}


export default Header