import {
    FOLLOW_USER,
    GET_USERS_BY_USER_IDS,
    GET_USER_BY_USERNAME,
    GET_USER_PROFILE,
    SEARCH_USER,
    UNFOLLOW_USER,
    UPDATE_USER,
} from "./ActionType";

const initialState = {
    
    reqUser: null,
    findByUsername: null,
    findByUserIds: [],
    updatedUser: null,
    followUser: null,
    unfollowUser: null,
    searchUser: null,
    updatedUser: null

};

export const userReducer = (store = initialState, { type, payload }) => {
  if (type === GET_USER_PROFILE) {
    return { ...store, reqUser: payload };
  } else if (type === GET_USER_BY_USERNAME) {
    return { ...store, findByUsername: payload };
  } else if (type === GET_USERS_BY_USER_IDS) {
    return { ...store, findByUserIds: payload };
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
