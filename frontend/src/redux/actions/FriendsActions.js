import axios from "axios";
import { setFriendsListRequest, setFriendsListSuccess } from "../slice/friendsSlice";
import { loadUserRequest } from "./AuthActions";
import { getAuth } from "../slice/AuthSlice";

export const getAllUser=()=>async(dispatch)=>{
    dispatch(setFriendsListRequest);
    const friendsList=await axios.get('/api/v1/friends/getusers');
    dispatch(setFriendsListSuccess(friendsList.data.friends));
}

export const fetchMyList=(email)=>async(dispatch,getState)=>{
    dispatch(loadUserRequest());
    const details =await axios.post('/api/v1/friends/getdetails',{email:email});
    //console.log(details.data.result)
    dispatch(setFriendsListSuccess(details.data.result));
}

export const sendFriendequest=(friendEmail,note )=>async(dispatch,getState)=>{
    const {auth}=getAuth(getState());
    await axios.post('/api/v1/friends/addfriend',{emailId:auth.user.email,friendemailId:friendEmail, note:note});
}

export const acceptFriendRequest=(userId,friendId)=>async(dispatch,getState)=>{
    const {auth}=getAuth(getState());
    await axios.post('/api/v1/friends/acceptrequest',{userId,friendId});
    dispatch(fetchMyList(auth.user.email));
}