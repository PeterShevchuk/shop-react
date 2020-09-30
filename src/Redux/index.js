import { combineReducers } from "redux";

import { session, global, data } from "./Slice";

const rootReducer = combineReducers({
  session,
  global,
  data,
});

export default rootReducer;
