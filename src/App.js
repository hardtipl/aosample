import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './pages/registerupdate/register';
import Login from './pages/login/login';
// import Inquiry from './pages/create_inquiry/c_inquiry';
import Inquiry from './pages/create_inquiry_update/c_inquiry';
import Withoutlogin from './pages/withoutlogin';
import Withlogin from './pages/withlogin';
import SalesDash from './pages/sales_dashboard/sales_dash';
import Ilist from './pages/inquiry_list/i_list';
import Plist from './pages/project_list/p_list';
import Project from './pages/create_project_update/c_project';
import Iedit from './pages/inquiry_edit/i_edit';
import Milestone from './pages/create_milestone/c_milestone';
import P_edit from './pages/project_edit/p_edit';
import Lead from './pages/create_lead/c_lead';
import L_list from './pages/lead_list/l_list';
import L_edit from './pages/lead_edit/l_edit';
import L_project from './pages/lead-project/l_project';
import Auth from './pages/auth';
import AdminDash from './pages/admin_dash/admin_dash';
import CModule from './pages/c_module/c_module';
import M_List from './pages/milestones/m_list';
import Mod_List from './pages/modules/mod_list';
import M_edit from './pages/m_edit/m_edit';
import Mod_edit from './pages/mod_edit/mod_edit';
import Task_List from './pages/task_list/tasklist';
import Ctask from './pages/create_task/create_task';
import Dev_Dash from './pages/Developer_dash/dev_dash';
import Dev_task from './pages/Dev_task/dev_task';
import Not_Found from './pages/not_found/not_found';
import Userrollguard from './pages/userroleguard';
import Task_Edit from './pages/task_edit/Taskedit';
import Companylist from "./pages/companylistings"
import Contactlist from "./pages/contactpersons"
import Dev_Task_Edit from './pages/dev_task_edit/DevTaskEdit';
import Reports from './pages/reports/reports';
import Expanse from "./pages/expanse/expanse";
import Iview from './pages/inquiry view/inquiry_view';
import Income from "./pages/income/income"
import Detailreport from "./pages/reportsdetails/reports"
import { useNavigate } from 'react-router-dom';
import Facebook from './pages/facebooklogin/facebook';
function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Withoutlogin />}>

          <Route path="login" element={<Login />} />
          <Route path="facebooklogin" element={<Facebook />} />
        </Route>

        <Route path='/' element={<Auth />}>
          <Route element={<Withlogin />}>

            <Route path="register" element={<Register />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route element={<Userrollguard usertype={"Sales"}/>}>
            <Route path="sales_dash" element={<SalesDash />} />
            </Route>
            <Route path="inquiry_list" element={<Ilist />} />
            <Route path="project_list" element={<Plist />} />
            <Route path="project/:inquiryid" element={<Project />} />
            <Route path="i_edit/:inquiryid" element={<Iedit />} />
            <Route path="milestone/:projectid" element={<Milestone />} />
            <Route path="p_edit/:projectid" element={<P_edit />} />
            <Route path="lead/:inquiryid" element={<Lead />} />
            <Route path="lead_list" element={<L_list />} />
            <Route path="l_edit/:Leadid" element={<L_edit />} />
            <Route path="lead_project/:Leadid" element={<L_project />} />
            <Route element={<Userrollguard usertype={"Admin"}/>}>
            <Route path="admind" element={<AdminDash />} />
            <Route path="expense" element={<Expanse />} />
            <Route path="income" element={<Income />} />
            <Route path="detailreport" element={<Detailreport />} />
            </Route>
            <Route path="cmodule/:milestoneid" element={<CModule />} />
            <Route path="mlist/:projectid" element={<M_List />} />
            <Route path="modlist/:milestoneid" element={<Mod_List />} />
            <Route path="medit/:projectid/:milestoneid" element={<M_edit />} />
            <Route path="modedit/:moduleid" element={<Mod_edit />} />
            <Route path="ctask/:moduleid" element={<Ctask />} />
            <Route element={<Userrollguard usertype={"Developer"}/>}>
            <Route path="devdash" element={<Dev_Dash />} />
            </Route>
            <Route path="dev_task" element={<Dev_task />} />
            <Route path="not_found" element={<Not_Found />} />
            <Route path="task_list/:moduleid" element={<Task_List />} />
            <Route path="task_edit/:id" element={<Task_Edit />} />
            <Route path="dev_task_edit/:id" element={<Dev_Task_Edit />} />
            <Route path="companylist" element={<Companylist />} />
            <Route path="companylist/:Companyid" element={<Contactlist />} />
            <Route path="reports" element={<Reports />} />
            <Route path="inquiry_view/:inquiryid" element={<Iview />} />
            {/* <Route path="tasklist/:milestoneid" element={<Task_List />} /> */}
            {/* <Route path="ctask/:moduleid" element={<CTask />} /> */}
            {/* <Route path="medit/:milestoneid" element={<M_edit />} /> */}


          </Route>

        </Route>
        {/* <Route path="/404" element={<Page404 />} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
