import {
  REQ_USER,
  FOLLOW_USER,
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  SEARCH_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
} from "./ActionType";

const BASE_API = "http://localhost:5454/api";

export const getUserProfileAction = (jwt) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5454/api/users/req", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    const reqUser = await res.json();

    dispatch({ type: REQ_USER, payload: reqUser });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const findUserByUserNameAction = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    }
  });

  const user=await res.json();

  console.log("find by username :", user);
  dispatch({ type: GET_USER_BY_USERNAME, payload: user });
}

export const findUserByUserIdsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/users/m/${data.userIds}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );

    const users = await res.json();

    console.log("--- find by ids  --- ", users);

    dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });

  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const followUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/users/follow/${data.userId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );

    const user = await res.json();

    console.log("--- follow user --- ", user);

    dispatch({ type: FOLLOW_USER, payload: user });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const unFollowUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/users/unfollow/${data.userId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );

    const user = await res.json();

    console.log("--- unfollow user --- ", user);

    dispatch({ type: UNFOLLOW_USER, payload: user });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const searchUserAction = (data) => async (dispatch) => {
  console.log("jwt --- ", data.jwt);
  try {
    const res = await fetch(
      `${BASE_API}/users/search?q=${data.query}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );

    const user = await res.json();

    console.log("--- search user --- ", user);

    dispatch({ type: SEARCH_USER, payload: user });

  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const editUserAction = (data) => async (dispatch) => {
  console.log("data edit user --- ", data);
  try {
    const res = await fetch(`${BASE_API}/users/account/edit`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      
      body: JSON.stringify(data.data),

    });

    const users = await res.json();

    console.log("--- updated user --- ", users);

    dispatch({ type: UPDATE_USER, payload: users });
    
  } catch (error) {
    console.log("catch error -  ", error);
  }
};
