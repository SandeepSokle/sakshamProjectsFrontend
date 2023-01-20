import { combineReducers } from "redux";
import homeReducer from "./home/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducer,
});

export default rootReducer;
