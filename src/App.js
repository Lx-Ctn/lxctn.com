import "./App.scss";
import { useMatches, useOutlet } from "react-router-dom";
import Router from "./router/Router";

import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header, Footer, UnderConstruction } from "./components";
import { AnimatePresence } from "framer-motion";
import { useSafeRouting } from "./utils/useSafeRouting";

import { get } from "./store/selectors";
import { loadingCompleted } from "./store/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default Router;

export function App() {
	useResponsive();
	usePrefersReducedMotion();
	const isLoaded = useSelector(get.isLoaded);

	const { pathname } = useMatches()[1]; // Get only the first segment
	const isLoadingOnPageWithNoAvatar = !isLoaded && pathname !== "/";
	const dispatch = useDispatch();

	useEffect(() => {
		if (isLoadingOnPageWithNoAvatar) dispatch(loadingCompleted());
	});
	if (isLoadingOnPageWithNoAvatar) return null;

	return isLoaded ? (
		<>
			<Header />
			<UnderConstruction />
			<div className="under-header">
				<Main />
				<Footer />
			</div>
		</>
	) : (
		<div className="is-loading">
			<Main />
		</div>
	);
}

const Main = () => {
	const { pathname } = useMatches()[1]; // Get only the first segment
	const routeElement = useOutlet();

	useSafeRouting();
	return (
		<AnimatePresence mode="wait">
			<main key={pathname}>{routeElement}</main>
		</AnimatePresence>
	);
};
