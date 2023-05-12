// export const signinAction = (data) => async (dispatch) => {
//   const res = await fetch("http://localhost:5454/signin", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Basic " + btoa(data.username + ":" + data.password),
//     },
//   });
//   const token = await res.headers.get("Authorization");

import { SIGN_IN, SIGN_UP } from "./ActionType";

//   console.log("token from header :- ", token);
//   const data = await res.json();
// };

export const signinAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5454/signin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    const token = res.headers.get("Authorization");

    localStorage.setItem("token", token);
    console.log("token from header :- ", token);
    dispatch({type:SIGN_IN,payload:token})
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5454/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    console.log("Signup :- ",user)
    dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    console.log("catch error ", error);
  }
};
