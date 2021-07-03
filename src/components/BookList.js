import React, { useEffect, useState } from "react";
import { client } from "../App";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import GetBookDetails from "./GetBookDetails";

function BookList() {
	const [books, setBooks] = useState([]);
	const [selected, setSelected] = useState(null);
	useEffect(() => {
		client
			.query({
				query: getBooksQuery,
			})
			.then((result) => {
				setBooks(result.data.books);
			});
	});
	return (
		<div>
			<h2>Click on Book to know about more details</h2>
			{books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => setSelected(book.id)}
						style={{ cursor: "pointer" }}
					>
						{book.name}
					</li>
				);
			})}
			<GetBookDetails bookid={selected} />
		</div>
	);
}

export default graphql(getBooksQuery)(BookList);
