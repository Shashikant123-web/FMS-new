import { Router, Route, Link } from "react-router-dom";
import React from "react";
import history from "./history";
import ReactDOM from "react-dom";
import Login from "./Dashboard";
import Register from "./Register";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {/* <div>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
    </div> */}
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
