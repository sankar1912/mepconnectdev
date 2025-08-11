import axios from "axios";
import { setDonations, setEvents, setPosts } from "../slice/activitySlice";
import { setResults } from "../slice/searchPeopleSlice";

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
