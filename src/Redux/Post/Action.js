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

const BASE_API = "http://localhost:5454/api"

export const createPostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(`${BASE_API}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const post = await res.json();

    console.log("created post : ", post);
    dispatch({ type: CREATE_NEW_POST, payload: post });

  } catch (error) {
    console.log("Catch Error: ", error);
  }

};

export const findUserPostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(
      `${BASE_API}/posts/following/${data.userIds}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },

        body: JSON.stringify(data.data),
      }
    );

    const posts = await res.json();

    console.log("find post by user ids ", posts);

    dispatch({ type: GET_USER_POST, payload: posts });

  } catch (error) {
    console.log("catch error ---- ", error);
  }
};

export const reqUserPostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(
      `${BASE_API}/posts/following/${data.userId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },

        body: JSON.stringify(data.data),
      }
    );

    const posts = await res.json();

    console.log("req user post ", posts);

    dispatch({ type: REQ_USER_POST, payload: posts });
      
  } catch (error) {
    console.log("catch error ---- ", error);
  }
};

export const likePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(
      `${BASE_API}/posts/like/${data.postId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },

        body: JSON.stringify(data.data),
      }
    );

    const posts = await res.json();

    console.log("like post action ", posts);

    dispatch({ type: LIKE_POST, payload: posts });
    
  } catch (error) {
    console.log("error - ", error);
  }
};

export const unLikePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(
      `${BASE_API}/posts/unlike/${data.postId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },

        body: JSON.stringify(data.data),
      }
    );

    const post = await res.json();

    console.log("unlike post action ", post);

    dispatch({ type: UNLIKE_POST, payload: post });

  } catch (error) {
    console.log("error - ", error);
  }
};

export const savePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/posts/save_post/${data.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    const savedPost = await res.json();

    console.log("saved post", savedPost);

    dispatch({ type: SAVE_POST, payload: savedPost });

  } catch (error) {
    console.log("catch error ", error);
  }
};

export const unSavePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/posts/unsave_post/${data.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    const unSavedPost = await res.json();

    console.log("unsaved post", unSavedPost);

    dispatch({ type: UNSAVE_POST, payload: unSavedPost });
    
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const findPostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/posts/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
      
      const post = await res.json();

      console.log("get single post ", post);

      dispatch({ type: GET_SINGLE_POST, payload: post });
      
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/posts/delete/${data.postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    
    const post = await res.json();

    console.log("deleted post", post);
    
    dispatch({ type: DELETE_POST, payload: post });
    
  } catch (error) {
    console.log("catch error ", error);
  }
};
