import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "./AuthSlice";
import axios from "axios";

const initialState = {
  posts: [],
  error: null,
  selectedPost:{}
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPostSuccess: (state, action) => {
      state.posts.unshift(action.payload);
    },
    addPostFail: (state, action) => {
      state.error = action.payload;
    },
    getPostSuccess:(state,action)=>{
      state.selectedPost=action.payload;
      console.log(action.payload)
    },
    getPostFail:(state,action)=>{
      state.selectedPost={};
    },
    fetchPostSuccess: (state, action) => {
      // Combine existing posts with new posts
      const combinedPosts = [...state.posts, ...action.payload];
    
      // Remove duplicates based on 'id'
      const uniquePostsMap = new Map();
      combinedPosts.forEach(post => {
        if (!uniquePostsMap.has(post._id)) {
          uniquePostsMap.set(post._id, post);
        }
      });
    
      // Update state with unique posts
      state.posts = Array.from(uniquePostsMap.values());
    },
    getAddLikeSuccess: (state, action) => {
      const { id, liked } = action.payload;
    
      state.posts = state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: (post.likes || 0) + 1,
              likedetails: post.likedetails && post.likedetails.some((like) => like.email === liked.email)
                ? post.likedetails // Keep the existing likedetails if the email is already present
                : [...(post.likedetails || []), liked], // Add the new liked object if not present
            }
          : post
      );
    
      if (state.selectedPost?._id === id) {
        state.selectedPost = {
          ...state.selectedPost,
          likes: (state.selectedPost.likes || 0) + 1,
          likedetails: state.selectedPost.likedetails && state.selectedPost.likedetails.some((like) => like.email === liked.email)
            ? state.selectedPost.likedetails // Keep the existing likedetails if the email is already present
            : [...(state.selectedPost.likedetails || []), liked], // Add the new liked object if not present
        };
      }
    },
    removeLikeSuccess: (state, action) => {
      const { id, email } = action.payload;
    
      state.posts = state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: Math.max(0, (post.likes || 0) - 1),
              likedBy: post.likedBy
                ? post.likedBy.includes(email)
                  ? post.likedBy.filter((em) => em !== email) // Remove the email if it exists
                  : [...post.likedBy, { email }] // Add the email if it does not exist
                : [{ email }], // Initialize with the email if likedBy is undefined
            }
          : post
      );
    
      if (state.selectedPost?._id === id) {
        state.selectedPost = {
          ...state.selectedPost,
          likes: Math.max(0, (state.selectedPost.likes || 0) - 1),
          likedetails: state.selectedPost.likedetails
            ? state.selectedPost.likedetails.filter((like) => like.email !== email)
            : [],
        };
      }
    },
    addCommentSuccess: (state, action) => {
      const { id, comment } = action.payload;
    
      state.posts = state.posts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: (post.comments || 0) + 1, 
              commentdetails: [...(post.commentdetails || []), comment], 
            }
          : post
      );
  
      if (state.selectedPost?.id === id) {
        state.selectedPost = {
          ...state.selectedPost,
          comments: (state.selectedPost.comments || 0) + 1,
          commentdetails: [...(state.selectedPost.commentdetails || []), comment],
        };
      }
    },
  },
});

export const { addPostSuccess, addPostFail,getPostFail,getPostSuccess,getAddLikeSuccess,removeLikeSuccess,addCommentSuccess,fetchPostSuccess } = postsSlice.actions;

export const getAllPosts = (state) => state.posts;
export const displayPost=(state)=>state.posts.selectedPost;
export const addNewPost = ({ text, media,hashtags }) => async (dispatch, getState) => {
  try {
    const { auth } = getAuth(getState());

    const newPost = {
      id: Date.now(),
      name: auth.user.name,
      username: `@${auth.user.name}`,
      department: auth.user.department,
      time: Date.now(),
      text: text,
      likes: 0,
      comments: 0,
      shares: 0,
      media: media, 
      hashtags,
      email:auth.user.email
    };
    //console.log(newPost)
    const response=await axios.post('/api/v1/feeds/addnewpost', newPost);
    // console.log(response.data);
    // dispatch(addPostSuccess(newPost));
  } catch (error) {
    dispatch(addPostFail("Failed to add posts"));
  }
};
export const getPost = ({id}) =>async (dispatch, getState) => {

  try{
    const response= await axios.get(`/api/v1/feeds/getpost/${id}`);
  const post = response.data.post||[];
  console.log(response.data)
  if (post) {
    dispatch(getPostSuccess(response.data.post));
  } else {
    console.log("Post not found");
    dispatch(getPostFail());
  }
  }catch(err){
    dispatch(getPostFail());
  }
};


export const addLike = ({_id}) => async(dispatch, getState) => {

  const { auth } = getAuth(getState());
  if (!auth || !auth.user) {
    console.log("User not authenticated");
    return;
  }

  
  await axios.post(`/api/v1/feeds/posts/addlike/${_id}`,{email:auth.user.email})
  dispatch(getPost({id:_id}));
  dispatch(getAddLikeSuccess({ id:_id, email:auth.user.email }));
};
export const removeLike = ({_id}) => async (dispatch, getState) => {
  const { auth } = getAuth(getState());
  await axios.post(`/api/v1/feeds/posts/removelike/${_id}`,{email:auth.user.email});
  dispatch(getPost({id:_id}));
  dispatch(removeLikeSuccess({ id:_id, email: auth.user.email }));
};

export const addComment = (id, text) => (dispatch, getState) => {
  const { auth } = getAuth(getState());

  if (!text.trim()) return; 

  const newComment = {
   id:auth?.user?._id,
    text,
  };
  dispatch(addCommentSuccess({ id, comment: newComment }));
  
};

export const fetchPost = (nextPage=0) => async (dispatch, getState) => {
  try {
    const { auth } = getAuth(getState());
    const department = auth.user.department ? auth.user.department : "common";

    const response = await axios.get(`/api/v1/feeds/getposts/${department}?page=${nextPage}&limit=10`);
    //console.log(response.data);
    dispatch(fetchPostSuccess(response.data.posts || [])); 
  } catch (error) {
    console.error("Error fetching posts:", error);
    dispatch(fetchPostSuccess([]));
  }
};





export default postsSlice.reducer;
