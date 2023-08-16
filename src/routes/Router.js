import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Home = Loadable(lazy(() => import('../Home')))
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Teacher = Loadable(lazy(() => import('../views/Teacher/Teacher')))
const Student = Loadable(lazy(() => import('../views/Student/Student')))
const TeacherAttendence = Loadable(lazy(() => import('../views/Teacher/StaffAttendence')))
const StudentAttendence = Loadable(lazy(() => import('../views/Student/StudentAttendence')))
const Notice = Loadable(lazy(() => import('../views/Notice/Notice.js')))
const Event = Loadable(lazy(() => import('../views/Notice/Event')))
const AddStaff = Loadable(lazy(() => import('../views/utilities/AddStaff')))
const AddStudent = Loadable(lazy(() => import('../views/utilities/AddStudent')))
const AddNotice = Loadable(lazy(() => import('../views/utilities/AddNotice.js')))
const AddExamTimeTable = Loadable(lazy(() => import('../views/utilities/AddExamTimeTable.js')))
const UserLogin = Loadable(lazy(() => import('../views/authentication/auth/UserLogin.js')))
const RegisterParents = Loadable(lazy(() => import('../views/authentication/auth/RegisterParents')))
const FessPayment = Loadable(lazy(() => import('../views/authentication/auth/FessPayment.js')))
const FessSlip = Loadable(lazy(() => import('../views/authentication/auth/FessSlip.js')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Doubts = Loadable(lazy(() => import('../views/utilities/Doubts')));
const Result = Loadable(lazy(() => import('../views/utilities/Result')));
const Study = Loadable(lazy(() => import('../views/utilities/Study')));
const Router = [

  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/school_dashboard', exact: true, element: <Home /> },
      { path: '/', element: <Navigate to="/school_dashboard" /> },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [
    
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/AllStaff', exact: true, element: <Teacher /> },
      { path: '/AllStudent', exact: true, element: <Student /> },
      { path: '/StaffAttendence', exact: true, element: <TeacherAttendence /> },
      { path: '/StudentAttendence', exact: true, element: <StudentAttendence /> },
      { path: '/Notice', exact: true, element: <Notice /> },
      { path: '/Event', exact: true, element: <Event /> },
      { path: '/ui/Addstudent', exact: true, element: <AddStudent /> },
      { path: '/ui/Addstaff', exact: true, element: <AddStaff /> },
      { path: '/ui/Addnotice', exact: true, element: <AddNotice /> },
      { path: '/ui/Addexamtt', exact: true, element: <AddExamTimeTable /> },
      { path: '/auth/UserLogin', exact: true, element: <UserLogin /> },
      { path: '/auth/RegisterParents', exact: true, element: <RegisterParents/> },
      { path: '/auth/fessPayment', exact: true, element: <FessPayment/> },
      { path: '/ui/doubts', exact: true, element: <Doubts /> },
      { path: '/ui/result', exact: true, element: <Result/> },
      { path: '/ui/study', exact: true, element: <Study/> },
      // { path: '/auth/fessSlip', exact: true, element: <FessSlip/> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
          // { path: '/Home', exact: true, element: <Home /> },
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/fessSlip', exact: true, element: <FessSlip/> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
