import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
    posts: [],
    events: [],
    donations: [],
    results: [] // This will hold the filtered results dynamically
};

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setDonations: (state, action) => {
            state.donations = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        }
    }
});

export const { setPosts, setEvents, setDonations, setResults } = activitySlice.actions;
export const fetchActivity = ({email}) => async (dispatch, getState) => {
    try {


        const response = await axios.get(`/api/v1/user/activity/${email}`);

        dispatch(setPosts(response.data.posts));
        dispatch(setEvents(response.data.events));
        dispatch(setDonations(response.data.donations));
    } catch (error) {
        console.error("Error fetching activity data:", error);
    }
};


export const getActivity = ({dataType}) => (dispatch, getState) => {
   console.log(dataType)
    const state = getState().activity;
    if(dataType==="Posts"){
        dispatch(setResults(getState().activity.posts))
    }
    if (dataType in state) {
        dispatch(setResults(state[dataType]));
    } else {
        console.warn(`Invalid data type: ${dataType}`);
    }
};

export default activitySlice.reducer;
