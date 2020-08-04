import React, { Component } from "react";
import axios from "axios";
import { Form, FormControl } from "react-bootstrap";
import OtpInput from "react-otp-input";
import "./css/SendOtp.css";
import "./css/ForgotPwd.css";

import { withRouter } from "react-router-dom";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class ForgetPwd extends Component {
  state = {
    countryCode: "91",
    mobileNumber: "",
    input_otp: "",
    errorOtp: "",
    otpLoading: false,
  };

  handleChangeMob = (e) => {
    this.setState({
      mobileNumber: e.target.value,
    });
  };
  handleChange2 = (otp) => {
    this.setState({
      otp,
    });
  };
  handleResend = (e) => {
    console.log("resend");
    axios
      .post(
        "/stskFmsApi/otpServices/resendOtpBySMS",
        { countryCode: 91, mobileNumber: this.state.mobileNumber },
        { headers: header }
      )
      .then((res) => {
        console.log(res);
      });
  };
  handleCountryCode = (e) => {
    this.setState({
      countryCode: e.target.value,
    });
  };

  handleSend = (e) => {
    e.preventDefault();
    axios
      .get("/stskFmsApi/userLogin/getByMob/" + this.state.mobileNumber, {
        headers: header,
      })
      .then((Response) => {
        console.log(Response.data);
        if (Response.data.success === 1) {
          this.setState({
            otpLoading: !this.setState.otpLoading,
            errorOtp: "",
          });
          axios
            .post(
              "/stskFmsApi/otpServices/sendOtpBySMS",
              { countryCode: 91, mobileNumber: this.state.mobileNumber },
              { headers: header }
            )
            .then((Response) => {
              console.log(Response);
              console.log(Response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.setState({
            errorOtp: "Oops! mobile number not registered",
          });
        }
      });
  };
  handleVerify = (e) => {
    e.preventDefault();
    console.log("verify");
    axios
      .post(
        "/stskFmsApi/otpServices/verifyOtpBySMS",
        {
          countryCode: 91,
          mobileNumber: this.state.mobileNumber,
          otp_input: this.state.otp,
        },
        { headers: header }
      )
      .then((Response) => {
        console.log(Response);
        console.log(Response.data);

        if (Response.data.type === "success") {
          this.props.history.push({
            pathname: "/changePwd",
            state: {
              mobileNumber: this.state,
            },
          });
        } else {
          this.setState({
            errorOtp: "Otp miss-match",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state);
    const countries = require("./countryphonecode.json");
    return (
      <div id="body">
        <div className="row" id="main1">
          <center id="center">
            <i
              id="otpleftarrow"
              className="material-icons"
              onClick={() => this.props.history.push("/userLogin")}
            >
              arrow_back
            </i>
            {this.state.otpLoading ? (
              <div>
                <h3 className="center" id="otp">
                  OTP
                </h3>

                <form onSubmit={this.handleVerify}>
                  <div>
                    <div>
                      <strong>We have sent you an OTP code to you</strong>
                    </div>
                    <strong>number of verification</strong>
                    <div>
                      <strong>+91{this.state.mobileNumber}</strong>
                    </div>
                    <br></br>
                    <strong className="left">Enter OTP here</strong>
                    <br></br>
                    <OtpInput
                      inputStyle={{
                        width: "3rem",
                        height: "3rem",
                        fontSize: "24px",
                        color: "#707070",
                        borderRadius: 4,
                        margin: "4px",
                        border: "none",
                        background: "#EEEAEA",
                      }}
                      onChange={(otp) => this.handleChange2(otp)}
                      value={this.state.otp}
                      numInputs={6}
                    />
                    <h6 className="center-align red-text">
                      {this.state.errorOtp}
                    </h6>
                    <strong
                      className="center teal-text"
                      onClick={this.handleSend}
                      id="frgtpwdResendPwd"
                    >
                      Resend OTP
                    </strong>
                  </div>
                  <button id="FpVerify">
                    <i className="material-icons right">arrow_forward</i>Verify
                  </button>
                </form>
                <div id="hr" className="separator">
                  or
                </div>
                <button
                  id="verifymisscall"
                  onClick={this.handleResend}
                  type="submit"
                >
                  Give missed call to verify
                </button>
              </div>
            ) : (
              //false condition
              <div>
                <br></br>
                <br></br>
                <br></br>
                <h3 className="center" id="otp">
                  OTP
                </h3>

                <form id="userLogin1" onSubmit={this.handleSend}>
                  <div className="input-field">
                    <input
                      id="sendotpinput"
                      type="tel"
                      placeholder="Enter mobile number"
                      maxLength="10"
                      onChange={this.handleChangeMob}
                      required
                    />
                  </div>
                  <Form.Group onChange={this.handleChange1}>
                    <Form.Control
                      as="select"
                      value={this.state.countryCode}
                      onChange={this.handleCountryCode}
                      id="countries"
                    >
                      {countries.map((country, i) => (
                        <option key={i} value={country.number.slice(1)}>
                          {country.name.toUpperCase().slice(0, 3)}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <strong className="center red-text" id="input-forgot-error">
                    {this.state.errorOtp}
                  </strong>

                  <button id="sendotpbtn">Send otp</button>
                </form>
              </div>
            )}
          </center>
        </div>
      </div>
    );
  }
}

export default ForgetPwd;
