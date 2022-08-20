import { user } from "fontawesome";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg">
				<Link id="brand" className="navbar-brand" to="/">
					<h6>Movie Page</h6>
				</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<NavLink className="links" to="/movies">
								Movies
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="links" to="/customers">
								Customers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="links" to="/rentals">
								Rentals
							</NavLink>
						</li>

						{!this.props.userName && (
							<React.Fragment>
								<li className="nav-item">
									<NavLink className="links" to="/login">
										Login
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="links" to="/register">
										Register
									</NavLink>
								</li>
							</React.Fragment>
						)}
						{this.props.userName && (
							<React.Fragment>
								<li className="nav-item">
									<NavLink className="links" to="/profile">
										{this.props.userName.name}
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="links" to="/logout">
										Logout
									</NavLink>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

export default NavBar;
