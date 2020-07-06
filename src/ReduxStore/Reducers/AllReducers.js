import {
  SEND_OTP,
  USERLOGIN_SUCCESS,
  RECOMENDED_JOBS,
  VERIFY_SUCCESS,
  VERIFY_INIT,
  VERIFY_FAILUR,
  SAVED_JOBS,
  NEW_JOBS,
  APPLIED_JOBS,
  HIDE_JOBS,
  TOKEN,
  SEARCHED_JOBS,
} from "../ActionTypes/actionTypes";

const intialState = {
  token: false,
  searchedJobs: [],
  SendOtp: {
    countryCode: "91",
    mobileNumber: "",
    loading: false,
    otp_input: "",
    error: "",
    otp: "",
    userId: "",
  },
  // verify: {
  //   countryCode: "",
  //   mobileNumber: "",
  //   otp_input: "",
  //   error: "",
  //   otp: "",
  //   userId: "",
  //   dash: "",
  //   loading: false,
  // },
  userLogin: {
    mobileNumber: "",
    email: "",
    payLoad: {},
    recomendedJobs: [],
    appliedJobs: [],
    savedJobs: [],
    newJobs: [],
    appliedJobs: [],
  },
};
const sendotpReducer = (state = intialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: true,
      };
    case SEND_OTP:
      return {
        ...state,
        SendOtp: {
          ...state.SendOtp,
          loading: action.loading,
          mobileNumber: action.project.mobileNumber,
        },
      };
    case VERIFY_INIT:
      return {
        ...state,
        SendOtp: {
          ...state.SendOtp,
          loading: true,
          error: "",
        },
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        SendOtp: {
          ...state.SendOtp,
          loading: false,
        },
      };
    case VERIFY_FAILUR:
      return {
        ...state,
        SendOtp: {
          ...state.SendOtp,
          loading: false,
          error: action.error,
        },
      };

    case USERLOGIN_SUCCESS:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          mobileNumber: action.payLoad.mobileNumber,
          email: action.payLoad.email1,
          payLoad: action.payLoad,
        },
      };
    case RECOMENDED_JOBS:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          ...state.userLogin.recomendedJobs,
          recomendedJobs: action.payLoad,
        },
      };
    case SAVED_JOBS:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          ...state.userLogin.savedJobs,
          savedJobs: action.payLoad,
        },
      };
    case NEW_JOBS:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          newJobs: action.payLoad,
        },
      };
    case APPLIED_JOBS:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          appliedJobs: action.payLoad,
        },
      };
    case HIDE_JOBS:
      let jobs = state.userLogin.recomendedJobs.filter((job) => {
        return action.id !== job.id;
      });
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          recomendedJobs: jobs,
        },
      };
    case SEARCHED_JOBS:
      return {
        ...state,
        searchedJobs: action.payLoad,
      };
  }
  return state;
};
// export const verify = (state = intialState, action) => {
//   console.log(action.verify);
//   switch (action.type) {
//     case VERIFY_INIT:
//       return {
//         sendOtp: action.loading,
//       };
//     case VERIFY_SUCCESS:
//       return {
//         ...state,
//         verify: action.project,
//       };
//     case VERIFY_FAILUR:
//       return {
//         ...state,
//         verify: action.verifyOtp,
//         verify: {
//           loading: true,
//         },
//       };
//   }
//   return state;
// };
export default sendotpReducer;
