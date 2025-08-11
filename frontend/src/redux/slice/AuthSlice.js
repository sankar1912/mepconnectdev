import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "./notificationSlice";



const initialState = {
  auth: { user: "", isLoggedIn: false },
  status: 'idle',  
  error: false,    
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload.auth;
      state.status="succeeded";
      state.error=false
      state.isLoading = false;
    },
    setLoading(state) {
      state.status = 'loading';
      state.isLoading = true;
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = true;
    },
    setUser(state, action) {
      state.auth = { user: action.payload, isLoggedIn: true };
      state.status = 'succeeded';
      state.error=false
      state.isLoading = false;
    },
    setUserLoggedOut(state) {
      state.auth = { user: "", isLoggedIn: false };
      state.status = 'idle';
      state.error = false;
      state.isLoading = false;
    },
    setStatusSuccess(state){
      state.status="succeeded"
    },
    setStatusFail(state){
      state.auth={ user: "", isLoggedIn: false }
      state.status="failed";
      state.error=true
    }
  },
    setStatusIdle(state){
      state.status="idle"
      state.error=false
    }
});

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


export const getError=(state)=>state.error;
export const getStatus=(state)=>state.status;
export const getAuth = (state) => state.auth;
export default authSlice.reducer;
export const { setAuth, setLoading, setError, setUser, setUserLoggedOut,setStatusFail,setStatusSuccess,setStatusIdle } = authSlice.actions;
