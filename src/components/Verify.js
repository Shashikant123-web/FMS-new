import React, { Component } from "react";
import axios from "axios";
import logo from "./Images/Mainlogo.png";
import OtpInput from "react-otp-input";
import "./css/Verify.css";
import { TOKEN } from "../ReduxStore/ActionTypes/actionTypes";
import { connect } from "react-redux";
import { userLoginAction } from "../ReduxStore/Actions/UserLoginAction";

const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class Verify extends Component {
  state = {
    countryCode: this.props.sendOtp.countryCode,
    mobileNumber: this.props.sendOtp.mobileNumber,
    email1: "",
    userId: "",
    error: "",
    otp: "",
    userId: "",
    loading: false,
  };
  handleChange = (otp) => {
    this.setState({
      otp,
    });
  };
  handleResend = (e) => {
    const { countryCode, mobileNumber } = this.state;
    axios
      .post(
        "/stskFmsApi/otpServices/resendOtpBySMS",
        {
          countryCode,
          mobileNumber,
        },
        { headers }
      )
      .then((res) => {});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { countryCode, mobileNumber, otp } = this.state;

    this.setState({
      error: "",
      loading: true,
    });
    // axios
    //   .post(
    //     "/stskFmsApi/otpServices/verifyOtpBySMS",
    //     {
    //       countryCode: 91,
    //       mobileNumber,
    //       otp_input: this.state.otp,
    //     },
    //     { headers }
    //   )
    //   .then((Response) => {
    //     if (Response.data.type === "success") {
    axios
      .get("/stskFmsApi/userLogin/getByMob/" + mobileNumber, {
        headers,
      })
      .then((Response) => {
        if (Response.data.success === 1) {
          axios
            .get("/stskFmsApi/jobseeker/getByMob/" + mobileNumber, {
              headers,
            })
            .then((res) => {
              if (res.data.success === 1) {
                this.setState({
                  userId: res.data.data.id,
                  details: res.data.data,
                });
                const time = setTimeout(() => {
                  this.props.userLoginAction(this.state);
                }, 500);
                this.props.history.push({
                  pathname: "/dashboard",
                });
                this.props.token();
              } else {
                this.props.userLoginAction(this.state);
                this.props.history.push({
                  pathname: "/userDetails",
                });
              }
            });
        } else {
          this.props.userLoginAction(this.state);
          this.props.history.push({
            pathname: "/preregister",
          });
        }
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
    //   } else {
    //     this.setState({
    //       loading: false,
    //       otp: "",
    //       error: "Otp-mismatch",
    //     });
    //   }
    // });
  };
  render() {
    const { loading } = this.state;
    return (
      <div id="body">
        <div className="row" id="main1">
          <center id="center">
            <img
              className="center"
              id="logo"
              src={logo}
              width="70"
              height="70"
            ></img>
            <h4 className="center" id="otpheader">
              Enter OTP
            </h4>
            <form id="frm" onSubmit={this.handleSubmit}>
              <strong id="enterHere">Enter Otp Here</strong>
              <br></br>
              <div className="">
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
                  onChange={(otp) => this.handleChange(otp)}
                  value={this.state.otp}
                  numInputs={6}
                />
                <br></br>
                <strong className="red-text">{this.state.error}</strong>
              </div>
              <strong
                className="center teal-text"
                id="resendotp"
                onClick={this.handleResend}
              >
                Resend OTP
              </strong>
              {loading && loading ? (
                <button id="input-type3">
                  <i className="fa fa-spinner fa-spin"></i>
                  Verifing...
                </button>
              ) : (
                <button id="input-type3">Verify</button>
              )}
            </form>
            <div id="hr" className="separator">
              or
            </div>
            <button onClick={this.handleResend} id="verifymisscall">
              Give missed call to verify
            </button>
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
    userLoginAction: (UserLogin) => dispatch(userLoginAction(UserLogin)),
    token: () => dispatch({ type: TOKEN }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
