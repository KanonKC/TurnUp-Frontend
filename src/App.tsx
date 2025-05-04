import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { Provider } from "react-redux";
import { store } from "./stores";

function App() {
	return (
		<>
			<BrowserRouter>
				<Provider store={store}>
					<Router />
				</Provider>
			</BrowserRouter>
		</>
	);
}

export default App;
