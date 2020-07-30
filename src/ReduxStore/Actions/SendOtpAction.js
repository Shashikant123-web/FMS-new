import { SEND_OTP } from "../ActionTypes/actionTypes";
import axios from "axios";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

export const createProject = (project) => {
  return (dispatch, getState) => {
    // axios
    //   .post("/stskFmsApi/otpServices/sendOtpBySMS", project, {
    //     headers: header,
    //   })
    //   .then((Response) => {})
    //   .catch((error) => {
    //     console.log(error);
    //   });
    dispatch({
      type: SEND_OTP,
      project,
    });
  };
};

// export const dashboard = (dash) => {
//   return (dispatch, getState) => {
//     //make api call
//     dispatch({
//       type: DASHBOARD,
//       dash,
//     });
// };
//};
