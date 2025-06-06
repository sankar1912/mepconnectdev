import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/AuthSlice";
import friendsReducer from "../features/friends/friendsSlice";
import postsReducer from "../features/feeds/postsSlice";
import eventsReducer from "../features/feeds/eventsSlice";
import jobsReducer from "../features/feeds/jobsSlice";
import searchpeopleReducer from "../features/Search/searchPeopleSlice";
import donationsReducer from "../features/feeds/donationsSlice";
import permitReducer from "../features/admin/permitSlice";
import activityReducer from "../features/users/activitySlice";

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
    activity: activityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "posts/setPosts",
          "events/setEvents",
          "donations/setDonations",
          "activity/setResults",
        ], 
      },
    }),
  devTools: process.env.NODE_ENV !== "production", 
});
