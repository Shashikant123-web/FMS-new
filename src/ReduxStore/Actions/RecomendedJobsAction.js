import axios from "axios";
import {
  USERLOGIN_SUCCESS,
  NEW_JOBS,
  RECOMENDED_JOBS,
  APPLIED_JOBS,
  SAVED_JOBS,
  SEARCHED_JOBS,
} from "../ActionTypes/actionTypes";

const header = {
  "x-api-key": "$2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};
// const recommendeJobs = (userId) => {
//
//   return (dispatch, getState) => {
//
//     axios
//       .get("/stskFmsApi/jobseeker/RecommendedJobsWithStatus/" + userId, {
//         headers: header,
//       })
//       .then((res) => {
//
//         if (res.data.success === 1) {
//           dispatch({
//             type: RECOMENDED_JOBS,
//             payLoad: res.data.data,
//           });
//         }
//       });
//   };
// };
// function savedJobs(userId) {
//   return (dispatch, getState) => {
//     axios
//       .get("/stskFmsApi/jobseeker/getSavedJobsWithStatus/" + userId, {
//         headers: header,
//       })
//       .then((res) => {
//         if (res.data.success === 1) {
//           dispatch({
//             type: SAVED_JOBS,
//             payLoad: res.data.data,
//           });
//         }
//       });
//   };
// }

export const handleSave = (save) => {
  const { id, userId, text } = save;

  return (dispatch, getState) => {
    axios
      .post(
        "/stskFmsApi/jobseeker/saveJobs",
        {
          id: userId,
          saveJobs: [
            {
              id,
            },
          ],
        },
        { headers: header }
      )
      .then((res) => {
        console.log(res.data);
      });
    const time = setTimeout(() => {
      axios
        .get("/stskFmsApi/jobseeker/RecommendedJobsWithStatus/" + userId, {
          headers: header,
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
          headers: header,
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
          headers: header,
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
        .get("/stskFmsApi/jobs/getByJobNameWithStatus/" + userId + "/" + text, {
          headers: header,
        })
        .then((res) => {
          dispatch({
            type: SEARCHED_JOBS,
            payLoad: res.data.data,
          });
        });
    }, 50);
    // savedJobs(userId);
  };
};
export const handleUnsave = (save) => {
  const { id, userId, text } = save;
  return (dispatch, getState) => {
    axios
      .post("/stskFmsApi/jobseeker/unSaveJobs/" + userId + "/" + id, {
        headers: header,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    //recommendeJobs(userId);
    const time2 = setTimeout(() => {
      axios
        .get("/stskFmsApi/jobseeker/getSavedJobsWithStatus/" + userId, {
          headers: header,
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
        .get("/stskFmsApi/jobseeker/RecommendedJobsWithStatus/" + userId, {
          headers: header,
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
        .get("/stskFmsApi/jobseeker/newJobs/" + userId, {
          headers: header,
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
        .get("/stskFmsApi/jobs/getByJobNameWithStatus/" + userId + "/" + text, {
          headers: header,
        })
        .then((res) => {
          dispatch({
            type: SEARCHED_JOBS,
            payLoad: res.data.data,
          });
        });
    }, 50);
  };
};
export const handleApply = (save) => {
  const { id, userId, text } = save;
  return (dispatch, getState) => {
    axios
      .post(
        "/stskFmsApi/jobseeker/applyJobs",
        {
          id: userId,
          jobs: [
            {
              id,
            },
          ],
        },
        { headers: header }
      )
      .then((res) => {});
    //recommendeJobs(userId);
    const time3 = setTimeout(() => {
      axios
        .get("/stskFmsApi/jobseeker/RecommendedJobsWithStatus/" + userId, {
          headers: header,
        })
        .then((res) => {
          if (res.data.success === 1) {
            dispatch({
              type: RECOMENDED_JOBS,
              payLoad: res.data.data,
            });
          }
        });
      //savedJobs(userId);
      axios
        .get("/stskFmsApi/jobseeker/getSavedJobsWithStatus/" + userId, {
          headers: header,
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
        .get("/stskFmsApi/jobseeker/getById/" + userId, { headers: header })
        .then((res) => {
          if (res.data.success === 1) {
            dispatch({
              type: APPLIED_JOBS,
              payLoad: res.data.data.jobs,
            });
          }
        });
      axios
        .get("/stskFmsApi/jobseeker/newJobs/" + userId, {
          headers: header,
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
        .get("/stskFmsApi/jobs/getByJobNameWithStatus/" + userId + "/" + text, {
          headers: header,
        })
        .then((res) => {
          dispatch({
            type: SEARCHED_JOBS,
            payLoad: res.data.data,
          });
        });
    }, 50);
  };
};
export const handleSearch = (search) => {
  const { text, userId } = search;

  return (dispatch) => {
    axios
      .get("/stskFmsApi/jobs/getByJobNameWithStatus/" + userId + "/" + text, {
        headers: header,
      })
      .then((res) => {
        dispatch({
          type: SEARCHED_JOBS,
          text,
          payLoad: res.data.data,
        });
      });
  };
};
