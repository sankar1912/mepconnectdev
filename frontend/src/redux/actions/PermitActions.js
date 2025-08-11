import axios from "axios";
import { getAuth } from "../slice/AuthSlice";
import { setDonations, setEvents, setJobs, setPosts, setUsers } from "../slice/permitSlice";

export const fetchPermit = ({ fetchData }) => async (dispatch, getState) => {
    try {
        const {auth}=getAuth(getState())
      //console.log("Current State:", { fetchData,dept:auth.user.department });
      
      const response = await axios.post("/api/v1/admin/permit", { fetchData,dept:auth.user.department }); 
      dispatch(setUsers(response.data.results));
    } catch (error) {
      dispatch(setUsers([]))
      console.error("Error fetching permit data:", error);
    }
  };


  export const fetchUserPermit = () => async (dispatch, getState) => {
    try {
        const {auth}=getAuth(getState())
      console.log("Current State:", { user:"user",dept:auth.user.department });
      
      const response = await axios.post("/api/v1/admin/permit", { fetchData:"users",dept:auth.user.department }); 
      dispatch(setUsers(response.data.results));
    } catch (error) {
      dispatch(setUsers([]))
      console.error("Error fetching permit data:", error);
    }
  };
  export const fetchPostsPermit = () => async (dispatch, getState) => {
    try {
        const {auth}=getAuth(getState())

      
      const response = await axios.post("/api/v1/admin/permit", { fetchData:"posts",dept:auth.user.department }); 
      dispatch(setPosts(response.data.results));
    } catch (error) {
      dispatch(setPosts([]))
      console.error("Error fetching permit data:", error);
    }
  };
  export const fetchEventsPermit = () => async (dispatch, getState) => {
    try {
        const {auth}=getAuth(getState())

      
      const response = await axios.post("/api/v1/admin/permit", { fetchData:"events",dept:auth.user.department }); 
      dispatch(setEvents(response.data.results));
    } catch (error) {
      dispatch(setEvents([]))
      console.error("Error fetching permit data:", error);
    }
  };

  export const fetchDonationsPermit = () => async (dispatch, getState) => {
    try {
        const {auth}=getAuth(getState())

      
      const response = await axios.post("/api/v1/admin/permit", { fetchData:"donations",dept:auth.user.department }); 
      dispatch(setDonations(response.data.results));
    } catch (error) {
      dispatch(setDonations([]))
      console.error("Error fetching permit data:", error);
    }
  };

  export const fetchJobsPermit = () => async (dispatch, getState) => {
    try {
        const {auth}=getAuth(getState())
      const response = await axios.post("/api/v1/admin/permit", { fetchData:"jobs",dept:"common" }); 
      dispatch(setJobs(response.data.results));
    } catch (error) {
      dispatch(setJobs([]))
      console.error("Error fetching permit data:", error);
    }
  };

export const updateUserPermitSuccess=(email)=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifyuser/success',{email});
  dispatch(fetchUserPermit())
}

export const updateUserPermitFailure=(email)=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifyuser/failure',{email});
  dispatch(fetchUserPermit())
}

export const updatePostPermitSuccess=({id,email})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifypost/success',{id,email});
  dispatch(fetchPostsPermit())
}

export const updatePostPermitFailure=({email,id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifypost/failure',{email,id});
  dispatch(fetchPostsPermit())
}

export const updateEventPermitSuccess=({email,id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifyevent/success',{email,id:id});
  dispatch(fetchEventsPermit());
}

export const updateEventPermitFailure=({email,id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifyevent/failure',{email,id:id});
  console.log(email,id)
  dispatch(fetchEventsPermit());
}

export const updateDonationSuccess=({email, razorpayUrl, days,id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifydonation/success',{email, url:razorpayUrl, days,id});
  dispatch(fetchDonationsPermit())
} 

export const updateDonationFailure=({id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifydonation/failure',{id});
  dispatch(fetchDonationsPermit());
}

export const updateJobVerified =({id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifyjob/success',{id});
  dispatch(fetchJobsPermit());
}

export const updateJobRejected =({id})=>async(dispatch)=>{
  await axios.post('/api/v1/admin/verifyjob/failure',{id});
  dispatch(fetchJobsPermit())
}