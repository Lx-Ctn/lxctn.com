import { useRouteError } from "react-router-dom";

export function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	const goBack = () => window.history.back();

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>
				Sorry, a probably miss a <code>;</code> somewhere...
			</p>

			<p>
				<i>{error.statusText || error.message}</i>
			</p>

			<button onClick={goBack}>Go back to previous page</button>
		</div>
	);
}
