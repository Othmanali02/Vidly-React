import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ path, Component: Component, render, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (getCurrentUser() == null)
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: props.location },
							}}
						/>
					);
				else return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
};

export default ProtectedRoute;
