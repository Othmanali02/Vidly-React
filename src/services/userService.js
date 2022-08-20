import httpservers from "./httpservers";

export function register(user) {
	return httpservers.post("http://localhost:3900/api/users/", {
		email: user.username,
		password: user.password,
		name: user.name,
	});
}
