import React, { Component } from "react";
import Pagination from "./common/pagination";
import Genres from "./common/genreList";
import {
	getMovies,
	deleteMovie,
	likeMovie,
	getMeme,
} from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import ".././App.css";
import SearchBox from "./searchBox";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: null,
		searchQuery: "",
		sortColumn: { path: "title", order: "asc" },
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [{ _id: "", name: "All Genres" }, ...data];
		const { data: movies } = await getMovies();

		this.setState({ movies, genres });
	}

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error("This movie has already been deleted");
			}
			this.setState({ movies: originalMovies });
		}
	};

	handleLike = async (movie) => {
		const originalMovies = this.state.movies;

		const movies = [...originalMovies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });

		try {
			await likeMovie(movies[index]);
		} catch (ex) {
			if (
				(ex.response && ex.response.status === 404) ||
				ex.response.status === 400
			) {
				toast.error("This movie has already been liked");
			}
			this.setState({ movies: originalMovies });
		}
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			searchQuery,
			movies: allMovies,
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;

		const {
			pageSize,
			currentPage,
			selectedGenre,
			movies: allMovies,
			sortColumn,
		} = this.state;

		const { totalCount, data: Rendered } = this.getPagedData();

		if (count === 0)
			return (
				<p style={{ color: "red" }}>There are no movies in the database.</p>
			);

		return (
			<div className="row">
				<div className="col-3">
					<Genres
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
						textProperty="name"
						valueProperty="_id"
					/>
				</div>

				<div className="col">
					{this.props.user && (
						<Link to="/movies/new" id="newMovie" className="btn btn-primary">
							New Movie
						</Link>
					)}
					<p style={{ color: "green" }}>
						There are {count} movies in the Database.
					</p>
					<SearchBox
						value={this.state.searchQuery}
						onChange={this.handleSearch}
					/>
					<MoviesTable
						sortColumn={sortColumn}
						Rendered={Rendered}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
