import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { useMatches, useOutlet } from "react-router-dom";
import Router from "./router/Router";

import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header } from "./components";
import { DelayRender } from "./components/utils";

import { motion, AnimatePresence } from "framer-motion";
import { ShowTheme } from "./utils/colorTheme";

export function App() {
	useResponsive();
	usePrefersReducedMotion();

	return (
		<motion.div className="App" key="app">
			<Header />
			<Main />
			<DelayRender delay={700}>
				<ShowTheme />
			</DelayRender>
		</motion.div>
	);
}

const Main = () => {
	const routeElement = useOutlet();
	const pathname = useMatches()[1].pathname;
	return (
		<AnimatePresence mode="wait">
			<main key={pathname}>{routeElement}</main>
		</AnimatePresence>
	);
};

const AppContainer = () => (
	<Provider store={store}>
		<Router />
	</Provider>
);
export default AppContainer;
