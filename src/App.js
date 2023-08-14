import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { useMatches, useOutlet } from "react-router-dom";
import Router from "./router/Router";

import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header, Footer } from "./components";
import { motion, AnimatePresence } from "framer-motion";

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
	const { pathname } = useMatches()[1];
	return (
		<AnimatePresence mode="wait">
			<motion.main key={pathname}>{routeElement}</motion.main>
		</AnimatePresence>
	);
};

const AppContainer = () => (
	<Provider store={store}>
		<Router />
	</Provider>
);
export default AppContainer;
