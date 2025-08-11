import axios from "axios";
import { getAuth } from "../slice/AuthSlice";
import { addCommentSuccess, addPostFail, fetchPostSuccess, getAddLikeSuccess, getPostFail, getPostSuccess, removeLikeSuccess } from "../slice/postsSlice";

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
