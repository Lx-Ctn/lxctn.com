import css from "./Error.module.scss";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
	const error = useRouteError();
	const goBack = () => window.history.back();

	return (
		<div className={css._} id="error-page">
			<h1 className={css.title}>Oops!</h1>
			<p>
				Sorry, probably miss a <code className={css.code}>;</code> somewhere...
			</p>

			<p className={css.bigCode}>
				<code>{error.statusText || error.message}</code>
			</p>

			<button className={`${css.goBack} link`} onClick={goBack}>
				Go back to previous page
			</button>
		</div>
	);
}
