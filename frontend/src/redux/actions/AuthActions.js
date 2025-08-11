import axios from "axios";
import { setError, setLoading, setStatusFail, setStatusIdle, setStatusSuccess, setUser, setUserLoggedOut } from "../slice/AuthSlice";
import { setMessage } from "../slice/notificationSlice";

export const logOutRequest=()=>async(dispatch)=>{
    dispatch(setLoading());
    try{
        const response= await axios.get("/api/v1/logout");
        dispatch(setUserLoggedOut());
        dispatch(setStatusIdle());
    }catch(err){
        dispatch(setError(err.message))
    }
}

export const loadUserRequest = () => async (dispatch) => {
  dispatch(setLoading());
  
  try {
    
    const response = await axios.get("/api/v1/loaduser", { withCredentials: true });
    dispatch(setUser(response.data.user));
    console.log("Sending message")
    dispatch(setMessage("Welcome, back!!"));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};


export const loginRequest=(userData)=>async (dispatch)=>{
    dispatch(setLoading());
    //console.log(userData);
    try{
        const response=await axios.post("/api/v1/login",userData);
        dispatch(setUser(response.data.user));
        dispatch(setStatusSuccess())
    }catch(err){
        setError(err.message)
        dispatch(setStatusFail())
    }
}

export const createUser = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post("/api/v1/register", userData);
    console.log("User successfully registered:", response.data);
    dispatch(loadUserRequest());
  } catch (error) {
    dispatch(setError(error.response ? error.response.message : "Something went wrong"));
  }
};

