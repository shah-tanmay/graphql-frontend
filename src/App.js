import "./App.css";
import BookList from "./components/BookList";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";

export const client = new ApolloClient({
	uri: "https://tanmaysgraphqlserver.herokuapp.com/graphql",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
