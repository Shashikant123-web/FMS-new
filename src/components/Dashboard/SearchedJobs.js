import React, { Component } from "react";
import "../css/RecomendedJobs.css";
import mainLogo from "../Images/Mainlogo.png";
import dashboard from "../Images/dashboard.png";
import { withRouter, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from "axios";
import rightMark from "../Images/tic.png";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import NavbarTop from "../NavbarJobseeker/NavbarTop";
import EditProfile from "../Editprofile";

import { HIDE_JOBS } from "../../ReduxStore/ActionTypes/actionTypes";
import {
  handleSave,
  handleUnsave,
  handleApply,
  handleSearch,
} from "../../ReduxStore/Actions/RecomendedJobsAction";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

export class SearchedJobs extends Component {
  state = {
    showPopup: false,
    id: "",
    userId: "",
    userInput: "",
    searchedjobdetails: "",
    text: "",
  };
  handleSearchInput = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };
  handleSearch = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state.searchInput);
    this.props.history.push("/searchedJobs");
  };

  componentDidMount() {
    if (this.props.token.SendOtp.token !== true) {
      return <Redirect to="/userLogin" />;
    } else {
      this.setState({
        userId: this.props.dashboard.payLoad.userId,
      });
    }
  }
  handleHide = (id) => {
    console.log(id);

    this.props.hideJobs(id);
  };
  handleSave = (id) => {
    console.log("shashi");
    this.setState({
      id,
    });
    // this.props.handleSave({ id }, { userId: 12 });
    // this.props.handleSave(this.state);

    const time = setTimeout(() => {
      this.props.handleSave(this.state);
    }, 50);
  };
  handleUnsave = (id) => {
    this.setState({
      id,
    });
    const time2 = setTimeout(() => {
      this.props.handleUnsave(this.state);
    }, 50);
  };

  handleApply = (id) => {
    this.setState({
      id,
    });
    const time3 = setTimeout(() => {
      this.props.handleApply(this.state);
    }, 50);
  };
  handlepopupopen() {
    // document.getElementById("popupopen").Style.display = "block";
    // window.open("./editprofile");
    var popup = document.getElementById("popupopen");
    popup.classList.toggle("show");
  }
  //handleSave = (id) => {
  // axios
  //   .post(
  //     "/stskFmsApi/jobseeker/saveJobs",
  //     {
  //       id: 27,
  //       jobs: [
  //         {
  //           id: id,
  //         }
  //       ]
  //     },
  //     { headers: header }
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //     console.log(res);
  //   });
  // {
  //   this.state.saved.map((savedId) => {
  //     var flag = document.getElementById(id).innerHTML;

  //     if (flag === "turned_in_not" && id == savedId) {
  //       var a = (document.getElementById(id).innerHTML = "turned_in");
  //       flag = 1;
  //     } else {
  //       var a = (document.getElementById(id).innerHTML = "turned_in_not");
  //     }
  //   });
  // }
  //   console.log(id);
  //   this.setState({
  //     saved: [...this.state.saved, id],
  //   });
  // };

  render() {
    if (this.props.token.SendOtp.token !== true) {
      return <Redirect to="/userLogin" />;
    }
    const { searchedJobs } = this.props.searchedJobs.SendOtp;
    const {
      payLoad: { userId },
      recomendedJobs,
      savedJobs,
      appliedJobs,
    } = this.props.dashboard;
    console.log(searchedJobs);
    var nmbr = searchedJobs && searchedJobs.length;
    const searchedjobList =
      searchedJobs && searchedJobs.length ? (
        searchedJobs.map((job) => {
          return (
            <div key={job.id}>
              <div className="col s12 m12 l12">
                <div
                  className="card darken-1 hoverable"
                  id="recomendedJobsMain"
                >
                  <Popup
                    trigger={
                      <div className="card-content recomendedJobs ">
                        <div>
                          <h5>
                            <strong className="left">{job.jobType}</strong>
                          </h5>
                          {job.isApplied ? (
                            <h6 className="right teal-text">
                              <img
                                src={rightMark}
                                className="rightIcon"
                                width="20"
                                height="20"
                              ></img>
                              Applied
                            </h6>
                          ) : null}
                          <br></br>
                        </div>

                        <br></br>
                        <div className="row">
                          <div className="show-on-small hide-on-med-and-up">
                            <div className="col s12" id="showOnSmall">
                              <strong className="black-text col s12">
                                Job position -
                                <span className="grey-text" id="smallScreen">
                                  {job.jobType}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Language -
                                <span className="grey-text" id="smallScreen">
                                  {job.language}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Valid Upto -
                                <span className="grey-text" id="smallScreen">
                                  {job.validUpto}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Experiance -
                                <span className="grey-text" id="smallScreen">
                                  {job.experience}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Age limit -
                                <span className="grey-text" id="smallScreen">
                                  {job.experience}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Location -
                                <span className="grey-text" id="smallScreen">
                                  {job.serviceArea}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Vacancy -
                                <span className="grey-text" id="smallScreen">
                                  {job.vacancy}
                                </span>
                              </strong>
                              <strong className="black-text col s12">
                                Salary range -
                                <span className="grey-text" id="smallScreen">
                                  {job.salaryRange}
                                </span>
                              </strong>
                            </div>
                          </div>

                          <div
                            className="col s12 m4 l4 hide-on-small-only"
                            id="marginLeft"
                          >
                            <strong className="black-text">
                              Job position-
                              <span className="grey-text">{job.jobType}</span>
                            </strong>
                            <br></br>
                            <strong className="black-text">
                              Language-
                              <span className="grey-text">{job.language}</span>
                            </strong>
                            <br></br>
                            <strong className="black-text">
                              Valid Upto-
                              <span className="grey-text">{job.validUpto}</span>
                            </strong>
                          </div>
                          <div className="col m4 l4 hide-on-small-only">
                            <strong className="black-text">
                              Experiance-
                              <span className="grey-text">
                                {job.experience}
                              </span>
                            </strong>
                            <br></br>
                            <strong className="black-text">
                              Age limit-
                              <span className="grey-text">
                                {job.experience}
                              </span>
                            </strong>
                            <br></br>
                            <strong className="black-text">
                              Location-
                              <span className="grey-text">
                                {job.serviceArea}
                              </span>
                            </strong>
                          </div>
                          <div className="col m4 l4 hide-on-small-only">
                            <strong className="black-text">
                              Vacancy-
                              <span className="grey-text">{job.vacancy}</span>
                            </strong>
                            <br></br>
                            <strong className="black-text">
                              Salary range-
                              <span className="grey-text">
                                {job.salaryRange}
                              </span>
                            </strong>
                            <br></br>
                          </div>
                        </div>
                      </div>
                    }
                    modal
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

                          <h4 className="center align grey-text">
                            View Details
                          </h4>

                          <div className="row">
                            <div className="col s12 m4 l4">
                              <br></br>
                              <strong className="black-text">
                                Job position-
                                <span className="grey-text">{job.jobType}</span>
                              </strong>
                              <br></br>
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Language-
                                <span className="grey-text">
                                  {job.language}
                                </span>
                              </strong>
                              <br></br>
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Valid Upto-
                                <span className="grey-text">
                                  {job.validUpto}
                                </span>
                              </strong>
                              <br></br>
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Salary range-
                                <span className="grey-text">
                                  {job.salaryRange}
                                </span>
                              </strong>
                            </div>
                            <div className="col s12 m4 l4">
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Experiance-
                                <span className="grey-text">
                                  {job.experience}
                                </span>
                              </strong>
                              <br></br>
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Age limit-
                                <span className="grey-text">
                                  {job.experience}
                                </span>
                              </strong>
                              <br></br>
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Location-
                                <span className="grey-text">
                                  {job.serviceArea}
                                </span>
                              </strong>
                              <br></br>
                              <br className="hide-on-small-only"></br>
                              <strong className="black-text">
                                Vacancy-
                                <span className="grey-text">{job.vacancy}</span>
                              </strong>
                            </div>
                          </div>
                          <div>
                            <strong>Description</strong>
                            <br></br>
                            <p className="grey-text">{job.description}</p>
                          </div>
                          <div className="text-left">
                            <h6>Before Applying do you want to Edit?</h6>
                            <Popup
                              contentStyle={{ width: "75%" }}
                              trigger={
                                <p>
                                  <label>
                                    <input
                                      name="fresher"
                                      value="true"
                                      type="radio"
                                      id="ra"
                                    />
                                    <span
                                      id="label"
                                      onClick={() => console.log("shashi")}
                                    >
                                      Yes
                                    </span>
                                  </label>
                                </p>
                              }
                              modal
                              position="center"
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

                            <p>
                              <label>
                                <input
                                  name="fresher"
                                  value="false"
                                  onClick={this.handleRadio}
                                  type="radio"
                                  id="ra"
                                />
                                <span id="label">No</span>
                              </label>
                            </p>
                            {/* {this.state.showPopup ? ( */}
                            <Popup
                              contentStyle={{ width: "75%" }}
                              trigger={<div id="popupopen"></div>}
                              modal
                              position="center"
                              width="70%"
                            >
                              <div className="popup-content">
                                <EditProfile />
                              </div>
                            </Popup>
                          </div>
                          <div className="center">
                            {job.isSaved ? (
                              <a
                                className="btn center"
                                id="savebtn"
                                onClick={() => this.handleUnsave(job.id)}
                              >
                                <i className="material-icons left">turned_in</i>
                                saved
                              </a>
                            ) : (
                              <a
                                className="btn center"
                                id="savebtn"
                                onClick={() => this.handleSave(job.id)}
                              >
                                <i className="material-icons left">
                                  turned_in_not
                                </i>
                                save
                              </a>
                            )}
                            {job.isApplied ? (
                              <a className="btn center" id="applybtn">
                                Applied
                              </a>
                            ) : (
                              <a
                                className="btn center"
                                onClick={() => this.handleApply(job.id)}
                                id="applybtn"
                              >
                                Apply
                              </a>
                            )}
                          </div>

                          <br></br>
                        </div>
                      </div>
                    )}
                  </Popup>
                  <div className="card-action">
                    <strong className="left">{job.createdAt}</strong>
                    <div className="right">
                      {job.isSaved ? (
                        <strong
                          className="right"
                          onClick={() => this.handleUnsave(job.id)}
                        >
                          <i
                            className="material-icons teal-text left"
                            id="saveHide"
                          >
                            turned_in
                          </i>
                          saved
                        </strong>
                      ) : null}
                      {job.isSaved ? null : (
                        <strong
                          className="right"
                          onClick={() => this.handleSave(job.id)}
                        >
                          <i
                            className="material-icons teal-text left"
                            id="saveHide"
                          >
                            turned_in_not
                          </i>
                          save
                        </strong>
                      )}
                      <strong
                        className="right"
                        onClick={() => {
                          this.handleHide(job.id);
                        }}
                      >
                        <i
                          className="material-icons teal-text left"
                          id="saveHide"
                        >
                          visibility_off
                        </i>
                        hide
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h5> No jobs...</h5>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      );

    return (
      <div id="back" className="grey lighten-5">
        <div>
          <NavbarTop />
          <div className="row">
            <img className="center" id="dashboard" src={dashboard}></img>
            <div className="center-align">
              <h6 className="show-on-large" id="textimg">
                How can we help?
              </h6>
            </div>

            <form onSubmit={this.handleSearch}>
              <nav className="container white" id="search">
                <div className="nav-wrapper">
                  <div className="input-field">
                    <input
                      id="dashinput"
                      type="search"
                      onChange={this.handleSearchInput}
                      required
                      placeholder="Search jobs"
                    />
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

          <div className="container mainContainer">
            <div className="left">
              <strong
                className="waves-effect waves-light"
                onClick={() => {
                  this.props.history.push("/dashboard");
                }}
              >
                <i className="material-icons left grey-text" id="homeIcon">
                  home
                </i>
                Home
              </strong>
              <strong className="waves-effect waves-light">
                <i className="material-icons left">chevron_right</i>
                <strong className="teal-text">Search jobs</strong>
              </strong>
            </div>
            <br></br>
            <hr></hr>
            <div>
              <h5 className="left">
                <strong>Searched jobs for you</strong>
              </h5>
              <strong className="right">
                <div className="numberCircle left">{nmbr}</div>
                <h5 className="right">jobs</h5>
              </strong>
            </div>
            <br></br>
            <br></br>
            {searchedjobList}
          </div>

          <div className="footer-copyright" id="footer">
            <h6 className="center">
              Copyright @2020 All rights reserved | This tamplate is made with
              STSK
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.userLogin.userLogin,
    token: state,
    searchedJobs: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSave: (id) => dispatch(handleSave(id)),
    handleUnsave: (id) => dispatch(handleUnsave(id)),
    handleApply: (id) => dispatch(handleApply(id)),
    hideJobs: (id) => dispatch({ type: HIDE_JOBS, id: id }),
    handleSearch: (value) => dispatch(handleSearch(value)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchedJobs));
