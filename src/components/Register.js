import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./css/register1.css";
import logo from "./Images/Mainlogo.png";
import axios from "axios";
import $ from "jquery";
import jQuery from "jquery";
import { connect } from "react-redux";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class Register extends Component {
  state = {
    visibility: false,
    visibility2: false,
    mob: this.props.details.mobileNumber,
    mobileNumber: this.props.details.mobileNumber,
    email: "",
    password: "",
    userRoles: {
      id: "",
    },
    conformPwd: "",
    error: "",
  };
  componentDidMount() {
    this.setState({
      userRoles: {
        id: this.props.match.params.id,
        name: this.props.match.params.name,
      },
    });
  }
  handleVisibility = () => {
    this.setState({
      visibility: !this.state.visibility,
    });
  };
  handleVisibility2 = () => {
    this.setState({
      visibility2: !this.state.visibility2,
    });
  };

  handleChange10() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  handleChange1 = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleChange2 = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleChange3 = (e) => {
    this.setState({
      conformPwd: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { password, conformPwd } = this.state;

    if (password !== conformPwd) {
      this.setState({
        password: "",
        conformPwd: "",
        error: "Password and conformPassword mis-match",
      });
    } else {
      this.setState({ error: "" });

      axios
        .post(
          "/stskFmsApi/userLogin/createUL",
          {
            mob: this.state.mob,
            email: this.state.email,
            password: this.state.password,
            userRoles: {
              id: this.state.userRoles.id,
            },
          },
          { headers: header }
        )
        .then((response) => {
          console.log(response);
          console.log(this.state);
          this.props.history.push({
            pathname: "/userDetails",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { mob, email, password, userRoles } = this.state;
    const { visibility, visibility2 } = this.state;

    console.log(this.state);
    console.log(this.props.details.mobileNumber);
    // const { formErrors } = this.state;

    return (
      <div id="body">
        <div className="row" id="main1">
          <center id="center">
            <i
              id="registerleftarrow"
              className="material-icons"
              onClick={() => this.props.history.push("/preregister")}
            >
              arrow_back
            </i>
            <h3 className="center-align" id="Registertext">
              {this.props.match.params.name}
            </h3>

            <form
              id="frm"
              style={{ marginTop: "24px" }}
              onSubmit={this.handleSubmit}
            >
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">
                  person
                </i>
                <input
                  id="icon_prefix"
                  type="email"
                  size="30"
                  placeholder="User Id/ Mail Id"
                  required
                  onChange={this.handleChange1}
                />
              </div>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">
                  lock
                </i>
                <input
                  id="icon_prefixs"
                  style={{ width: "242px" }}
                  type={visibility ? "text" : "password"}
                  size="30"
                  placeholder="Password"
                  required
                  name="pass"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one number
               and one uppercase and lowercase letter,
                and at least 6 or more characters"
                  onChange={this.handleChange2}
                />
                {visibility ? (
                  <i
                    className="material-icons right eyeInChangePwd"
                    onClick={this.handleVisibility}
                  >
                    visibility
                  </i>
                ) : (
                  <i
                    className="material-icons right eyeInChangePwd"
                    onClick={this.handleVisibility}
                  >
                    visibility_off
                  </i>
                )}
              </div>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">
                  lock
                </i>
                <input
                  id="icon_prefixs"
                  style={{ width: "242px" }}
                  type={visibility2 ? "text" : "password"}
                  size="30"
                  placeholder="Password"
                  required
                  name="pass"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one number
                        and one uppercase and lowercase letter,
                          and at least 6 or more characters"
                  onChange={this.handleChange3}
                />
                {visibility2 ? (
                  <i
                    className="material-icons right eyeInChangePwd"
                    onClick={this.handleVisibility2}
                  >
                    visibility
                  </i>
                ) : (
                  <i
                    className="material-icons right eyeInChangePwd"
                    onClick={this.handleVisibility2}
                  >
                    visibility_off
                  </i>
                )}
                <br></br>

                <h6 className="red-text center-align">{this.state.error}</h6>
              </div>
              <button
                id="RegisterButton"
                type="submit"
                onChange={this.handleButton}
              >
                <i className="material-icons right">arrow_forward</i>Next
              </button>
            </form>
          </center>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    details: state.userLogin.userLogin,
  };
};
export default connect(mapStateToProps)(withRouter(Register));
