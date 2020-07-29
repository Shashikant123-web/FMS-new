import React, { Component } from "react";
import axios from "axios";
import logo from "./Images/Mainlogo.png";
import "./css/userLogin.css";
import Loader from "react-loader-spinner";
import $ from "jquery";
import jQuery from "jquery";
import { connect } from "react-redux";
import { userLoginAction } from "../ReduxStore/Actions/UserLoginAction";
import { TOKEN } from "../ReduxStore/ActionTypes/actionTypes";

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};

class UserLogin extends Component {
  state = {
    visibility: false,
    email: "",
    email1: "",
    password: "",
    userId: "",
    error: "",
    mobileNumber: "",
    loading: false,
  };
  handleVisibility = () => {
    this.setState({
      visibility: !this.state.visibility,
    });
  };
  handleChange1 = (e) => {
    this.setState({
      email: "'" + e.target.value + "'",
      email1: e.target.value,
    });
  };
  handleChange2 = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  forgetPwd = (e) => {
    this.props.history.push("/forgotPwd");
  };
  componentDidMount() {
    // axios.get('/stskFmsApi/jobseekerdoc/getByJobSeekerId/3',{headers:header})
    // .then(res => {
    //     console.log(res.data.data.docId)
    //     this.setState
    //     ({
    //         docId:res.data.data.docId
    //     })
    // console.log(res.data.success)
    // if(res.data.success===1){
    //     this.setState({
    //         posts: res.data.data
    //     });
    // }
    // else{
    //     console.log("No jobs present")
    // }
    //})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({
      loading: true,
      error: "",
    });
    axios
      .get("/stskFmsApi/jobseeker/getByEmailid/" + this.state.email, {
        headers: header,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data);
        this.setState({
          details: res.data.data,
        });
        if (res.data.data === null) {
          axios
            .get("stskFmsApi/userLogin/getByEmailid/" + this.state.email, {
              headers: header,
            })
            .then((res) => {
              if (res.data.success === 1) {
                this.setState({
                  mobileNumber: res.data.data.mob,
                });
                this.props.userLoginAction(res.data.data.mob);
              } else {
                this.setState({
                  error: "Opps! email id does not registered",
                  loading: false,
                });
              }
            });
        } else {
          console.log(res.data.data);
          this.setState({
            userId: res.data.data.id,
            mobileNumber: res.data.data.mob,
          });
        }
      });

    axios
      .post(
        "/stskFmsApi/userLogin/verifyUser",
        {
          email: this.state.email1,
          password: this.state.password,
        },
        { headers: header }
      )
      .then((Response) => {
        console.log(Response.data);
        console.log(Response.data.success);
        if (Response.data.success === 1) {
          axios
            .get("/stskFmsApi/jobseeker/getByEmailid/" + this.state.email, {
              headers: header,
            })
            .then((res) => {
              console.log(res.data);
              console.log(res.data.data);
              if (res.data.data === null) {
                this.props.userLoginAction(this.state);
                this.props.history.push({
                  pathname: "/userDetails",
                });
              } else {
                this.props.userLoginAction(this.state);
                this.props.token();

                this.props.history.push({
                  pathname: "/dashboard",
                  // state: {
                  //   mobileNumber: this.state,
                  //   userId: this.state.userId,
                  // },
                });
              }
            });
        } else if (Response.data.message === "User ID or Password error") {
          this.setState({
            error: "Password error",
            loading: false,
          });
        } else {
          this.setState({
            error: "Opps! email id does not registered",
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { loading, visibility } = this.state;
    return (
      <div className="" id="body">
        <div className="row" id="main1">
          <center id="center">
            <img
              className="center"
              id="logo"
              src={logo}
              width="70"
              height="70"
            ></img>
            <h3 className="" id="userloginHeading">
              User Login
            </h3>
            <form id="frm" onSubmit={this.handleSubmit}>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">
                  person
                </i>
                <input
                  id="icon_prefixx"
                  type="email"
                  size="30"
                  required
                  placeholder="User Id/ Mail Id"
                  onChange={this.handleChange1}
                />
              </div>

              <div className="input-field">
                <i id="iconn" className="material-icons prefix">
                  lock
                </i>
                <input
                  id="icon_prefixx"
                  type={visibility ? "text" : "password"}
                  placeholder="Password"
                  size="30"
                  required
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
              <strong className="center red-text">{this.state.error}</strong>
              <br></br>
              {loading && loading ? (
                <button id="UserLoginButton">
                  {loading && <i className="fa fa-spinner fa-spin"></i>}
                  Logging in...
                </button>
              ) : (
                <button id="UserLoginButton">Login</button>
              )}
            </form>
            <strong id="forgot" onClick={this.forgetPwd}>
              Forgot Password ?
            </strong>
          </center>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLoginAction: (UserLogin) => dispatch(userLoginAction(UserLogin)),
    token: (id) => dispatch({ type: TOKEN }),
  };
};
export default connect(null, mapDispatchToProps)(UserLogin);

// border: 1px solid teal;
//     border-radius: 11px;
