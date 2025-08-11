import axios from "axios";
import { getAuth } from "../slice/AuthSlice";
import { fetchDonationSuccess, sendDonationFailure, sendDonationStart, sendDonationSuccess } from "../slice/donationsSlice";

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