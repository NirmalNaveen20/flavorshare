import {
  FOLLOW_USER,
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  GET_USER_PROFILE,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const getUserProfileAction = (token) => async (dispatch) => {
  try {
      const res = await fetch("http://localhost:5454/api/users/req", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const reqUser = await res.json();

  // console.log("--- req user --- ",reqUser)

  dispatch({ type: GET_USER_PROFILE, payload: reqUser });
  } catch (error) {
    console.log("catch error - ",error)
  }

};

export const findByUsernameAction = (data) => async (dispatch) => {
  // console.log("find by username action data ---- ",data)
try {

  const res = await fetch(
    `http://localhost:5454/api/users/username/${data.username}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    }
  );

  const user = await res.json();

  console.log("--- find by username  --- ", user);

  dispatch({ type: GET_USER_BY_USERNAME, payload: user });

} catch (error) {
  console.log("catch error - ", error)
  
}
  
};

export const findByUserIdsAction = (data) => async (dispatch) => {
  try {

    const res = await fetch(`http://localhost:5454/api/users/m/${data.userIds}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

    });

    console.log(" -- res user ids --", res);

    const users = await res.json();

    console.log("--- find by ids  --- ", users);

    dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });

  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const followUserAction = (data) => async (dispatch) => {
 
  try {

    const res = await fetch(`http://localhost:5454/api/users/follow/${data.userId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

    });

    const users = await res.json();

    console.log("--- follow user --- ", users);

    dispatch({ type: FOLLOW_USER, payload: users });

  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const unFollowUserAction = (data) => async (dispatch) => {
 
  try {

    const res = await fetch(`http://localhost:5454/api/users/unfollow/${data.userId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

    });

    const users = await res.json();

    console.log("--- unfollow user --- ", users);

    dispatch({ type: FOLLOW_USER, payload: users });

  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const searchUserAction = (data) => async (dispatch) => {
 console.log("jwt --- ",data.jwt)
  try {

    const res = await fetch(`http://localhost:5454/api/users/search?q=${data.query}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

    });

    const users = await res.json();

    console.log("--- search user --- ", users);

    dispatch({ type: SEARCH_USER, payload: users });

  } catch (error) {
    console.log("catch error -  ", error);
  }
};


export const editUserDetailsAction = (data) => async (dispatch) => {
  console.log("data edit user --- ",data)
   try {
 
     const res = await fetch(`http://localhost:5454/api/users/account/edit`, {
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