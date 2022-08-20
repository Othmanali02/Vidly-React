import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "./fontawesome-free-6.1.2-web/css/all.css";
import { BrowserRouter } from "react-router-dom";

console.log("Superman", process.env.REACT_APP_NAME);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

reportWebVitals();
