import React from "react";

const Pagination = (props) => {
	//[1, 2 ,3].map()
	const { itemsCount, pageSize } = props;

	const pagesCount = Math.ceil(itemsCount / pageSize);

	if (pagesCount === 1) return null;

	const pageArr = [];

	for (let i = 1; i < pagesCount + 1; i++) {
		pageArr[i] = i;
	}

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				{pageArr.map((x) => (
					<li
						key={x}
						className={
							x === props.currentPage ? "page-item active" : "page-item"
						}
					>
						<a
							onClick={() => props.onPageChange(x)}
							className="page-link"
							href="#"
						>
							{x}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
