import httpservers from "./httpservers";

export function getGenres() {
	return httpservers.get("http://localhost:3900/api/genres");
}
