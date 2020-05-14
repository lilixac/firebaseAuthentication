import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
	<Navbar collapseOnSelect expand="lg">
		<Navbar.Brand>
			<Link to="/"> Pets Nepal </Link>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="mr-auto">
				<Nav>SHOP</Nav>
			</Nav>
			<Nav>
				{currentUser ? (
					<Nav.Link > <span onClick={() => auth.signOut()}> SIGN OUT </span> </Nav.Link>
				) : (
					<Nav>
						<Link to="/signin">SIGN IN</Link>
					</Nav>
				)}
				<Nav.Link eventKey={2}>CART</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);

export default Header;