import httpservers from "./httpservers";
import jwtDecode from "jwt-decode";

httpservers.setJWT(getJWT());

export async function login(email, password) {
	const { data: jwt } = await httpservers.post(
		"http://localhost:3900/api/auth/",
		{
			email,
			password,
		}
	);
	localStorage.setItem("token", jwt);
}

export function getJWT() {
	return localStorage.getItem("token");
}

export function loginWithJWT(jwt) {
	localStorage.setItem("token", jwt);
}
export function logout() {
	localStorage.removeItem("token");
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem("token");
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}
