import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "../users/AuthSlice";
import axios from "axios";

const initialState = {
  posts: [],
  error: null,
  selectedPost:{},
  loading:false,
  page:1,
  limit:10
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPagination:(state, action)=>{
      state.page= action.payload.page;
    }
    ,
    setLoading:(state)=>{
      state.loading= !state.loading;
    },
    addPostSuccess: (state, action) => {
      state.posts.unshift(action.payload);
    },
    addPostFail: (state, action) => {
      state.error = action.payload;
    },
    getPostSuccess:(state,action)=>{
      state.selectedPost=action.payload;
     
    },
    getPostFail:(state)=>{
      state.selectedPost={};
    },
    fetchPostSuccess: (state, action) => {
  const existingIds = new Set(state.posts.map(post => post._id));
  const newUniquePosts = action.payload.filter(post => !existingIds.has(post._id));
  state.posts = [...state.posts, ...newUniquePosts];
}
,
    getAddLikeSuccess: (state, action) => {
      const { id, liked } = action.payload;
    
      state.posts = state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: (post.likes || 0) + 1,
              likedetails: post.likedetails && post.likedetails.some((like) => like.email === liked.email)
                ? post.likedetails 
                : [...(post.likedetails || []), liked], 
            }
          : post
      );
    
      if (state.selectedPost?._id === id) {
        state.selectedPost = {
          ...state.selectedPost,
          likes: (state.selectedPost.likes || 0) + 1,
          likedetails: state.selectedPost.likedetails && state.selectedPost.likedetails.some((like) => like.email === liked.email)
            ? state.selectedPost.likedetails 
            : [...(state.selectedPost.likedetails || []), liked], 
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

export const { addPostSuccess, addPostFail,getPostFail,getPostSuccess,getAddLikeSuccess,removeLikeSuccess,addCommentSuccess,fetchPostSuccess, setLoading, setPagination } = postsSlice.actions;

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
    await axios.post('/api/v1/feeds/addnewpost', newPost);
    // console.log(response.data);
    // dispatch(addPostSuccess(newPost));
  } catch (error) {
    dispatch(addPostFail("Failed to add posts",error));
  }
};
export const getPost = ({id}) =>async (dispatch) => {

  try{
    const response= await axios.get(`/api/v1/feeds/getpost/${id}`);
  const post = response.data.post||[];
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
console.log("Post _id:", _id);

  const { auth } = getAuth(getState());
  if (!auth || !auth.user) {
    console.log("User not authenticated");
    return;
  }

  
  await axios.post(`/api/v1/feeds/posts/addlike/${_id}`,{email:auth.user.email})

  dispatch(getAddLikeSuccess({ id:_id, email:auth.user.email }));
};
export const removeLike = ({_id}) => async (dispatch, getState) => {
  const { auth } = getAuth(getState());
  await axios.post(`/api/v1/feeds/posts/removelike/${_id}`,{email:auth.user.email});
  dispatch(removeLikeSuccess({ id:_id, email: auth.user.email }));
};

export const addComment = (id, text) => (dispatch, getState) => {
  const { auth } = getAuth(getState());

  if (!text.trim()) return; 

  const newComment = {
    name: auth.user.name,
    email: auth.user.email,
    text,
    timestamp: new Date().toISOString(),
  };

  dispatch(addCommentSuccess({ id, comment: newComment }));
};

export const fetchPost = (page) => async (dispatch, getState) => {
  try {
    const { auth } = getAuth(getState());
        const state = getState();
    let { limit} = state.posts;
    const department = auth.user.department ? auth.user.department : "common";
    const response = await axios.get(`/api/v1/feeds/getposts/${department}?page=${page}&limit=${limit}`);
    dispatch(fetchPostSuccess(response.data.posts || [])); 
  } catch (error) {
    console.error("Error fetching posts:", error);
    dispatch(fetchPostSuccess([]));
  }
};





export default postsSlice.reducer;
