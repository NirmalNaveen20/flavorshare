import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";
import { UserReducer } from "../User/Reducer";
import { PostReducer } from "../Post/Reducer";
import { commentReducer } from "../Comment/Reducer";


const rootReducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    post: PostReducer,
    comment: commentReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
