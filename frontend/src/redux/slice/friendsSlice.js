import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuth, loadUserRequest } from "./AuthSlice";

const initialState = {
    friendslist:[],
    friendinvitelist:[],
    blockedUserlist:[],
    setLoading:false,
};

export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setFriendsListRequest(state){
            state.setLoading=true;
        },
        setFriendsListSuccess(state,action){

            state.friendslist=action.payload.friends;
            state.friendinvitelist=action.payload.friendinvites;
            state.blockedUserlist=action.payload.blockedUsers;
            state.setLoading=false;
        },
        setFriendsListFail(state,action){
            state.setLoading=false;
            state.friendslist=action.payload;
        }
    },
});

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

export const sendFriendequest=(friendId)=>async(dispatch,getState)=>{
    const {auth}=getAuth(getState());
    await axios.post('/api/v1/friends/addfriend',{userId:auth.user.email,friendUserId:friendId});
}

export const acceptFriendRequest=(userId,friendId)=>async(dispatch,getState)=>{
    const {auth}=getAuth(getState());
    await axios.post('/api/v1/friends/acceptrequest',{userId,friendId});
    dispatch(fetchMyList(auth.user.email));
}

export const getfriendslist = (state) => state.friends.friendslist;
export const getfriendinviteslist = (state) => state.friends.friendinvitelist;
export const getblockedUserlist = (state) => state.friends.blockedUserlist;

export const{setFriendsListFail,setFriendsListRequest,setFriendsListSuccess}=friendsSlice.actions;

export default friendsSlice.reducer;
