import httpservers from "./httpservers";

export function getMovies() {
	return httpservers.get("http://localhost:3900/api/movies");
}

export function getMeme() {
	return httpservers.get("https://meme-api.herokuapp.com/gimme");
}

export function deleteMovie(movieId) {
	return httpservers.delete("http://localhost:3900/api/movies/" + movieId);
}

export function getMovie(movieId) {
	return httpservers.get("http://localhost:3900/api/movies/" + movieId);
}

export function likeMovie(movie) {
	const body = { ...movie };
	delete body._id;
	return httpservers.put("http://localhost:3900/api/movies/" + movie._id, body);
}

export function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;
		return httpservers.put(
			"http://localhost:3900/api/movies/" + movie._id,
			body
		);
	}

	return httpservers.post("http://localhost:3900/api/movies/", movie);
}
