import React, { Component } from "react";
import axios from "axios";
import "./css/SendOtp.css";
import back from "./Images/Background.png";
import { Form, FormControl } from "react-bootstrap";
import logo from "./Images/Mainlogo.png";

import { connect } from "react-redux";
import { createProject } from "../ReduxStore/Actions/SendOtpAction";

//import PhoneInput from 'react-phone-number-input'
//import OTPInput from 'react-otp-input';

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class SendOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: "91",
      mobileNumber: " ",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  userLogin = (e) => {
    this.props.history.push("/userLogin");
  };

  handleGoogle = (e) => {
    e.preventDefault();
    console.log("face");
    window.location.replace("http://google.com");
  };
  handleFacebook = (e) => {
    e.preventDefault();
    console.log("face");

    window.location.replace("http://facebook.com");
  };

  handleChange = (e) => {
    this.setState({
      mobileNumber: e.target.value,
    });
  };
  handleChange1 = (e) => {
    this.setState({
      countryCode: e.target.value,
    });

    if (e.target.value.length == 100) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.props.createProject(this.state);

    this.props.history.push({
      pathname: "/verify",
    });

    // axios
    //   .post("/stskFmsApi/otpServices/sendOtpBySMS", this.state, {
    //     headers: header,
    //   })
    //   .then((Response) => {
    //     console.log(Response);
    //     console.log(Response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  render() {
    const { loading } = this.state;
    const countries = require("./countryphonecode.json");
    // console.log(this.state);
    console.log(this.props.sendOtp);
    return (
      <div id="body">
        <div className="row center" id="main1">
          <center id="center">
            <img
              className="center"
              id="logo"
              src={logo}
              width="70"
              height="70"
            ></img>
            <h3 className="center" id="text">
              Login
            </h3>
            <form id="frm" onSubmit={this.handleSubmit}>
              <div className="input-field">
                <input
                  id="sendotpinput"
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  title="Enter 10 digit number"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <Form.Group onChange={this.handleChange1}>
                <Form.Control
                  as="select"
                  value={this.state.countryCode}
                  onChange={this.handleChange1}
                  id="countries"
                >
                  {countries.map((country, i) => (
                    <option key={i} value={country.number.slice(1)}>
                      {country.name.toUpperCase().slice(0, 3)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <button id="sendotpbtn">
                {loading && <i className="fa fa-spinner fa-spin"></i>}
                Send OTP
              </button>
            </form>
            <strong id="textsignin">Sign in options</strong>
            <br></br>
            <br></br>

            <div className="logo">
              <a
                href=""
                onClick={this.handleGoogle}
                className="fa fa-google"
              ></a>
              <i onClick={this.handleFacebook} className="fa fa-facebook"></i>
              <i
                className="fa fa-user"
                onClick={this.userLogin}
                aria-hidden="true"
              ></i>
            </div>
          </center>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sendOtp: state.SendOtp.SendOtp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendOtp);
