import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "./AuthSlice";
import axios from "axios";

const initialState = {
  events: [
    
  ],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventSuccess: (state, action) => {
      state.events.unshift(action.payload);
    },
    addEventFail: (state, action) => {
      state.error = action.payload;
      state.events=[]
    },
    setAllEvents: (state, action) => {
      state.events = action.payload; 
    },
    addLike: (state, action) => {
      const { eventId, user } = action.payload;
     
      const event = state.events.find((e) => e.id === eventId);
      if (event) {
       
        const alreadyLiked = event.likedBy.some((u) => u.id === user.id);

        if (!alreadyLiked) {
          event.likes += 1;
          event.likedBy.push(user); 
        } else {
          console.warn("User already liked this event");
        }
      }
    },
  },
});


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

export const getAllEvents = (state) => state.events;

export const { addEventFail, setEventSuccess, addLike, setAllEvents } = eventSlice.actions;

export default eventSlice.reducer;
