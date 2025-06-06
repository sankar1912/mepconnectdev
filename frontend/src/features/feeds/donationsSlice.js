import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuth } from "../users/AuthSlice";

const initialState = {
  donations: [],
  success: false,
  loading: false,
  error: null,
};

const donationsSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    sendDonationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendDonationSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.donations.unshift(action.payload); 
    },
    fetchDonationSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.donations = action.payload; 
    },
    sendDonationFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearDonations: (state) => {
      state.donations = [];
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  sendDonationStart,
  sendDonationSuccess,
  fetchDonationSuccess,
  sendDonationFailure,
  clearDonations,
} = donationsSlice.actions;

export const sendDonation = (donationData) => async (dispatch,getState) => {
  dispatch(sendDonationStart());
  const { auth } = getAuth(getState());
  try {
    const response = await axios.post(`/api/v1/feeds/adddonations`, {...donationData,dept:auth.user.department,email:auth.user.email});
    dispatch(sendDonationSuccess(response.data)); 
  } catch (error) {
    dispatch(sendDonationFailure(error.response?.data || "Failed to donate"));
  }
};

export const fetchDonation = () => async (dispatch) => {
  dispatch(sendDonationStart());
  try {
    const response = await axios.get("/api/v1/feeds/donations");
    console.log(response.data.donations);
    dispatch(fetchDonationSuccess(response.data.donations)); 
  } catch (err) {
    dispatch(sendDonationFailure(err.response?.data?.message || "Failed to fetch donations"));
  }
};

export const fetchSingleDonation = ({id}) => async (dispatch) => {
  dispatch(sendDonationStart());
  try {
    const response = await axios.get(`/api/v1/feeds/donation/${id}`);
    dispatch(fetchDonationSuccess(response.data.donation)); 
  } catch (err) {
    dispatch(sendDonationFailure(err.response?.data?.message || "Failed to fetch donations"));
  }
};

export const getAllDonations = (state) => state.donations;

export default donationsSlice.reducer;
