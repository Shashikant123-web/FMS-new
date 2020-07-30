import axios from "axios";
import {
  USERLOGIN_SUCCESS,
  NEW_JOBS,
  RECOMENDED_JOBS,
  APPLIED_JOBS,
  SAVED_JOBS,
} from "../ActionTypes/actionTypes";
import { createBrowserHistory } from "history";
import { withRouter, Redirect } from "react-router-dom";
const history = createBrowserHistory();

const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};
export const userLoginAction = (userLogin) => {
  const { email1, userId, mobileNumber, details } = userLogin;
  return (dispatch, getState) => {
    console.log(userId);
    console.log(details);
    dispatch({
      type: USERLOGIN_SUCCESS,
      payLoad: {
        mobileNumber,
        email1,
        userId,
        details,
      },
    });
    axios
      .get("/stskFmsApi/jobseeker/RecommendedJobsWithStatus/" + userId, {
        headers,
      })
      .then((res) => {
        if (res.data.success === 1) {
          dispatch({
            type: RECOMENDED_JOBS,
            payLoad: res.data.data,
          });
        }
      });
    axios
      .get("/stskFmsApi/jobseeker/getSavedJobsWithStatus/" + userId, {
        headers,
      })
      .then((res) => {
        if (res.data.success === 1) {
          dispatch({
            type: SAVED_JOBS,
            payLoad: res.data.data,
          });
        }
      });
    axios
      .get("/stskFmsApi/jobseeker/newJobsWithStatus/" + userId, {
        headers,
      })
      .then((res) => {
        if (res.data.success === 1) {
          dispatch({
            type: NEW_JOBS,
            payLoad: res.data.data,
          });
        }
      });
    axios
      .get("/stskFmsApi/jobseeker/getById/" + userId, { headers })
      .then((res) => {
        if (res.data.success === 1) {
          dispatch({
            type: APPLIED_JOBS,
            payLoad: res.data.data.jobs,
          });
        }
      });
    // axios
    //   .get(
    //     "/stskFmsApi/jobseekerdoc/getByJobSeekerId/" +
    //       this.props.editProfile.payLoad.details.id,
    //     {
    //       headers,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data.data);
    //     // this.setState({
    //     //   docId: res.data.data,
    //     // });
    //     const names1 = res.data.data.map((namesss) => {
    //       return namesss.docId;
    //     });
    //     console.log(names1);
    //     console.log(Math.max(...names1));
    //     var latdocId = names1;
    //     var latestdocId = Math.max(...latdocId);
    //     console.log(latestdocId);
    //     this.setState({
    //       latestdocId: latestdocId,
    //     });
    //   });
  };
};
