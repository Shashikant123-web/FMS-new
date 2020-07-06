import React, { Component } from "react";
import axios from "axios";
import "../AssociationCSS/Navbar.css";
import "../AssociationCSS/Vendor.css";
import mainLogo from "../Images/Mainlogo.png";
import dashboard from "../Images/dashboard.png";
import { withRouter, Link, NavLink } from "react-router-dom";
import edit from "../Images/edit.png";
import Vendor from "../Help/Vendor";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class AssoVendor extends Component {
  state = {
    Block: true,
    Block1: true,
  };
  componentDidMount() {
    axios
      .get("/stskFmsApi/blocks/getAllBlocks", { headers: header })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  render() {
    return (
      <div className="white">
        <div className="navbar-fixed white">
          <nav className="white">
            <div className="nav-wrapper white container">
              <a className="brand-logo left jonnav" id="img">
                <img
                  className="center"
                  src={mainLogo}
                  width="50"
                  height="50"
                ></img>
              </a>
              <ul id="nav-mobile jonnav" className="right">
                <li>
                  <Link id="home" to="/nav">
                    Property Details
                  </Link>
                </li>
                <li>
                  <Link
                    className="waves-effect waves-light btn-small"
                    id="btnnav"
                    to="/vendor"
                  >
                    Vendor
                  </Link>
                </li>
                <li>
                  <Link id="home" to="/ResidentDetails">
                    Resident Details
                  </Link>
                </li>
                <li>
                  <Link id="home" to="/">
                    Payment
                  </Link>
                </li>
                <li>
                  <Link id="home" to="/associationPageHelp">
                    Help
                  </Link>
                </li>
                <li>
                  <i className="material-icons grey-text large" id="profileicn">
                    account_circle
                  </i>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="row">
          <div className="">
            <img className="center" id="dashboard" src={dashboard}></img>
            <div className="center-align">
              <h6 id="textimg">Your vendor details</h6>
            </div>
          </div>
        </div>

        {this.state.Block ? (
          <div className="row white">
            <div className="col s10 m10 l10">
              <div className="col s10 m10 l10 offset-m1 offset-l1 z-depth-1">
                <br></br>
                <h4 className="headingg grey-text">Vendor Details</h4>
                <div
                  id="MianBlock"
                  className="col s5 m4 l3 z-depth-1 grey container"
                  onClick={this.handleVendor}
                >
                  <br></br>
                  <div
                    id="block"
                    onClick={() => this.setState({ Block: false })}
                    className="button center-align white"
                  >
                    <i className="material-icons left color">
                      keyboard_arrow_right
                    </i>
                    <span className="left">Security guard</span>
                    <div className="right-align">
                      <i className="material-icons">clear</i>
                    </div>
                  </div>
                  <h6 className="white-text cursor-pointer left btntext">
                    View companys
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col s10 m10 l10">
              <div className="col s10 m10 l10 offset-m1 offset-l1 z-depth-1">
                <div className="row white">
                  <div className="col s10 m10 l10">
                    <h4 className="headingg grey-text">Vendor Details</h4>
                    <div
                      id="MianBlock"
                      className="col s5 m4 l3 z-depth-1 teal accent-4 container"
                      onClick={this.handleVendor}
                    >
                      <br></br>
                      <div
                        id="block"
                        onClick={() => this.setState({ Block: true })}
                        className="button center-align white"
                      >
                        <i className="material-icons left color">
                          keyboard_arrow_right
                        </i>
                        <span className="left">Security guard</span>
                        <div className="right-align">
                          <i className="material-icons">clear</i>
                        </div>
                      </div>
                      <h6 className="white-text cursor-pointer left btntext">
                        View companys
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="row white">
                  <div className="col s12 m10 l10">
                    <h4 className="headingg grey-text">
                      Security guard-Company & Employee-details
                    </h4>
                    <br></br>

                    <div className="card">
                      <div className="card-content container" id="assovendor">
                        <div className="col s6 m6 l6">
                          <p id="dashtext">
                            abc company private limited- bommanahalli
                          </p>
                        </div>
                        <div className="col s3 m3 l3">
                          <p id="dashtext">18 Employees</p>
                        </div>
                        <div className="col s3 m3 l3" id="assbtn">
                          <h6 className="center assbtn1">ViewDetails</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="footer-copyright" id="footer">
          <h6 className="center">
            {" "}
            Copyright @2020 All rights reserved | This tamplate is made with
            STSK
          </h6>
        </div>
      </div>
    );
  }
}

export default AssoVendor;
