import { createStore } from "redux";
import reducer from "../ReduxStore/Reducers/sendOtpReducer";

export const store = createStore(reducer);
