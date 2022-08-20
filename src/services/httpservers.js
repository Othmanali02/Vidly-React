import Axios from "axios";
import { toast } from "react-toastify";

Axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;
	if (!expectedError) {
		console.log(error);
		toast.error("An unexpected error has occured");
	}
	return Promise.reject(error);
});

function setJWT(jwt) {
	Axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
	get: Axios.get,
	put: Axios.put,
	delete: Axios.delete,
	post: Axios.post,
	request: Axios.request,
	setJWT,
};
