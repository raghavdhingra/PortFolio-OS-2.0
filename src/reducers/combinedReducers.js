import { combineReducers } from "redux";
import activityReducers from "./activityReducers";
import desktopReducers from "./desktopReducers";

export default combineReducers({
  activityReducers,
  desktopReducers,
});
