import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuth, loadUserRequest } from "./AuthSlice";


const initialState = {
    results: [],
    selectedUser:{}
};

const searchpeopleSlice = createSlice({
    name: "searchpeople", 
    initialState,
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload; 
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        }
    }
});

export const fetchSearchRequest = ({ places = [], batchs = [], depts = [], name="", company="" }) => async (dispatch) => {
    try {
      const queryParams = new URLSearchParams();

      places.forEach((place) => queryParams.append("place", place));
      batchs.forEach((batch) => queryParams.append("batch", batch));
      depts.forEach((dept) => queryParams.append("dept", dept));
      queryParams.append("name", name);
      queryParams.append("company", company);
  
      const apiUrl = `/api/v1/searchpeople?${queryParams.toString()}`;
      //console.log("API Request URL:", apiUrl);
    const { data } = await axios.get(apiUrl);
    //console.log(data);
    dispatch(setResults(data.users))
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  export const reduceByName = ({ name }) => async (dispatch, getState) => {
    try {
        let allUsers = getState().searchpeople.results || [];
        let filteredUsers = allUsers.filter(user =>
            user?.name?.toLowerCase().includes(name.toLowerCase())
        );
        //console.log("Filtered:", filteredUsers);
        if (filteredUsers.length > 0) {
            dispatch(setResults(filteredUsers));
        } else {
            console.log("No match found, refetching...");

            await dispatch(fetchSearchRequest({ places: [], depts: [], batchs: [] }));
            allUsers = getState().searchpeople.results || [];
            filteredUsers = allUsers.filter(user =>
                user?.name?.toLowerCase().includes(name.toLowerCase())
            );
            console.log("Filtered after refetch:", filteredUsers);
            dispatch(setResults(filteredUsers));
        }
    } catch (error) {
        console.error("Error filtering by name:", error);
    }
};

export const fetchSelectedUser = (_id) => async (dispatch, getState) => 
    {
        dispatch(loadUserRequest());
       const {auth}=getAuth(getState());
       console.log(auth.user.email);
    try {
        const response = await axios.post(`/api/v1/user/${_id}`,{email:auth.user.email});
        dispatch(setSelectedUser(response.data));
    } catch (error) {
        console.error('Error fetching selected user:', error);
        dispatch(setSelectedUser({}));
    }
};


export const searchresults = (state) => state.searchpeople.results;
export const searchUser=(state)=>state.searchpeople.selectedUser;
export const { setResults,setSelectedUser } = searchpeopleSlice.actions;

export default searchpeopleSlice.reducer;
