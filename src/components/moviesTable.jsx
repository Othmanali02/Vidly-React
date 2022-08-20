import Like from "./common/like";
import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import { Tab } from "bootstrap";
import TableBody from "./common/tableBody";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
	columns = [
		{
			path: "title",
			label: "Title",
			content: (movie) => (
				<Link
					className="MovieLink"
					// info={
					// 	({ title: movie.title },
					// 	{ stock: movie.numberInStock },
					// 	{ genre: movie.genre.name },
					// 	{ rating: movie.dailyRentalRent })
					// }
					to={`/movies/${movie._id}/${movie.title}/${movie.dailyRentalRate}/${movie.genre.name}/${movie.numberInStock}`}
				>
					{movie.title}
				</Link>
			),
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			),
		},
	];
	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}
		this.props.onSort(sortColumn);
	};

	constructor() {
		super();
		const user = getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteColumn);
		}
	}

	deleteColumn = {
		key: "delete",
		content: (movie) => (
			<button
				onClick={() => this.props.onDelete(movie)}
				className="btn btn-danger btn-sm"
			>
				Delete
			</button>
		),
	};

	render() {
		const { sortColumn, onSort } = this.props;

		return (
			<table className="table">
				<TableHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<TableBody
					className="TableBody"
					columns={this.columns}
					data={this.props.Rendered}
				/>
				{/* <tbody>
					{this.props.Rendered.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like
									liked={movie.liked}
									onClick={() => this.props.onLike(movie)}
								/>
							</td>
							{this.props.userData.isAdmin && (
								<td>
									<button
										onClick={() => this.props.onDelete(movie)}
										className="btn btn-danger btn-sm"
									>
										Delete
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody> */}
			</table>
		);
	}
}

export default MoviesTable;
