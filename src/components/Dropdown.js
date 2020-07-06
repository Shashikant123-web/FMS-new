import React, { Component } from "react";
import ReactDOM from "react-dom";
//   import jsonData from "./posts.json";
import { Form, FormControl } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
// const techCompanies = [
//     { label: "Zimbabwe", value: +263 },
//     { label: "Facebook", value: 2 },
//     { label: "Netflix", value: 3 },
//     { label: "Tesla", value: 4 },
//     { label: "Amazon", value: 5 },
//     { label: "Alphabet", value: 6 },
//   ];
//   const country = jsonData[];
class dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "coconut",
      lists: ["cambodia", "dambodia", "pambodia", "fambodia"],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {
    // alert("color:"+this.state.value)
    e.preventDefault();
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit} class="form">
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control as="select">
            {/* <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option> */}
            {this.state.lists.map((list) => (
              <option key={list} value={list}>
                {console.log(list)}
                {list}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </form>
    );
  }
}
export default dropdown;
