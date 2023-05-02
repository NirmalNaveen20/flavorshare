import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";


const rootReducers = combineReducers({
  auth: AuthReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
