import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
	<Navbar collapseOnSelect expand="lg">
		<Navbar.Brand>
			<Link to="/"> Brand </Link>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="mr-auto">
				<Nav.Link>Features</Nav.Link>
				<Nav.Link>Pricing</Nav.Link>
			</Nav>
			<Nav>
				{currentUser ? (
					<Nav.Link > <span onClick={() => auth.signOut()}> SIGN OUT </span> </Nav.Link>
				) : (
					<Nav.Link>
						<Link to="/signin">SIGN IN</Link>
					</Nav.Link>
				)}
				<Nav.Link eventKey={2}>CART</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);

export default Header;