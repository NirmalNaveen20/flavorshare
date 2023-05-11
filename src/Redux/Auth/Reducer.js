import { SIGN_IN, SIGN_UP } from "./ActionType"

const initialValue={
    signup:null,
    signin:null,
}

export const AuthReducer=(store=initialValue,{type,payload})=>{

    if(type===SIGN_IN){
        return{...store,singin:payload}
    }
    else if(type===SIGN_UP){
        return{...store,singup:payload}
    }

    return store;

}