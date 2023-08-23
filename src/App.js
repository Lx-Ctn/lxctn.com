import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { useMatches, useOutlet } from "react-router-dom";
import Router from "./router/Router";

import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header, Footer } from "./components";
import { AnimatePresence } from "framer-motion";
import { useSafeRouting } from "./utils/useSafeRouting";

export function App() {
	useResponsive();
	usePrefersReducedMotion();
	return (
		<>
			<Header />
			<div className="under-header">
				<Main />
				<Footer />
			</div>
		</>
	);
}

const Main = () => {
	const routeElement = useOutlet();
	const { pathname } = useMatches()[1]; // Get only the first segment
	useSafeRouting();

	return (
		<AnimatePresence mode="wait">
			<main key={pathname}>{routeElement}</main>
		</AnimatePresence>
	);
};

const AppContainer = () => (
	<Provider store={store}>
		<Router key="router" />
	</Provider>
);
export default AppContainer;
