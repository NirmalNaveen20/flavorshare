import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  REQ_USER_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "./ActionType";

export const createPost = (data) => async (dispatch) => {
  // console.log("token -- ", data.jwt)
  // console.log("data -- ",data.data)

  try {
      const res = await fetch("http://localhost:5454/api/posts/create", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },

    body: JSON.stringify(data.data),
  });

  const resData = await res.json();

  // console.log("created post : ", resData);

  dispatch({ type: CREATE_NEW_POST, payload: resData });
  } catch (error) {
    console.log("error - ",error);
  }


};

export const findUserPost = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `http://localhost:5454/api/posts/following/${data.userIds}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  console.log("find user post",resData);

  dispatch({ type: GET_USER_POST, payload: resData });
  } catch (error) {
    console.log("catch error ---- ",error)
  }

};


export const reqUserPostAction = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `http://localhost:5454/api/posts/following/${data.userId}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  console.log("find user post",resData);

  dispatch({ type: REQ_USER_POST, payload: resData });
  } catch (error) {
    console.log("catch error ---- ",error)
  }

};


export const likePostAction = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `http://localhost:5454/api/posts/like/${data.postId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  // console.log("like post action", resData);

  dispatch({ type: LIKE_POST, payload: resData });

  } catch (error) {
    console.log("error - ",error)
  }

};

export const unLikePostAction = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `http://localhost:5454/api/posts/unlike/${data.postId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  console.log("unlike post action", resData);

  dispatch({ type: UNLIKE_POST, payload: resData });

  } catch (error) {
    console.log("error - ",error)
  }

};


export const savePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(`http://localhost:5454/api/posts/save_post/${data.postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
  });
  const savedPost = await res.json();

  console.log("saved post", savedPost);
  dispatch({ type: SAVE_POST, payload: savedPost });
  } catch (error) {
    console.log("catch error ", error)
  }
  
};


export const unSavePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(`http://localhost:5454/api/posts/unsave_post/${data.postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
  });
  const unSavedPost = await res.json();

  console.log("un saved post", unSavedPost);

  dispatch({ type: UNSAVE_POST, payload: unSavedPost });
  } catch (error) {
    console.log("catch error ", error)
  }
  
};

export const findPostByIdAction=(data)=>async(dispatch)=>{
  try {
    const res=await fetch(`http://localhost:5454/api/posts/${data.postId}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+data.jwt,
    },
  })
  const post=await res.json();
  dispatch({type:GET_SINGLE_POST,payload:post});
  } catch (error) {
    console.log("catch error ",error)
  }
  
}

export const deletePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(`http://localhost:5454/api/posts/delete/${data.postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
  });
  const deletedPost = await res.json();

  console.log("deleted post", deletedPost);
  dispatch({ type: DELETE_POST, payload: deletedPost });
  } catch (error) {
    console.log("catch error ", error)
  }
  
};



