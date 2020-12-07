import { Component } from "react";
import auth from "../../services/authServices";

class Logout extends Component {
  componentDidMount() {
    auth.logout(); //Logout Auth Services

    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
