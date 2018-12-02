import { combineReducers } from "redux";
import geojsonReducer from "./geojsonReducer";

export default combineReducers({
  data: geojsonReducer
});
