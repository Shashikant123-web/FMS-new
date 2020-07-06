import React, { Component } from "react";
import "./css/dashboardHelp.css";
import mainLogo from "./Images/Mainlogo.png";
import { withRouter, Link } from "react-router-dom";

class NavbarJobseeker extends Component {
  state = {
    nav: true,
  };
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="white">
          <div className="nav-wrapper container ">
            <a className="brand-logo left" id="img">
              <img
                className="center"
                src={mainLogo}
                width="50"
                height="50"
              ></img>
            </a>
            <ul id="nav-mobile" className="right">
              <li>
                <Link
                  id="home"
                  to={{
                    pathname: "/dashboard",
                    state: {
                      mobileNumber: this.state,
                    },
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href=""
                  className="waves-effect waves-light btn-small"
                  id="btnnav"
                >
                  Help
                </a>
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
    );
  }
}

export default NavbarJobseeker;
