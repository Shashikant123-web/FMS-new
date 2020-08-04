import React, { Component } from "react";
import "../css/dashboardHelp.css";
import mainLogo from "../../components/Images/Mainlogo.png";
import dashboard from "../Images/dashboard.png";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { PROFILE_PATH } from "../../ReduxStore/ActionTypes/actionTypes";
const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};
class NavbarTop extends Component {
  state = {
    nav: true,
    docId: [],
    path: "",
    fileName: "",
  };
  componentDidMount() {
    axios
      .get(
        "/stskFmsApi/jobseekerdoc/getByJobSeekerId/" +
          this.props.dashboard.payLoad.details.id,
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.success);
        if (res.data.success !== 0) {
          this.setState({
            docId: res.data.data,
          });
          const names1 =
            this.state.docId &&
            this.state.docId.map((namesss) => {
              return namesss.docId;
            });
          console.log(names1);
          console.log(Math.max(...names1));
          var latdocId = names1;
          var latestdocId = Math.max(...latdocId);
          console.log(latestdocId);
          this.setState({
            latestdocId: latestdocId,
          });
          const timer3 = setTimeout(() => {
            axios
              .get(
                "/stskFmsApi/jobseekerdoc/retriveWithPath/" +
                  this.state.latestdocId,
                {
                  headers,
                }
              )
              .then((res) => {
                console.log(res);
                console.log(res.data.data.path);
                this.setState({
                  path: res.data.data.path,
                  fileName: res.data.data.docName,
                });
                const timer = setTimeout(() => {
                  this.props.profilePath(this.state);
                }, 50);
              })
              .catch((err) => console.log(err));
          }, 3000);
        }
      });
  }
  render() {
    //console.log(this.props.dashboard.payLoad.details.id);
    console.log(this.state);
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
const mapStateToProps = (state) => {
  return {
    dashboard: state.userLogin.userLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    profilePath: (value) => dispatch({ type: PROFILE_PATH, value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavbarTop);
