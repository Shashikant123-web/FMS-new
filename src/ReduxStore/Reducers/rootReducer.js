import { combineReducers } from "redux";
import sendOtpReducer from "./AllReducers";
import verify from "./AllReducers";
import userLogin from "./AllReducers";

const rootReducer = combineReducers({
  SendOtp: sendOtpReducer,
  verify,
  userLogin,
});

export default rootReducer;
