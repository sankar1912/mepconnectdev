import axios from "axios";
import { setJobApplications, setSearchedJob } from "../slice/jobsSlice";

export const registerJobs = (req)=>async (dispatch, getState)=>{
 await axios.post('/api/v1/job/register',req);
  //console.log(response.data);
}

export const getJobById = (_id) => async (dispatch, getState) => {
  const response = await axios.get(`/api/v1/job/search/${_id}`);
  //console.log(response.data.job);
  dispatch(setSearchedJob(response.data.jobs|| response.data.job));
}

export const getUserJobs = (_id="all") => async (dispatch, getState) => {
  const response = await axios.get(`/api/v1/job/search/user/${_id}`);
  //console.log(response.data.jobs);
  dispatch(setSearchedJob(response.data.jobs));
};

//Current User Job List


export const trackMyJobs = ()=>async(dispatch, getState)=>{
  const response = await axios.get('/api/v1/job/trackmyjobs');
  dispatch(setSearchedJob(response.data.jobs))
}


//  Add Job Application

export const addJobApllication = (jobData)=>async(dispatch, getState)=>{
  const {_id}= jobData
  await axios.post(`/api/v1/job/apply/${_id}`, jobData)
  //console.log(response.data)
}


export const trackAppliedJobs =()=>async(dispatch, getState)=>{
  const response = await axios.get('/api/v1/job/trackapplication');
  console.log(response)
  dispatch(setJobApplications(response.data.message.appliedJobs))
}

export const fetchJobSearch = ({ name, job, places, mode, experienceLevels,type }) => async (dispatch, getState) => {
  const params = {};
  if (name) params.name = name;
  if (job) params.job = job;
  if (places && places.length > 0) params.places = places.join(",");
  if (mode && mode.length > 0) params.mode = mode.join(",");
  if(type && type.length>0) params.type= type.join(",")
  if (experienceLevels && experienceLevels.length > 0) params.experienceLevels = experienceLevels.join(",");
  console.log("Params:",params)
  try {
    const response = await axios.get("/api/v1/job/search", { params });
    dispatch(setSearchedJob(response.data.jobs));
  } catch (error) {
    console.error("Failed to fetch job search results:", error);
  }
};
