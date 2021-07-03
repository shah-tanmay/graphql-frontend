import { graphql, useQuery } from "react-apollo";
import React from "react";
import { getBookQuery } from "../queries/queries";

function GetBookDetails({ bookid }) {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: {
			id: bookid,
		},
	});
	return (
		<div id="book-details">
			{bookid && !loading ? (
				<div>
					<h2>{data.book.name}</h2>
					<p>{data.book.genre}</p>
					<p>{data.book.author.name}</p>
					<p>OTHER BOOKS BY THIS AUTHOR</p>
					<ul className="other-books">
						{data.book.author.books.map((item) => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			) : (
				<div>No book selected</div>
			)}
		</div>
	);
}

export default graphql(getBookQuery)(GetBookDetails);
