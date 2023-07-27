import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { AppLoader } from "./components/utils";
const LazyApp = lazy(() => import("./App"));

/* // Timeout to test the loading animation :
const LazyApp = lazy(() => {
	return new Promise(resolve => {
		setTimeout(() => resolve(import("./App")), 3000);
	});
}); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AppLoader LazyApp={LazyApp} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
