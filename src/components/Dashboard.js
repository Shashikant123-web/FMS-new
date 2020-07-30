import React, { Component } from "react";
import axios from "axios";
import "./css/dashboard.css";
import mainLogo from "./Images/Mainlogo.png";
import dashboard from "./Images/dashboard.png";
import { withRouter, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logout from "./Images/logout.png";
import call from "./Images/call.png";
import location from "./Images/location.png";
import experiance from "./Images/experiance.png";
import book from "./Images/book.png";
import edit from "./Images/edit.png";
import mail from "./Images/mail.png";
import file from "./Images/file.png";
import uploadfile from "./Images/upload.png";
import { Multiselect } from "multiselect-react-dropdown";
import { Form } from "react-bootstrap";
import EditProfile from "./Editprofile";

import { connect } from "react-redux";
import NavbarTop from "./NavbarJobseeker/NavbarTop";
import { handleSearch } from "../ReduxStore/Actions/RecomendedJobsAction";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

toast.configure();
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createeditprofileimage: "null",

      createeditprofileimagepath: "",
      createeditprofileimagedocId: "",
      editprofileimage: "",
      editprofileimagedocId: "",
      mobileNumberUserloginId: "",
      wantedit: "",
      profileimagepath: "",
      profileimageretrievedocId: "",
      blobData: null,
      resume: null,
      uploadedResume: "",
      Types: [],
      selectedValue: null,
      posts: [],
      details: [],
      editProfile: [],

      LoggedIn: "true",
      mobileNumber: "",
      userId: "",
      searchInput: "",
      appliedJobs: "",
      searchedJobs: [],
      searchLoading: false,
      searchError: "",
      appliedJobsId: [18],
      Updates: ["Send Mail", "SMS", "Both", "None"],
      //docId:'',
      path: "",
      fileName: "",

      recomendedJobs: [],
      appliedJobs: [],
      savedJobs: [],
      newJobs: [],
      saveNumber: "",
      recomendedJobsLength: "",
      items: [],
      suggestions: [],
      names: [],
      text: "",
      testSearch: [],
    };
  }
  componentDidMount(e) {
    if (this.props.token.SendOtp.token !== true) {
      return <Redirect to="/userLogin" />;
    } else {
      this.setState({
        userId: this.props.dashboard.payLoad.details.id,
      });
      axios
        .get("/stskFmsApi/jobTypes/getAllJobTypes", { headers })
        .then((res) => {
          this.setState({
            testSearch: res.data.data,
          });
        });
      axios
        .get("/stskFmsApi/jobTypes/getAllJobTypes", { headers })
        .then((res) => {
          console.log(res);
          console.log(res.data.data[0].name);
          this.setState({
            items: res.data.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }
  testSearch() {
    return this.state.testSearch.map((type) => {
      return <option value={type.name} />;
    });
  }
  handlejobtypes() {}
  handleRadioEdit(e) {
    console.log(e.target.value);
    // this.setState({
    //     wantedit:e.target.value
    // })
    if (e.target.value == "false") {
    }
  }
  onTextChanged = (e, names) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = names.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };
  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li onClick={() => this.suggestionsSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }
  suggestionsSelected(value) {
    this.setState({
      text: value,
      suggestions: [],
    });
  }
  handleApply = (id) => {
    console.log(id);
    toast.success("Applied successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    axios
      .post(
        "/stskFmsApi/jobseeker/applyJobs",
        {
          id: this.state.userId,
          jobs: [
            {
              id: id,
            },
          ],
        },
        { headers }
      )
      .then((res) => {
        console.log(res.data);
        console.log(res);
      });

    const posts = this.state.posts.filter((job) => {
      return job.id !== id;
    });
    const searchedJobs = this.state.searchedJobs.filter((job) => {
      return job.id !== id;
    });
    this.setState({
      posts,
      searchedJobs,
      //appliedJobsId:[...this.state.appliedJobsId, id],
    });
  };
  handleLogout = (e) => {
    this.setState({
      LoggedIn: false,
    });
    this.props.history.push("/");
    localStorage.removeItem("state");
  };

  handleSearchInput = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handlepopup = (e) => {
    const { editProfile } = { ...this.state };
    const currentState = editProfile;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ editProfile: editProfile });
  };
  handleResume = (e) => {
    e.preventDefault();

    console.log(e);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    this.setState({
      resume: e.target.files[0],
    });
  };
  handleResume1Submit = (e) => {
    let formData = new FormData();
    formData.append("file", this.state.resume);
    axios
      .post("/stskFmsApi/jobseekerdoc/editDoc/" + this.state.docId, formData, {
        headers: {
          "x-api-key":
            " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  popupsubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "/stskFmsApi/jobseeker/editJS",
        {
          name: this.state.name,
          email: this.state.email,
          mob: this.state.mob,
          panNum: this.state.panNum,
          aadharNum: this.state.editprofile.aadharNum,
          eduQual: this.state.editprofile.eduQual,
          experience: this.state.editprofile.experience,
          working: this.state.editprofile.working,
          jobUpdate: this.state.editprofile.jobUpdate,
          address: this.state.editprofile.address,
          fresher: this.state.editprofile.fresher,
          companyName: this.state.editprofile.companyName,
          destination: this.state.editprofile.destination,
          noticeperiod: this.state.editprofile.noticeperiod,
          noOfDays: this.state.editprofile.noOfDays,
          currentLocation: this.state.editprofile.currentLocation,
          negotiable: this.state.editprofile.negotiable,
          upTo: this.state.editprofile.upTo,
          jobLocation: this.state.editprofile.jobLocation,
          userLogin: this.state.editprofile.jobLocation,
          jobTypes: this.state.editprofile.jobTypes,
        },
        { headers }
      )
      .then((res) => {
        console.log(res.data);
      });
    if (formValid(this.state)) {
      console.log(`
              --SUBMITTING--
              Full Name: ${this.state.editprofile.name}
              Mobile Number: ${this.state.editprofile.mob}
              Email: ${this.state.editprofile.email}
              panNumber: ${this.state.editprofile.panNum}
              aadhar: ${this.state.editprofile.aadharNum}
              years: ${this.state.editprofile.experience}
              education: ${this.state.editprofile.eduQual}
              jobUpdate:${this.state.editprofile.jobUpdate}
              address:${this.state.editprofile.address},
              working : ${this.state.editprofile.working},
              userLogin:{
                id:this.state.userId
              }},
              jobTypes:[{
                id:this.state.jobTypes.id
              }],
              fresher:${this.state.editprofile.fresher},
           
            noticePeriod:${this.state.editprofile.noticePeriod},
            companyName:${this.state.editprofile.companyName},
            currentLocation:${this.state.editprofile.currentLocation},
            jobLocation:${this.state.editprofile.jobLocation},
            designation:${this.state.editprofile.designation},
            negotiable:${this.state.editprofile.negotiable},
            upTo:${this.state.editprofile.upTo},
            noOfDays:${this.state.editprofile.noOfDays},
            address:${this.state.editprofile.address},
            prevcompanyName:${this.state.editprofile.prevcompanyName},
          prevdesignation:${this.state.editprofile.prevdesignation},
          prevjobLocation:${this.state.editprofile.prevjobLocation},
             `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  handleEditImage = (e) => {
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    this.setState({
      editprofileimage: e.target.files[0],
      createeditprofileimage: e.target.files[0],
    });
    const timer10 = setTimeout(() => {
      let formData = new FormData();

      formData.append("file", this.state.createeditprofileimage);
      axios
        .post("/stskFmsApi/imageDoc/createDoc/" + this.state.userId, formData, {
          headers: {
            "x-api-key":
              " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.setState({
            createeditprofileimagedocId: res.data.data,
          });
        })
        .catch((err) => console.log(err));
    }, 4000);
    const timer11 = setTimeout(() => {
      axios
        .get(
          "/stskFmsApi/imageDoc/retriveWithPath/" +
            this.state.createeditprofileimagedocId,
          { headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            createeditprofileimagepath: res.data.data.path,
          });
        })
        .catch((err) => console.log(err));
    }, 5000);

    const timer = setTimeout(() => {
      let formData = new FormData();

      formData.append("file", this.state.editprofileimage);
      axios
        .post(
          "/stskFmsApi/imageDoc/EditDoc/" +
            this.state.profileimageretrievedocId,
          formData,
          {
            headers: {
              "x-api-key":
                " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
            },
          }
        )
        .then((res) => {
          console.log(res, "test");
          console.log(res.data);
          this.setState({
            editprofileimagedocId: res.data.data,
          });
        })
        .catch((err) => console.log(err));
    }, 3000);

    // if(editprofileimagedocId==null){

    // }
  };
  handleChange2Arg = (selectedvalue) => {
    console.log(selectedvalue);
    console.log(`Option selected:`, selectedvalue);
    this.setState({ selectedvalue });
    this.setState({ jobTypes: selectedvalue });
    // var test=document.getElementsByClassName('_2OR24XnUXt8OCrysr3G0XI ')[0].innerHTML;
    // document.getElementById("valsel").innerHTML=test;
  };
  handleSearch = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state);
    this.props.history.push("/searchedJobs");
    // axios
    //   .get("/stskFmsApi/jobs/getByJobName/" + this.state.text, {
    //     headers: header,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.success === 1) {
    //       this.props.history.push({
    //         pathname: "/searchedJobs",
    //         state: {
    //           userInput: this.state.text,
    //         },
    //       });
    //     }
    // console.log(res.data.data[0].name);
    // this.setState({
    //   items: res.data.data,
    // });
    // })
    // .catch((err) => console.log(err));
    // this.props.history.push("/searchedJobs");
    // this.setState({
    //   search: e.target.value,
    // });
    // const timer1 = setTimeout(() => {
    //   axios
    //     .get("/stskFmsApi/jobs/getByJobs/" + this.state.search, {
    //       headers: header,
    //     })
    //     .then((res) => {
    //       if (res.data.success === 1) {
    //         this.setState({
    //           searchedJobs: res.data.data,
    //           searchLoading: true,
    //           searchError: "",
    //         });
    //       } else {
    //         this.setState({
    //           searchError: "Sorry, No job updates..!",
    //         });
    //       }
    //     });
    // }, 3000);
  };

  render() {
    if (this.props.token.SendOtp.token !== true) {
      return <Redirect to="/userLogin" />;
    }
    const { text } = this.state;
    const names = this.state.items.map((name) => {
      return name.name;
    });
    const {
      mobileNumber,
      userId,
      recomendedJobs,
      savedJobs,
      newJobs,
      appliedJobs,
      payLoad: {
        details: { name, email, mob, experience, eduQual },
      },
    } = this.props.dashboard;

    console.log(this.props.token.SendOtp.token);

    /*saved jobs */
    //const { savedJobs } = this.state;
    const saveNumber = savedJobs.length;

    /*new jobs */
    // const { newJobs } = this.state;
    const newNumber = newJobs.length;

    /*recomended jobs*/

    //const { recomendedJobs } = this.state;
    const nmbr = recomendedJobs.length;

    const recommendedList = recomendedJobs.length ? (
      recomendedJobs.slice(0, 3).map((job) => {
        return (
          <div className="col 12 m6 l4" key={job.id}>
            <div
              className="card darken-1 hoverable "
              id="recomendedJobsMainDashboard"
            >
              <div
                className="card-content"
                style={{
                  fontsize: "14px",
                  letterSpacing: "0px",
                }}
              >
                <p className="black-text">
                  Job position-
                  <span className="grey-text">{job.jobType}</span>
                </p>
                <br></br>
                <p className="black-text">
                  Experience-
                  <span className="grey-text">{job.experience}</span>
                </p>
                <br></br>
                <p className="black-text">
                  Location-
                  <span className="grey-text">{job.serviceArea}</span>
                </p>
              </div>
              <div className="card-action">
                <h6 className="left">{job.createdAt}</h6>
                <i
                  className="material-icons teal-text right"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/recomendedJobs",
                    })
                  }
                >
                  arrow_forward
                </i>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>Loading please wait...</div>
    );

    /*applied jobs*/
    console.log(this.state);
    //const { appliedJobs } = this.state;
    const appliedJobsNmbr = appliedJobs.length;
    const appliedJobsList = appliedJobs.length ? (
      appliedJobs.slice(0, 3).map((applied) => {
        return (
          <div className="col 12 m6 l4" key={applied.id}>
            <div
              className="card darken-1 hoverable"
              id="recomendedJobsMainDashboard"
            >
              <div className="card-content ">
                <strong className="black-text">
                  Job position-
                  <span className="grey-text">{applied.jobType}</span>
                </strong>
                <br></br>
                <strong className="black-text">
                  Experience-
                  <span className="grey-text">{applied.experience}</span>
                </strong>
                <br></br>
                <strong className="black-text">
                  Location-
                  <span className="grey-text">{applied.serviceArea}</span>
                </strong>
                <br></br>
              </div>
              <div className="card-action">
                <strong className="left">{applied.createdAt}</strong>
                <i className="material-icons teal-text right">arrow_forward</i>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">
        <h5>You have not Applied for any Jobs</h5>
      </div>
    );

    return (
      <div
        id="back"
        className="grey lighten-5
      "
      >
        <NavbarTop />
        <div className="row">
          <div className="">
            <img className="center" id="dashboard" src={dashboard}></img>
            <div className="center-align show-on-large">
              <h6 id="textimg">Find your job here</h6>
            </div>
          </div>

          <form onSubmit={this.handleSearch}>
            <nav className="container white" id="search">
              <div className="nav-wrapper">
                <div className="input-field">
                  <input
                    list="browsers"
                    id="dashinput"
                    type="search"
                    onChange={this.handleSearchInput}
                    required
                    placeholder="Search jobs"
                  />
                  <datalist id="browsers">{this.testSearch()}</datalist>
                  <i className="material-icons right">
                    <a
                      className="btn hide-on-small-only"
                      onClick={this.handleSearch}
                      id="src1"
                    >
                      <i className="material-icons right" id="src">
                        search
                      </i>
                      Search
                    </a>
                  </i>

                  <i
                    className="material-icons right show-on-small hide-on-med-and-up grey-text"
                    onClick={this.handleSearch}
                  >
                    search
                  </i>
                </div>
              </div>
            </nav>
          </form>
        </div>
        {/* edit profile*/}
        <div className="" id="details">
          <div className="row">
            <div className="col s12 m12 l12 grey lighten-5">
              <div
                className="col s10 m3 l2 offset-m1 offset-l1 offset-s1 z-depth-1 white"
                id="profile"
              >
                <div id="editicn">
                  <Popup
                    contentStyle={{ width: "95%" }}
                    trigger={
                      <div
                        className="col-8 mx-auto text-center z-depth-1"
                        id="editprofile"
                      >
                        <img src={edit} width="20" height="20"></img>
                        <small
                          className="center-align editprofile"
                          style={{ color: "#3fb2aa" }}
                        >
                          Edit Profile
                        </small>
                      </div>
                    }
                    modal
                    width="70%"
                  >
                    {(close) => (
                      <div className="popup-content">
                        <div className="col s12 m12 l12">
                          <div className="right-align">
                            <i
                              className="material-icons"
                              id="dashcancelbtn"
                              onClick={() => {
                                close();
                              }}
                            >
                              clear
                            </i>
                          </div>
                          <EditProfile />

                          <br></br>
                        </div>
                      </div>
                    )}
                  </Popup>
                  {/* <Popup
                    contentStyle={{ width: "75%" }}
                    modal
                    trigger={
                      <div className="right-align" style={{ width: "75%" }}>
                        <img src={edit} width="20" height="20"></img>
                      </div>
                    }
                    position="center"
                    width="70%"
                  >
                    {(close) => (
                      <div
                        class="popup-content"
                        onClick={() => {
                          close();
                        }}
                      >
                        <EditProfile />
                      </div>
                    )}
                  </Popup> */}
                </div>
                <div className="center" id="profile1">
                  <div className="center">
                    <img
                      src={this.state.profileimagepath}
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50px",
                      }}
                    ></img>
                    {/* <i className="material-icons large">person</i> */}
                    <br></br>
                  </div>
                  <strong className="center-align">{name}</strong>
                  <div
                    className="left-align"
                    style={{ fontSize: "13px", marginBottom: "15px" }}
                  >
                    <p className="dashFont">
                      <img
                        className="center"
                        id="dashicn"
                        src={location}
                        width="20"
                        height="20"
                      ></img>
                      {this.state.details.currentLocation}
                    </p>
                    <p>
                      <img
                        className="center"
                        id="dashicn"
                        src={mail}
                        width="14"
                        height="14"
                      />
                      {email}
                    </p>
                    <p id="dashMob">
                      <img
                        className="center"
                        id="dashicn"
                        src={call}
                        width="16"
                        height="16"
                      />
                      {mob}
                    </p>
                    <p id="dashMob">
                      <img
                        className="center"
                        id="dashicn"
                        src={experiance}
                        width="16"
                        height="16"
                      />
                      {experience}
                    </p>
                    <p id="dashMob">
                      <img
                        className="center"
                        id="dashicn"
                        src={book}
                        width="17"
                        height="17"
                      />
                      {eduQual}
                    </p>
                  </div>

                  <hr></hr>
                  <a
                    className="waves-effect waves-light btn"
                    onClick={this.handleLogout}
                    id="logout"
                  >
                    <img
                      className="center"
                      style={{ marginRight: "18px" }}
                      src={logout}
                      width="20"
                      height="20"
                    />
                    Logout
                  </a>
                  <br></br>
                </div>
              </div>

              <div>
                <div
                  className="col s11 m7 l8 offset-l1 border offset-s1 grey lighten-5 container"
                  id="container"
                >
                  <div>
                    <h5
                      className="grey-text"
                      style={{ padding: "12px", fontWeight: "bold" }}
                    >
                      Recommended jobs
                    </h5>

                    {recommendedList}
                    <div className="suggestionbox z-depth-1">
                      <ul id="listitem">
                        <li>{this.renderSuggestions()}</li>
                      </ul>
                    </div>
                    <div className="col s12 m12 l12">
                      <strong>
                        <div className="numberCircle left">{nmbr}</div>
                        <h5 className="left">jobs recommended for you</h5>
                      </strong>
                      <a
                        className="btn right"
                        id="viewMore"
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/recomendedJobs",
                          })
                        }
                      >
                        View more
                      </a>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
                <div className="col s12 m10 l8 offset-m1">
                  <div className="col s12 m6 l6">
                    <div className="card white newJobs">
                      <div className="card-content white-text">
                        <span className="card-title right" id="number">
                          {newNumber}
                        </span>
                        <h5>New jobs</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h5 className="left">Security Guard</h5>
                        <h6
                          className="right"
                          id="viewdetailss"
                          onClick={() =>
                            this.props.history.push({
                              pathname: "/newJobs",
                            })
                          }
                        >
                          View Details
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m10 l8 offset-m1 show-on-small hide-on-med-and-up">
                    <div className="card white newJobs">
                      <div className="card-content white-text">
                        <span className="card-title right" id="number">
                          {saveNumber}
                        </span>
                        <h5>Saved jobs</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h5 className="left">Security Guard</h5>
                        <h6
                          className="right"
                          id="viewdetailss"
                          onClick={() =>
                            this.props.history.push({
                              pathname: "/savedJobs",
                            })
                          }
                        >
                          View Details
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="card white newJobs hide-on-small-only">
                    <div className="card-content white-text">
                      <span className="card-title right" id="number">
                        {saveNumber}
                      </span>
                      <h5>Saved jobs</h5>
                      <br></br>
                      <br></br>
                      <br></br>
                      <h5 className="left">Security Guard</h5>
                      <h6
                        className="right"
                        id="viewdetailss"
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/savedJobs",
                          })
                        }
                      >
                        View Details
                      </h6>
                    </div>
                  </div>
                  <div className="col s10 m10 l12 offset-m1 offset-s1 border appliedStatus grey lighten-5 hide-on-med-and-down">
                    <h5 style={{ padding: "15px" }} className="grey-text">
                      Appied status
                    </h5>
                    {appliedJobsList}
                    <div className="col s12 m12 l12">
                      <strong>
                        <div className="numberCircle left">
                          {appliedJobsNmbr}
                        </div>
                        <h5 className="left">jobs </h5>
                      </strong>
                      <a className="btn right" id="viewMore">
                        View more
                      </a>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              {/*applied status*/}
              <div className="col s10 m10 l12 offset-m1 offset-s1 border appliedStatus grey lighten-5 show-on-medium-and-down hide-on-large-only">
                <h5 style={{ padding: "15px" }} className="grey-text">
                  Appied status
                </h5>
                {appliedJobsList}
                <div className="col s12 m12 l12">
                  <strong>
                    <div className="numberCircle left">{appliedJobsNmbr}</div>
                    <h5 className="left">jobs </h5>
                  </strong>
                  <a className="btn right" id="viewMore">
                    View more
                  </a>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright" id="footer">
          <h6 className="center v-center">
            Copyright @2020 All rights reserved | This tamplate is made with
            STSK
          </h6>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dashboard: state.userLogin.userLogin,
    token: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (id) => dispatch(handleSearch(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));

// <div
// className="col s12 m10 l8 offset-m1"
// style={{ marginLeft: "23px" }}
// >
// <div
//   className="col s12 m6 l6"
//   style={{ marginLeft: "-27px" }}
// >
