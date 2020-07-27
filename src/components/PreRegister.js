import React, { Component } from "react";
import { withRouter, Link, Route } from "react-router-dom";
import logo from "./Images/Mainlogo.png";
import left from "./Images/leftside.png";
import right from "./Images/rightside.png";
import job from "./Images/jobseeker2.png";
import vendor from "./Images/vendor2.png";
import association from "./Images/association2.png";
import resident from "./Images/resident2.png";
import "./css/preregister.css";
import axios from "axios";

const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

export class Register extends Component {
  state = {
    userRoless: [],
    mobileNumber: "",
    userRoles: {
      id: "",
    },
    Jobseeker: {
      id: 1,
      name: "Jobseeker",
    },
    Associationn: {
      id: 2,
      name: "Accosiation",
    },
    Resident: {
      id: 3,
      name: "Resident",
    },
    Vendor: {
      id: 4,
      name: "Vendor",
    },
  };
  handleChange = (e) => {
    this.props.history.push({
      pathname: "/register",
      JobId: this.state.Jobseeker,
    });
  };
  handleChange1 = (e) => {
    this.props.history.push({
      pathname: "/register",
      JobId: this.state.Associationn,
    });
  };
  handleChange2 = (e) => {
    this.props.history.push({
      pathname: "/register",
      JobId: this.state.Resident,
    });
  };
  handleChange3 = (e) => {
    this.props.history.push({
      pathname: "/register",
      JobId: this.state.Vendor,
    });
  };

  render() {
    const { userRoless } = this.state;
    return (
      <div className="center row" id="body">
        <div className="center col s10" id="main">
          <img
            className="left align"
            id="side"
            src={left}
            width="50"
            height="50"
          ></img>
          <img
            className="right align"
            id="side"
            src={right}
            width="50"
            height="50"
          ></img>
          <center id="center">
            <img
              id="logo"
              className="center"
              src={logo}
              width="60"
              height="60"
            ></img>
            <br></br>
            <br></br>
            <h4 className="center" id="texttt">
              Choose Category
            </h4>

            <div className="row">
              <div
                className="col s12 m6 l6"
                id="jobseeeker"
                onClick={this.handleChange}
              >
                <img
                  className="left align"
                  src={job}
                  width="60"
                  height="60"
                ></img>
                <h6 id="pre">Jobseeker</h6>
              </div>
              <div
                className="col s12 m6 l6"
                id="associationn"
                onClick={this.handleChange1}
              >
                <img
                  className="left align"
                  src={association}
                  width="60"
                  height="60"
                ></img>
                <h6 id="pre">Association</h6>
              </div>
            </div>
            <div className="row">
              <div
                className="col s12 m6 l6"
                id="vendorr"
                onClick={this.handleChange2}
              >
                <img
                  className="left align"
                  src={vendor}
                  width="60"
                  height="60"
                ></img>
                <h6 id="pre">Residend</h6>
              </div>
              <div
                className="col s12 m6 l6"
                id="residentt"
                onClick={this.handleChange3}
              >
                <img
                  className="left align"
                  src={resident}
                  width="60"
                  height="60"
                ></img>
                <h6 id="pre">Vendor</h6>
              </div>
            </div>
          </center>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
