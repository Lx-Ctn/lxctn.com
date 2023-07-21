import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { useOutlet } from "react-router-dom";
import Router from "./router/Router";

import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header } from "./components";
import { DelayRender } from "./components/utils";

import { motion, AnimatePresence } from "framer-motion";
import { ShowTheme } from "./utils/colorTheme";

export function Root() {
	useResponsive();
	usePrefersReducedMotion();

	return (
		<motion.div className="App" key="app">
			<DelayRender delay={340}>
				<Header />
			</DelayRender>
			<Main />
			<ShowTheme />
		</motion.div>
	);
}

const Main = () => {
	const routeElement = useOutlet();
	const pathname = window.location.pathname;
	// Contact is rendered as a subroute of the home page "/" to get smooth transition between avatar position :
	const CorrectedPathname = pathname === "/contact" ? "/" : pathname; // So "/contact" path should not trigger this parent animation
	return (
		<AnimatePresence mode="wait">
			<main key={CorrectedPathname}>{routeElement}</main>
		</AnimatePresence>
	);
};

const AppContainer = () => (
	<Provider store={store}>
		<Router />
	</Provider>
);
export default AppContainer;
