import React, { Component } from "react";
import "../css/dashboardHelp.css";
import mainLogo from "../../components/Images/Mainlogo.png";
import dashboard from "../Images/dashboard.png";

import { withRouter, Link } from "react-router-dom";

class NavbarTop extends Component {
  state = {
    nav: true,
  };
  render() {
    return (
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
            <ul id="nav-mobile jonnav" className="right">
              <li>
                <Link
                  to="/dashboard"
                  className="waves-effect waves-light btn-small"
                  id="btnnav"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  id="home"
                  to={{
                    pathname: "/help",
                  }}
                >
                  Help
                </Link>
              </li>
              {/* <li><i className="material-icons grey-text large" id="profileicn">account_circle</i></li> */}
              <img
                src={this.state.profileimagepath}
                style={{
                  height: "63px",
                  width: "63px",
                  borderRadius: "50px",
                }}
              ></img>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavbarTop;
