import React, { Component } from "react";
import "./css/Userdetails2.css";
import { Multiselect } from "multiselect-react-dropdown";
import {
  Form,
  FormControl,
  Button,
  FormGroup,
  ControlLabel,
} from "react-bootstrap";
import Popup from "reactjs-popup";
import axios from "axios";
import file from "./Images/file.png";
import { Checkbox } from "semantic-ui-react";

import { connect } from "react-redux";
import { userLoginAction } from "../ReduxStore/Actions/UserLoginAction";
import { TOKEN } from "../ReduxStore/ActionTypes/actionTypes";

// import { Icon, Popup, Grid } from 'semantic-ui-react'

const header = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};
const headers = {
  "x-api-key": " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
};
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      profileimage: null,
      profileimagedocId: "",
      profileimagepath: "",
      selectedValue: null,
      fresher: "",
      working: "",
      noticePeriod: "",
      noOfDays: null,
      Updates: ["Send Mail", "SMS", "Both", "None"],
      Types: [],
      name: "",
      check: false,
      name: null,
      email: "",
      mob: this.props.details.mobileNumber,
      mobileNumber: this.props.details.mobileNumber,
      panNum: null,
      aadharNum: null,
      experience: null,
      eduQual: null,
      jobUpdate: null,
      userId: "",
      jobTypes: "",
      Current_company: null,
      noticePeriod: null,
      companyName: null,
      currentLocation: null,
      jobLocation: null,
      designation: null,
      negotiable: null,
      upTo: null,
      noOfDays: null,
      address: null,
      prevcompanyName: null,
      prevdesignation: null,
      prevjobLocation: null,
      jobs: [],
      Updates: ["Send Mail", "SMS", "Both", "None"],
      YOP: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      docName: "",
      image: null,
      details: {},
      formErrors: {
        profileimage: null,
        name: "",
        email: "",
        mob: this.props.details.mobileNumber,
        mobileNumber: this.props.details.mobileNumber,
        panNum: "",
        aadharNum: "",
        experience: "",
        eduQual: "",
        working: "",
        jobUpdate: "",
        userId: "",
        jobTypes: [],
        fresher: "",
        Current_company: "",
        noticePeriod: "",
        companyName: "",
        currentLocation: "",
        jobLocation: "",
        designation: "",
        negotiable: "",
        upTo: "",
        noOfDays: "",
        address: null,
        prevcompanyName: "",
        prevdesignation: "",
        prevjobLocation: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    // this.setState({
    //   mob: this.props.location.state.mobileNumber.mobileNumber,
    //   mobileNumber: this.props.location.state.mobileNumber.mobileNumber,
    // });
    fetch("http://stskfacilities.com:8081/stskFmsApi/jobTypes/getAllJobTypes", {
      headers: header,
    })
      .then((response) => response.json())

      .then((data) => {
        // console.log(data)
        let TypesFromApi = data.data.map((Type) => {
          return { id: Type.id, name: Type.name };
        });
        this.setState({
          Types: [
            {
              id: "",
              name: "(Select your desire job)",
            },
          ].concat(TypesFromApi),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    axios
      .get(
        "/stskFmsApi/userLogin/getByMob/" + this.props.details.mobileNumber,
        {
          headers: header,
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          userId: res.data.data.id,
          email: res.data.data.email,
        });
      });
  }
  handleResume = (e) => {
    this.setState({
      image: e.target.files[0],
      docName: e.target.files[0].name,
    });
  };
  // for handle jobtypes
  handleChange1Arg = (selectedvalue) => {
    var i = selectedvalue.length;
    var jobnamearray = [];
    for (var j = 0; j <= i - 1; j++) {
      var jobname = jobnamearray.push(selectedvalue[j]["name"]);
    }

    console.log(selectedvalue);
    console.log(`Option selected:`, selectedvalue);
    this.setState({ selectedvalue });
    this.setState({ jobTypes: selectedvalue });

    document.getElementById("valse").innerHTML = jobnamearray;
    //var str = jobnamearray;
    // if(str.length > 2)
    // {str = str.substring(0,10)};
    // alert('str')
  };
  handleRadio = (e) => {
    console.log(e.target.value);

    if (e.target.value == "false") {
      document.getElementById("section-2").style.display = "block";
    } else {
      document.getElementById("section-2").style.display = "none";
    }
    if (e.target.value == "true") {
      document.getElementById("section-3").style.display = "none";
    } else {
      document.getElementById("section-3").style.display = "none";
    }
    if (e.target.value == "true") {
      document.getElementById("section-4").style.display = "none";
    } else {
      document.getElementById("section-4").style.display = "none";
    }
    if (e.target.value == "false") {
      document.getElementById("section-5").style.display = "none";
    } else {
      document.getElementById("section-5").style.display = "none";
    }
    this.setState({
      fresher: e.target.value,
    });
  };
  handleRadio1 = (e) => {
    console.log(e.target.value);
    if (e.target.value == "true") {
      document.getElementById("section-3").style.display = "flex";
    } else {
      document.getElementById("section-3").style.display = "none";
    }
    if (e.target.value == "false") {
      document.getElementById("section-5").style.display = "flex";
    } else {
      document.getElementById("section-5").style.display = "none";
    }
    if (e.target.value == "false") {
      document.getElementById("section-4").style.display = "none";
    } else {
      document.getElementById("section-4").style.display = "none";
    }
    this.setState({
      working: e.target.value,
    });
  };
  handleRadio2 = (e) => {
    console.log(e.target.value);
    if (e.target.value == "true") {
      document.getElementById("section-4").style.display = "flex";
    } else {
      document.getElementById("section-4").style.display = "none";
    }
    this.setState({
      noticePeriod: e.target.value,
    });
  };
  handleCheck = (e) => {
    this.setState({
      check: true,
    });
  };
  handleChange5 = (e) => {
    console.log(e.target.value);
    this.setState({
      address: e.target.value,
    });
  };

  handleImageChange = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    this.setState({
      profileimage: e.target.files[0],
    });

    const timer = setTimeout(() => {
      let formData = new FormData();

      formData.append("file", this.state.profileimage);
      // const timer =  setTimeout(()=>{
      axios
        .post("/stskFmsApi/imageDoc/createDoc/" + this.state.userId, formData, {
          headers: {
            "x-api-key":
              " $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2",
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.setState({
            profileimagedocId: res.data.data,
          });
        })
        .catch((err) => console.log(err));
    }, 3000);
    const timer1 = setTimeout(() => {
      axios
        .get(
          "/stskFmsApi/imageDoc/retriveWithPath/" +
            this.state.profileimagedocId,
          { headers: header }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            profileimagepath: res.data.data.path,
          });
        })
        .catch((err) => console.log(err));
    }, 4000);
  };
  handleChange = (e) => {
    // this.setState({update : e.target.value});
    // this.setState({value:e.target.value});
    //  const { name, value } = e.target;
    // this.setState({  [name]: value }, () => console.log(this.state));

    this.setState({ update: e.target.value });

    this.setState({ value: e.target.value });
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  handleChange2 = (e) => {
    this.setState({
      jobUpdate: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    if (this.state.check === true) {
      axios
        .post(
          "/stskFmsApi/jobseeker/createJS",
          {
            name: this.state.name,
            email: this.state.email,
            mob: this.state.mob,
            panNum: this.state.panNum,
            aadharNum: this.state.aadharNum,
            eduQual: this.state.eduQual,
            experience: this.state.experience,
            working: this.state.working,
            jobUpdate: this.state.jobUpdate,
            address: this.state.address,
            fresher: this.state.fresher,
            prevcompanyName: this.state.fresher,
            prevdesignation: this.state.fresher,
            prevjobLocation: this.state.fresher,
            companyName: this.state.companyName,
            designation: this.state.designation,
            noticePeriod: this.state.noticePeriod,
            noOfDays: this.state.noOfDays,
            currentLocation: this.state.currentLocation,
            negotiable: this.state.negotiable,
            upTo: this.state.upTo,
            jobLocation: this.state.jobLocation,
            userLogin: {
              id: this.state.userId,
            },
            // jobTypes:[{
            //   id:this.state.jobTypes.id
            // }]
            jobTypes: this.state.jobTypes,
          },
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.success === 1) {
            console.log(response);
            console.log(response.data.data);

            let formData = new FormData();

            formData.append("file", this.state.image);
            axios
              .post(
                "/stskFmsApi/jobseekerdoc/createDoc/" + response.data.data,
                formData,
                { headers }
              )
              .then((res) => {
                console.log(res);
                console.log(res.data);
                this.setState({
                  // docId:res.data.data
                });
                axios
                  .get(
                    "/stskFmsApi/jobseeker/getByMob/" +
                      this.props.details.mobileNumber,
                    { headers }
                  )
                  .then((res) => {
                    this.setState({
                      details: res.data.data,
                      userId: res.data.data.id,
                    });
                  });

                const timer1 = setTimeout(() => {
                  if (res.data.success === 1) {
                    console.log(res);
                    console.log(res.data);
                    this.props.token();
                    this.props.userLoginAction(this.state);
                    const tm = setTimeout(() => {
                      this.props.history.push("/dashboard");
                    }, 50);
                  }
                }, 1000);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (formValid(this.state)) {
        console.log(`
        --SUBMITTING--
        Full Name: ${this.state.name}
        Mobile Number: ${this.state.mob}
        Email: ${this.state.email}
        panNumber: ${this.state.panNum}
        aadhar: ${this.state.aadharNum}
        years: ${this.state.experience}
        education: ${this.state.eduQual}
        jobUpdate:${this.state.jobUpdate}
        address:${this.state.address},
        working : ${this.state.working},
        userLogin:{
          id:this.state.userId
        }},
        jobTypes:[{
          id:this.state.jobTypes.id
        }],
        fresher:${this.state.fresher},
     
      noticePeriod:${this.state.noticePeriod},
      companyName:${this.state.companyName},
      currentLocation:${this.state.currentLocation},
      jobLocation:${this.state.jobLocation},
      designation:${this.state.designation},
      negotiable:${this.state.negotiable},
      upTo:${this.state.upTo},
      noOfDays:${this.state.noOfDays},
      address:${this.state.address},
      prevcompanyName:${this.state.prevcompanyName},
    prevdesignation:${this.state.prevdesignation},
    prevjobLocation:${this.state.prevjobLocation},
       `);
      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
    } else {
      this.setState({
        checkBoxerror: "Accept Terms & Conditions",
      });
    }
  };

  render() {
    const { mobileNumber, email } = this.props.details;
    console.log(this.state.jobUpdate);
    console.log(this.state);
    const { selectedValue, loading } = this.state;
    return (
      <div class="container register-form">
        <div class="forms z-depth-1" style={{ marginTop: "50px" }}>
          <div class="note">
            <div class="profile-header-container">
              <h4 class="title">Job Seeker</h4>

              <div class="profile-header-img">
                <img
                  class="img-circle"
                  style={{}}
                  //src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120"
                  src={this.state.profileimagepath}
                />

                <div class="rank-label-container">
                  {/* <i className="material-icons grey-text large" id="pro1">
                    account_circle
                  </i> */}
                  <input
                    type="file"
                    name="image"
                    class="image_src"
                    accept="images.jpeg"
                    onChange={this.handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-content" id="formcontainer">
            <div className="row" id="section-1">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-field">
                    <input
                      type="text"
                      id="input_UserDetails"
                      placeholder="Enter Full Name *"
                      name="name"
                      required
                      onChange={this.handleChange}
                      pattern="[A-Za-z\\s]*"
                      title="only alphabetical values are allowed"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email *"
                    type="email"
                    name="email"
                    required
                    value={this.state.email}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pan Number *"
                    type="text"
                    name="panNum"
                    required
                    onChange={this.handleChange}
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    title="Enter valid pannumber"
                  />
                </div>

                <Popup
                  contentStyle={{ height: "200px", width: "400px" }}
                  trigger={
                    <div
                      className="form-group"
                      id="printjobname"
                      onChange={this.handleCheckLength}
                    >
                      <h6 id="valse">Applied For</h6>
                      <i
                        className="fa fa-sort-down"
                        style={{
                          fontSize: "30px",
                          color: "#3fb2aa",
                          float: "right",
                          marginTop: "-34px",
                        }}
                      ></i>
                    </div>
                  }
                >
                  <Multiselect
                    options={this.state.Types}
                    value={selectedValue}
                    displayValue="name"
                    onSelect={this.handleChange1Arg}
                    id="demo"
                  />
                </Popup>
                {/* <h5  id="valsel"></h5> */}
                {/* </div> */}
                <div className="form-group">
                  <p id="label">Are you fresher?</p>

                  <p>
                    <label>
                      <input
                        name="fresher"
                        value="true"
                        onClick={this.handleRadio}
                        type="radio"
                        id="ra"
                      />
                      <span id="label">Yes</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="fresher"
                        value="false"
                        onClick={this.handleRadio}
                        type="radio"
                        id="ra"
                      />
                      <span id="label">No</span>
                    </label>
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-field">
                    <input
                      id="input_UserDetails"
                      type="text"
                      placeholder="Phone Number *"
                      type="tel"
                      name="mob"
                      required
                      value={mobileNumber}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Aadhar Card Number *"
                    type="text"
                    name="aadharNum"
                    required
                    onChange={this.handleChange}
                    pattern="^\d{4}\d{4}\d{4}$"
                    title="Addhar Card"
                    title="4 digit space 4 digit space 4digit"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Education Qualification *"
                    type="text"
                    name="eduQual"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  {/* <input type="text" class="form-control" placeholder="Job Updates *" value=""/> */}
                  <Form.Control
                    as="select"
                    onChange={this.handleChange2}
                    id="update"
                  >
                    <option value="1">Get job opening updates</option>
                    {this.state.Updates.map((jobUpdate) => (
                      <option key={jobUpdate} value={jobUpdate}>
                        {jobUpdate}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    //class="form-control"
                    placeholder="Address *"
                    onChange={this.handleChange5}
                    id="textarea"
                  ></textarea>
                </div>
              </div>
            </div>
            {/* end section-1 */}
            {/* start section-2 */}
            <div className="row" id="section-2">
              <div className="col-md-6">
                <div className="form-group">
                  <p id="label">Currently working?</p>

                  <p>
                    <label>
                      <input
                        name="working"
                        value="true"
                        onClick={this.handleRadio1}
                        type="radio"
                      />
                      <span id="label">Yes</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="working"
                        value="false"
                        onClick={this.handleRadio1}
                        type="radio"
                      />
                      <span id="label">No</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
            {/* end section-2 */}
            {/* start section-3 if currently working yes*/}
            <div className="row" id="section-3">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Years of Experience *"
                    name="experience"
                    pattern="[0-9]*"
                    title="It should be Numeric"
                    onChange={this.handleChange}
                    maxLength="2"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Job Location *"
                    name="jobLocation"
                    onChange={this.handleChange}
                    id="input"
                    pattern="[A-Za-z\\s]*"
                    title="only alphabetical values are allowed"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Current Location *"
                    name="currentLocation"
                    onChange={this.handleChange}
                    id="input"
                    pattern="[A-Za-z\\s]*"
                    title="only alphabetical values are allowed"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Current Company Name *"
                    name="companyName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Designation *"
                    name="designation"
                    onChange={this.handleChange}
                    pattern="[A-Za-z\\s]*"
                    title="only alphabetical values are allowed"
                  />
                </div>
                <div className="form-group">
                  <p id="label">Are you serving notice period?</p>
                  <p>
                    <label>
                      <input
                        name="noticePeriod"
                        value="true"
                        onClick={this.handleRadio2}
                        type="radio"
                        id="ra"
                      />
                      <span id="label">Yes</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="noticePeriod"
                        value="false"
                        onClick={this.handleRadio2}
                        type="radio"
                        id="ra"
                      />
                      <span id="label">No</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
            {/* end section-3 */}
            {/* start section-4 if serving notice period */}
            <div className="row" id="section-4">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Days *"
                    type="number"
                    name="noOfDays"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UpTo *"
                    type="number"
                    name="upTo"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <p id="label">Is it negotiable?</p>

                  <p>
                    <label>
                      <input
                        name="negotiable"
                        value="true"
                        onClick={this.handleRadio3}
                        type="radio"
                        id="ra"
                      />
                      <span id="label">Yes</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="negotiable"
                        value="false"
                        onClick={this.handleRadio3}
                        type="radio"
                        id="ra"
                      />
                      <span id="label">No</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
            {/*end section-4 */}
            {/*start section-5 */}
            <div className="row" id="section-5">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Years of Experience *"
                    name="experience"
                    pattern="[0-9]*"
                    title="It should be Numeric"
                    onChange={this.handleChange}
                    maxLength="2"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Previous Job Location *"
                    name="prevjobLocation"
                    onChange={this.handleChange}
                    pattern="[A-Za-z\\s]*"
                    title="only alphabetical values are allowed"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Current Location *"
                    name="currentLocation"
                    onChange={this.handleChange}
                    pattern="[A-Za-z\\s]*"
                    title="only alphabetical values are allowed"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Previous Company Name *"
                    type="text"
                    name="prevcompanyName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Previous Designation *"
                    name="prevdesignation"
                    onChange={this.handleChange}
                    pattern="[A-Za-z\\s]*"
                    title="only alphabetical values are allowed"
                  />
                </div>
              </div>
            </div>
            {/*end section-5 */}
            <div className="profile-header-container" id="submission">
              <div className="ui checkbox">
                <label>
                  <input
                    name="check"
                    value="false"
                    onClick={this.handleCheck}
                    type="checkbox"
                  />
                  <span>Terms and Conditions</span>
                </label>
                <p className="center red-text">{this.state.checkBoxerror}</p>
                {/* <div className="createAccount2"> */}

                {/* </div> */}
              </div>

              <input
                type="file"
                class="inputfile center"
                id="embedpollfileinput"
                name="image"
                accept="images.jpeg"
                onChange={this.handleResume}
              />

              <label
                for="embedpollfileinput"
                className="ui huge white right floated button"
                id="hugewhite"
              >
                <img src={file} id="fileimg" />
                <span id="doc">Upload Resume</span>
              </label>
              <p>{this.state.docName}</p>
              <br></br>
              {loading && loading ? (
                <button id="UserLoginButton" className="center">
                  {loading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              ) : (
                <button
                  id="UserLoginButton"
                  className="center"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
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
const mapDispatchToProps = (dispatch) => {
  return {
    userLoginAction: (UserLogin) => dispatch(userLoginAction(UserLogin)),
    token: () => dispatch({ type: TOKEN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
