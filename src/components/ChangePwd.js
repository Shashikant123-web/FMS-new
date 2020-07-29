import React, { Component } from "react";
import axios from "axios";
import logo from "./Images/Mainlogo.png";
import "./css/userLogin.css";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class ChangePwd extends Component {
  state = {
    mob: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
    visibility: false,
    visibility2: false,
  };

  componentDidMount() {
    this.setState({
      mob: this.props.location.state.mobileNumber.mobileNumber,
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
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: "",
    });
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        password: "",
        confirmPassword: "",
        error: "Password & Confpassword miss-match",
        loading: false,
      });
    } else {
      axios
        .put(
          "/stskFmsApi/userLogin/resetpassword",
          {
            countryCode: 91,
            mob: this.state.mob,
            password: this.state.password,
          },
          { headers: header }
        )
        .then((Response) => {
          console.log(Response);
          console.log(Response.data);
          if (Response.data.success === 1) {
            this.props.history.push("./userLogin");
          } else
            this.setState({
              error: "Please Try again...",
              loading: false,
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    const { loading, visibility, visibility2 } = this.state;
    return (
      <div id="body">
        <div className="row" id="main2">
          <center id="center">
            <img
              className="center"
              id="logo"
              src={logo}
              width="70"
              height="70"
            ></img>
            <br></br>
            <br></br>
            <form id="frm" onSubmit={this.handleSubmit}>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">
                  lock
                </i>
                <input
                  id="icon_prefixx"
                  type={visibility ? "text" : "password"}
                  required
                  value={this.state.password}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                  placeholder="Enter password"
                  name="password"
                  onChange={this.handleChange}
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
                  id="icon_prefixx"
                  type={visibility2 ? "text" : "password"}
                  required
                  value={this.state.confirmPassword}
                  name="confirmPassword"
                  onChange={this.handleChange}
                  placeholder="Confirm password"
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
              </div>
              <br></br>
              <p className="red-text center">{this.state.error}</p>
              {loading && loading ? (
                <button id="input-type4">
                  {loading && <i className="fa fa-spinner fa-spin"></i>}
                  saving...
                </button>
              ) : (
                <button id="input-type4">save</button>
              )}
            </form>
          </center>
        </div>
      </div>
    );
  }
}

export default ChangePwd;
