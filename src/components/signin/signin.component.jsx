import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: "", password: "" });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const { email, password } = this.state;
		return (
			<Container>
				<Jumbotron>
					{" "}
					<h1> SIGN IN </h1>{" "}
				</Jumbotron>
				<Form onSubmit={this.handleSubmit}>
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
					<Button variant="outline-primary" type="submit">
						SIGN IN
					</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Button variant="outline-primary" onClick={signInWithGoogle}>
						SIGN IN WITH GOOGLE
					</Button>
					<hr />
					<Form.Text>
						{" "}
						Don't have an account yet?
						<Link to="/signup"> SIGN UP </Link>
					</Form.Text>
				</Form>
			</Container>
		);
	}
}

export default SignIn;