import React, { Component } from "react";
import "./css/dashboardHelp.css";
import dashboard from "./Images/dashboard.png";
import { withRouter, Redirect } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/js/materialize.min.js";
import NavbarJobseeker from "../components/NavbarJobseeker";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import UserLogin from "./UserLogin";
import NavbarBottom from "./NavbarJobseeker/NavbarBottom";
import { connect } from "react-redux";
import { HIDE_JOBS } from "../ReduxStore/ActionTypes/actionTypes";
import { handleSearch } from "../ReduxStore/Actions/RecomendedJobsAction";
export class dashboardHelp extends Component {
  state = {
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
    }
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

  render() {
    if (this.props.token.SendOtp.token !== true) {
      return <Redirect to="/userLogin" />;
    }
    const jobseker = require("./Json/Jobseeker.json");

    // const jobseekerList = jobseker.length
    //   ? jobseker.map((Qes) => {
    //       return (
    //         <div key={Qes.id}>
    //           <div className="" id="accordionExample">
    //             <div className="card">
    //               <div
    //                 className="card-header white"
    //                 id="headingTwo"
    //                 data-toggle="collapse"
    //                 data-target="#collapseTwo"
    //               >
    //                 <p className="mb-0">
    //                   {Qes.question}
    //                   <i className="material-icons right">arrow_drop_down</i>
    //                 </p>
    //               </div>
    //               <div id="collapseTwo" className="collapse">
    //                 <div className="card-body">{Qes.ans}</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })
    //   : null;
    return (
      <div id="back">
        <div>
          <NavbarJobseeker />

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
                <strong className="teal-text">Help</strong>
              </strong>
            </div>
            <br></br>
            <hr></hr>
          </div>

          <h4 className="center" id="headinggg">
            <strong>Got questions?</strong>
          </h4>
          <h5 className="center" id="textcolor">
            Perfect, we've got answer!
          </h5>

          <br></br>

          <div
            className="container faqJobseeker"
            style={{ borderRadius: "5px" }}
            id="colli"
          >
            <h5 className="center-align" id="coll">
              Job Seeker
            </h5>
            <div className="" id="accordionExample">
              <div className="card">
                <div
                  className="card-header white"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                >
                  <p className="mb-0">
                    {jobseker[0].question}
                    <i className="material-icons right">keyboard_arrow_down</i>
                  </p>
                </div>
                <div id="collapseOne" className="collapse">
                  <div className="card-body">{jobseker[0].ans}</div>
                </div>
              </div>
            </div>
            <div className="" id="accordionExample">
              <div className="card">
                <div
                  className="card-header white"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                >
                  <p className="mb-0">
                    {jobseker[1].question}
                    <i className="material-icons right">keyboard_arrow_down</i>
                  </p>
                </div>
                <div id="collapseTwo" className="collapse">
                  <div className="card-body">{jobseker[1].ans}</div>
                </div>
              </div>
            </div>
            <div className="" id="accordionExample">
              <div className="card">
                <div
                  className="card-header white"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                >
                  <p className="mb-0">
                    {jobseker[2].question}
                    <i className="material-icons right">keyboard_arrow_down</i>
                  </p>
                </div>
                <div id="collapseThree" className="collapse">
                  <div className="card-body">{jobseker[2].ans}</div>
                </div>
              </div>
            </div>
            <div className="" id="accordionExample">
              <div className="card">
                <div
                  className="card-header white"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target="#collapseFour"
                >
                  <p className="mb-0">
                    {jobseker[3].question}
                    <i className="material-icons right">keyboard_arrow_down</i>
                  </p>
                </div>
                <div id="collapseFour" className="collapse">
                  <div className="card-body">{jobseker[3].ans}</div>
                </div>
              </div>
            </div>
            <div className="" id="accordionExample">
              <div className="card">
                <div
                  className="card-header white"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target="#collapseFive"
                >
                  <p className="mb-0">
                    {jobseker[4].question}
                    <i className="material-icons right">keyboard_arrow_down</i>
                  </p>
                </div>
                <div id="collapseFive" className="collapse">
                  <div className="card-body">{jobseker[4].ans}</div>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
          </div>
          <br></br>
          <NavbarBottom />
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
    hideJobs: (id) => dispatch({ type: HIDE_JOBS, id: id }),
    handleSearch: (id) => dispatch(handleSearch(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(dashboardHelp));
