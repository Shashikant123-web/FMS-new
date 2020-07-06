import React, { Component } from "react";
import axios from "axios";
import "../AssociationCSS/Navbar.css";
import mainLogo from "../Images/Mainlogo.png";
import dashboard from "../Images/dashboard.png";
import { withRouter, Link, NavLink } from "react-router-dom";
import edit from "../Images/edit.png";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class Navbar extends Component {
  state = {
    Block: true,
    Block1: true,
    Block2: true,
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
              <a className="brand-logo left jobnav" id="img">
                <img
                  className="center"
                  src={mainLogo}
                  width="50"
                  height="50"
                ></img>
              </a>
              <ul id="nav-mobile" className="right jonnav">
                <li>
                  <Link
                    to="/nav"
                    className="waves-effect waves-light btn-small"
                    id="navbtn1"
                  >
                    Property Details
                  </Link>
                </li>
                <li>
                  <Link id="home" to="/vendor">
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
              <h6 id="textimg">Your property details</h6>
            </div>
          </div>
        </div>

        {this.state.Block ? (
          <div className="row white">
            <div className="col s10 m10 l10">
              <div className="col s10 m10 l10 offset-m1 offset-l1 z-depth-1">
                <h4 className="headingg">Block Details</h4>
                <div
                  id="MianBlock"
                  className="col s5 m4 l2 z-depth-1 grey container"
                  onClick={this.handleVendor}
                >
                  <br></br>
                  <div
                    id="block"
                    onClick={() => this.setState({ Block: false })}
                    className="button center-align white"
                  >
                    <i className="material-icons left">keyboard_arrow_right</i>
                    Block A
                    <img
                      className="assoEdit"
                      id=""
                      src={edit}
                      width="20"
                      height="20"
                    ></img>
                  </div>
                  <h6 className="center white-text cursor-pointer">
                    <i className="material-icons">add</i>Add flat
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
                    <h4 className="headingg">Block Details</h4>
                    <div
                      id="MianBlock"
                      className="col s5 m4 l2 z-depth-1 teal accent-4 container"
                      onClick={this.handleVendor}
                    >
                      <br></br>
                      <div
                        id="block"
                        onClick={() => this.setState({ Block: true })}
                        className="button center-align white"
                      >
                        <i className="material-icons left">
                          keyboard_arrow_down
                        </i>
                        Block A
                        <img
                          className="assoEdit"
                          src={edit}
                          width="20"
                          height="20"
                        ></img>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>

                <div className="row white">
                  <div className="col s12 m10 l10">
                    <h4 className="headingg">Block A- Flore Details</h4>
                    <div
                      id="MianBlock"
                      className="col s4 m4 l2 z-depth-1 grey container"
                      onClick={this.handleVendor}
                    >
                      <br></br>
                      <div
                        id="block"
                        onClick={() => this.setState({ Block1: true })}
                        className="button center-align white"
                      >
                        <i className="material-icons left">
                          keyboard_arrow_right
                        </i>
                        Ground Flore
                        <img
                          className="assoEdit"
                          src={edit}
                          width="20"
                          height="20"
                        ></img>
                      </div>
                      <h6 className="center white-text">
                        <i className="material-icons">add</i>Add a room
                      </h6>
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

export default Navbar;
