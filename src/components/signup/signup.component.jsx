import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

import { auth, getUserProfileData } from "../../firebase/firebase.utils";

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await getUserProfileData(user, { displayName });

			this.setState({
				displayName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<Container>
				<Jumbotron>
					{" "}
					<h1> SIGN UP </h1>{" "}
				</Jumbotron>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="formBasicText">
						<Form.Label>Display Name</Form.Label>
						<Form.Control
							type="text"
							name="displayName"
							value={displayName}
							placeholder="Display  Name"
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="formConfirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Button variant="outline-primary" type="submit">
						SIGN UP
					</Button>
				</Form>
			</Container>
		);
	}
}

export default SignUp;