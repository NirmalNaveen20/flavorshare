import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT } from "./ActionType"

const initialState={
    createdComment:null,
    postComments:null,
    likedComment:null,
}

export const commentReducer=(store=initialState,{type,payload})=>{
    if(type===CREATE_COMMENT){
        return {...store, createdComment:payload}
    }
    else if(type===GET_POST_COMMENT){
        return {...store, postComments:payload}
    }
    else if(type===LIKE_COMMENT){
        return {...store, likedComment:payload}
    }
    return store;
}