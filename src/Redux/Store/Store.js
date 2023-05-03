import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";
import { userReducer } from "../User/Reducer";
import { postReducer } from "../Post/Reducer";
import { commentReducer } from "../Comment/Reducer";


const rootReducers = combineReducers({
    auth: AuthReducer,
    user: userReducer,
    post: postReducer,
    comment: commentReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
