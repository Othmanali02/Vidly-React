import React from "react";

const Like = (props) => {
	let fill = "gold";
	let classes = "fas fa-star";
	if (!props.liked) {
		classes = "fas fa-star";
		fill = "lightgrey";
	}
	return (
		<i
			onClick={props.onClick}
			style={{ cursor: "pointer", color: fill }}
			className={classes}
			aria-hidden="true"
		/>
	);
};

export default Like;
