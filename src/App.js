import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/login-form";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Register from "./components/register-form";
import ProtectedRoute from "./components/protectedRoute";

class App extends Component {
	state = {};

	componentDidMount() {
		const user = getCurrentUser();
		this.setState({ user });
	}
	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar userName={this.state.user} />
				<main className="container">
					<Switch>
						<ProtectedRoute
							path="/movies/:id/:title?/:rating?/:genre?/:stock?/"
							Component={MovieForm}
						/>
						<ProtectedRoute
							path="/movies/new"
							render={() => <MovieForm {...this.props} />}
						/>
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/register" component={Register} />
						<Route
							path="/movies"
							render={(props) => <Movies {...props} user={this.state.user} />}
						/>
						<Route path="/rentals" component={Rentals} />
						<Route path="/customers" component={Customers} />
						<Redirect from="/" to="/movies" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
