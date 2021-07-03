import React, { useEffect, useState } from "react";
import { graphql, useMutation } from "react-apollo";
import { flowRight as compose } from "lodash";
import { client } from "../App";
import {
	getAuthorQuery,
	addBookMutation,
	getBooksQuery,
} from "../queries/queries";

function AddBook() {
	const [authors, setAuthors] = useState([]);
	const [bookName, setBookName] = useState();
	const [bookGenre, setBookGenre] = useState();
	const [authorId, setAuthorId] = useState();
	const [addBook, { data }] = useMutation(addBookMutation);
	useEffect(() => {
		client
			.query({
				query: getAuthorQuery,
			})
			.then((result) => setAuthors(result.data.authors));
	});
	const submit = (e) => {
		e.preventDefault();
		console.log(data);
		addBook({
			variables: {
				name: bookName,
				genre: bookGenre,
				authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<form id="add-book" onSubmit={submit}>
				<div className="field">
					<label>Book name:</label>
					<input type="text" onChange={(e) => setBookName(e.target.value)} />
				</div>
				<div className="field">
					<label>Genre:</label>
					<input type="text" onChange={(e) => setBookGenre(e.target.value)} />
				</div>
				<div className="field">
					<label>Author:</label>
					<select
						onChange={(e) => {
							setAuthorId(e.target.value);
						}}
					>
						<option>Select Author</option>
						{authors.map((author) => {
							return (
								<option key={author.id} value={author.id}>
									{author.name}
								</option>
							);
						})}
					</select>
				</div>
				<button>+</button>
			</form>
		</div>
	);
}

export default compose(
	graphql(getAuthorQuery, { name: "getAuthorQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);
