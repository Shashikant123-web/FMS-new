import React, { Component } from "react";
import "../css/RecomendedJobs.css";
import mainLogo from "../Images/Mainlogo.png";
import dashboard from "../Images/dashboard.png";
import { withRouter, Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from "axios";
import rightMark from "../Images/tic.png";
import NavbarTop from "../NavbarJobseeker/NavbarTop";

import {
  handleSave,
  handleUnsave,
  handleApply,
  handleSearch,
} from "../../ReduxStore/Actions/RecomendedJobsAction";
import { connect } from "react-redux";

const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

export class SavedJobs extends Component {
  state = {
    testSearch: [],
    id: "",
    userId: "",
    text: "",
  };
  componentDidMount() {
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
    }
  }
  testSearch() {
    return this.state.testSearch.map((type) => {
      return <option value={type.name} />;
    });
  }
  handleSearchInput = (e) => {
    this.setState({
      text: e.target.value,
    });
  };
  handleSearch = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state);
    this.props.history.push("/searchedJobs");
  };
  handleApply = (id) => {
    this.setState({
      id,
    });
    const time3 = setTimeout(() => {
      this.props.handleApply(this.state);
    }, 50);
  };
  handleUnsave = (id) => {
    // this.setState({
    //   id,
    // });
    // const time2 = setTimeout(() => {
    //   this.props.handleUnsave(this.state);
    // }, 50);
    axios
      .post(
        "/stskFmsApi/jobseeker/unSaveJobs/" + this.state.userId + "/" + id,
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res.data.data);
        console.log(res.data);
        console.log(res);
      });
  };

  render() {
    if (this.props.token.SendOtp.token !== true) {
      return <Redirect to="/userLogin" />;
    }
    console.log(this.props);
    const { savedJobs, appliedJobs } = this.props.dashboard;
    const savedNumber = savedJobs.length;
    const savedJobsList = savedJobs.length ? (
      savedJobs.map((job) => {
        return (
          <div key={job.id}>
            <div className="col s12 m12 l12">
              <div className="card darken-1 hoverable " id="recomendedJobsMain">
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
                              width="15"
                              height="15"
                            ></img>
                            Applied
                          </h6>
                        ) : null}
                        <br></br>
                      </div>

                      <br></br>

                      <div className="row">
                        <div className="col s12 m4 l4" id="marginLeft">
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
                        <div className="col s12 m4 l4">
                          <strong className="black-text">
                            Experiance-
                            <span className="grey-text">{job.experience}</span>
                          </strong>
                          <br></br>
                          <strong className="black-text">
                            Age limit-
                            <span className="grey-text">{job.experience}</span>
                          </strong>
                          <br></br>
                          <strong className="black-text">
                            Location-
                            <span className="grey-text">{job.serviceArea}</span>
                          </strong>
                        </div>
                        <div className="col s12 m4 l4">
                          <strong className="black-text">
                            Vacancy-
                            <span className="grey-text">{job.vacancy}</span>
                          </strong>
                          <br></br>
                          <strong className="black-text">
                            Salary range-
                            <span className="grey-text">{job.salaryRange}</span>
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

                        <h4 className="center align grey-text">View Details</h4>

                        <div className="row">
                          <div className="col s12 m4 l4">
                            <br></br>
                            <strong className="black-text">
                              Job position-
                              <span className="grey-text">{job.jobType}</span>
                            </strong>
                            <br></br>
                            <br></br>
                            <strong className="black-text">
                              Language-
                              <span className="grey-text">{job.language}</span>
                            </strong>
                            <br></br>
                            <br></br>
                            <strong className="black-text">
                              Valid Upto-
                              <span className="grey-text">{job.validUpto}</span>
                            </strong>
                            <br></br>
                            <br></br>
                            <strong className="black-text">
                              Salary range-
                              <span className="grey-text">
                                {job.salaryRange}
                              </span>
                            </strong>
                          </div>
                          <div className="col s12 m4 l4">
                            <br></br>
                            <strong className="black-text">
                              Experiance-
                              <span className="grey-text">
                                {job.experience}
                              </span>
                            </strong>
                            <br></br>
                            <br></br>
                            <strong className="black-text">
                              Age limit-
                              <span className="grey-text">
                                {job.experience}
                              </span>
                            </strong>
                            <br></br>
                            <br></br>
                            <strong className="black-text">
                              Location-
                              <span className="grey-text">
                                {job.serviceArea}
                              </span>
                            </strong>
                            <br></br>
                            <br></br>
                            <strong className="black-text">
                              Vacancy-
                              <span className="grey-text">{job.vacancy}</span>
                            </strong>
                          </div>
                        </div>
                        <div>
                          <strong>Description</strong>
                          <br></br>
                          <p className="grey-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. since the 1500s, when an
                            unknown
                          </p>
                        </div>
                        <div className="center">
                          <a
                            className="btn center"
                            id="savebtn"
                            onClick={() => this.handleUnsave(job.id)}
                          >
                            <i className="material-icons left">turned_in</i>
                            saved
                          </a>
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
                    <strong
                      className="right"
                      key={job.id}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>
        Loading please wait...
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

    console.log(this.state);
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
                <strong className="teal-text">Saved jobs</strong>
              </strong>
            </div>
            <br></br>
            <hr></hr>
            <div>
              <h5 className="left">
                <strong>Saved jobs for you</strong>
              </h5>
              <strong className="right">
                <div className="numberCircle left">{savedNumber}</div>
                <h5 className="right">jobs</h5>
              </strong>
            </div>
            <br></br>
            <br></br>
            {savedJobsList}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleUnsave: (id) => dispatch(handleUnsave(id)),
    handleApply: (id) => dispatch(handleApply(id)),
    handleSearch: (id) => dispatch(handleSearch(id)),

    // hideJobs: (id) => dispatch({ type: HIDE_JOBS, id: id }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SavedJobs));
