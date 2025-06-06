import { useDispatch } from "react-redux";
import "./App.css";
import { loadUserRequest } from "./features/users/AuthSlice";

import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContainer from "./components/users/AuthContainer";
import Service from "./components/Service";
import SearchFriends from "./components/friends/SearchFriends";
import LandingPage from "./components/College/LandingPage";
import ContactUs from "./components/Contact";
import DonationView from "./components/DonationView";
import Container from "./components/SearchPeople/Container";
import PermitDashboard from "./components/admin/PermitDashboard";
import JobContainer from "./components/searchJobs/JobContainer";
import ViewPosts from "./components/ViewPosts";
import PublicProfile from "./components/PublicProfile";

import FriendsContainer from "./components/friends/FriendsContainer";
import ForgotPassword from "./components/users/ForgotPassword";
import ResetPassword from "./components/users/ResetPassword";
import UserProfile from "./components/Profile/UserProfile";
import CreateJob from "./components/CreateJob";
import ProtectedRoute from "./components/route/ProtectedRoute";

import PaymentRoute from "./components/route/PaymentRoute";
import SuccessPage from "./components/SuccessPage";
import WebhookRoute from "./components/route/WebhookRoute";
import CheckOut from "./components/Payments/CheckOut";
import UserTransactions from "./components/Profile/UserTransactions";
import JobPage from "./components/searchJobs/JobPage";
import ViewJob from "./components/ViewJob";
import JobApplication from "./components/JobApplication";
import AdminRoute from "./components/route/AdminRoute";
import JobTracker from "./components/searchJobs/JobTracker";
import useShare from "./components/hooks/useShare";


function App() {
  const dispatch = useDispatch();
  const [start,setStart]=useState(false);
  useEffect(() => {
    dispatch(loadUserRequest());
  }, [dispatch]);
  useEffect(()=>{
    setStart(localStorage.getItem('start'))
  },[])

  const {show, ModalUI} = useShare();
 
  return (
    <div className="App" >
      {
        start ?(<>
        <Header />
          <div style={{marginTop:'5%'}}>
          <Routes>
            <Route path="/" element={<Service/>} />
            <Route path="/login" element={<AuthContainer/>}/> 
            <Route path="/myprofile" element={<UserProfile />} />
            <Route path="/friends" element={<FriendsContainer />} />
            
            <Route path="/donations/view/:_id" element={<DonationView />}/>
            <Route path="/post/view/:_id" element={<ViewPosts/>}/>
            <Route path="/searchpeople" element={<Container/>}/>
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/erp/requests" element={<AdminRoute><PermitDashboard show ={show}/></AdminRoute>}/>
            <Route path="/publicprofile/:_id" element={<PublicProfile/>}/>
            <Route path="/user/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/request/resetpassword/:token" element={<ResetPassword/>}/>
            
            <Route path ="/jobs" element={<JobPage/>}/>
            <Route path ="/job/view/:_id" element={<ViewJob show={show}/>}/>
            <Route path="/searchfriends" element={<SearchFriends />}/>
            <Route path="/jobs/search" element={<JobPage option={0} />}/>
            <Route path="/jobs/create" element={<ProtectedRoute><CreateJob open={true}   /></ProtectedRoute>}/>
            <Route path="/jobs/applied" element={<ProtectedRoute><JobPage option={2}/></ProtectedRoute>}/>
            <Route path="/job/apply/:_id" element={<ProtectedRoute><JobApplication/></ProtectedRoute>}/>
            <Route path ="/job/track/:_id" element={<ProtectedRoute><JobTracker/></ProtectedRoute>}/>


            <Route path="/payment/checkout" element={<PaymentRoute><CheckOut/></PaymentRoute>}/>
            <Route path="/payment/redirect/success" element={<WebhookRoute><SuccessPage/></WebhookRoute>}/>


            <Route path ="/profile/payments" element={<ProtectedRoute><UserTransactions/></ProtectedRoute>}/>

          </Routes>
          {ModalUI}
          </div></>):(<><LandingPage setStart={setStart}/></>)
      }
    </div>
  );
}

export default App;
