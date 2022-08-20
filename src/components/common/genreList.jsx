import React from "react";

const Genres = (props) => {
	const { textProperty, valueProperty, selectedItem } = props;
	return (
		<ul className="list-group">
			{props.items.map((genre) => (
				<li
					key={genre[valueProperty]}
					style={{ cursor: "pointer" }}
					className={
						genre === selectedItem
							? "list-group-item active"
							: "list-group-item"
					}
					onClick={() => props.onItemSelect(genre)}
				>
					{genre[textProperty]}
				</li>
			))}
		</ul>
	);
};

export default Genres;
