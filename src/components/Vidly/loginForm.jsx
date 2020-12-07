import Joi from "joi-browser";
import React from "react";
import Form from "../common/form";
import auth from "../../services/authServices";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      loginUsername: "",
      loginPassword: "",
    },
    errors: {},
  };
  schema = {
    loginUsername: Joi.string().required().label("Username"),
    loginPassword: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { loginUsername, loginPassword } = this.state.data;
      await auth.login(loginUsername, loginPassword);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.loginUsername = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container my-3">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("loginUsername", "Username", "text")}
          {this.renderInput("loginPassword", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
