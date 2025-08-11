import axios from "axios";
import { getAuth } from "../slice/AuthSlice";
import { addEventFail, addLike, setAllEvents } from "../slice/eventsSlice";

export const getEvents = () => async (dispatch, getState) => {
  try {
    const { auth } = getAuth(getState());

    // if (!auth || !auth.user || !auth.user.department) {
    //   console.error("User is not authenticated or department is missing");
    //   return;
    // }

    const department = auth.user.department || 'common'; 

    const response = await axios.get(`/api/v1/feeds/getevents/${department}`);

    dispatch(setAllEvents(response.data.events)); 
  } catch (err) {
    console.error("Error fetching department events:", err);
    dispatch(addEventFail(err.message));
  }
};


export const addEvent =(data) => async(dispatch, getState) => {
  try {
    const { auth } = getAuth(getState());

    if (!auth) {
      console.error("User is not authenticated");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: auth.user.name,
      title: data.name,
      department: data.department|| "common",
      description: data.description,
      likes: 0,
      comments: 0,
      shares: 0,
      likedBy: [],
      date: data.date,
      time: data.time,
      email:auth.user.email,
    };

    const response= await axios.post('/api/v1/feeds/addnewevent',newEvent)

    // dispatch(setEventSuccess(data));
  } catch (err) {
    console.error("Error adding event:", err);
    dispatch(addEventFail(err));
  }
};

export const likeEvent = (eventId) => (dispatch, getState) => {
  const { auth } = getAuth(getState());
  
  if (!auth) {
    console.error("User is not authenticated");
    return;
  }

  const user = {
    id: auth.user.id,
    name: auth.user.name,
    email:auth.user.email,
  };

  dispatch(addLike({ eventId, user }));
};