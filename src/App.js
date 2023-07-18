import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { Outlet } from "react-router-dom";
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

			<main>
				<AnimatePresence mode="exitBeforeEnter">
					<Outlet key={window.location.pathname} />
				</AnimatePresence>
			</main>

			<ShowTheme />
		</motion.div>
	);
}

const AppContainer = () => (
	<Provider store={store}>
		<Router />
	</Provider>
);
export default AppContainer;
