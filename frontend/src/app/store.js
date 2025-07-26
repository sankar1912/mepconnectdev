import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/AuthSlice";
import friendsReducer from "../redux/slice/friendsSlice";
import postsReducer from "../redux/slice/postsSlice";
import eventsReducer from "../redux/slice/eventsSlice";
import jobsReducer from "../redux/slice/jobsSlice";
import searchpeopleReducer from "../redux/slice/searchPeopleSlice";
import donationsReducer from "../redux/slice/donationsSlice";
import permitReducer from "../redux/slice/permitSlice";
import notificationReducer from "../redux/slice/notificationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
    posts: postsReducer,
    events: eventsReducer,
    jobs: jobsReducer,
    searchpeople: searchpeopleReducer,
    donations: donationsReducer,
    permit: permitReducer,
    notification:notificationReducer
  },
});
