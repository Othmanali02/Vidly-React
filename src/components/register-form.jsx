import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import { loginWithJWT, getCurrentUser } from "../services/authService";
import { Redirect } from "react-router-dom";

class Register extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label("Email"),
		password: Joi.string().required().label("Password").min(5),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = async () => {
		//Call the server
		try {
			const response = await register(this.state.data);
			loginWithJWT(response.headers["x-auth-token"]);
			window.location = "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
		console.log("Submitted");
	};

	render() {
		if (getCurrentUser()) return <Redirect to="/login" />;

		return (
			<React.Fragment>
				<h1>Register</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</React.Fragment>
		);
	}
}

export default Register;
