import {
    REQ_USER,
    FOLLOW_USER,
    GET_USERS_BY_USER_IDS,
    GET_USER_BY_USERNAME,
    SEARCH_USER,
    UNFOLLOW_USER,
    UPDATE_USER,
} from "./ActionType";

const initialState = {
    
    reqUser: null,
    findByUsername: null,
    findUserByIds: [],
    updatedUser: null,
    followUser: null,
    unfollowUser: null,
    searchUser: null,

};

export const UserReducer = (store = initialState, { type, payload }) => {
  if (type === REQ_USER) {
    return { ...store, reqUser: payload };
  } else if (type === GET_USER_BY_USERNAME) {
    return { ...store, findByUsername: payload };
  } else if (type === GET_USERS_BY_USER_IDS) {
    return { ...store, findUserByIds: payload };
  } else if (type === FOLLOW_USER) {
    return { ...store, followUser: payload };
  } else if (type === UNFOLLOW_USER) {
    return { ...store, unfollowUser: payload };
  } else if (type === SEARCH_USER) {
    return { ...store, searchUser: payload };
  } else if (type === UPDATE_USER) {
    return { ...store, updatedUser: payload };
  }
  
  return store;
};
