import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { useMatches, useOutlet } from "react-router-dom";
import Router from "./router/Router";

import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header } from "./components";
import { DelayRender } from "./components/utils";

import { AnimatePresence } from "framer-motion";
import { ShowTheme } from "./utils/colorTheme";

export function App() {
	useResponsive();
	usePrefersReducedMotion();
	return (
		<>
			<Header />
			<div className="under-header">
				<Main />
				<DelayRender delay={700}>
					<ShowTheme />
				</DelayRender>
			</div>
		</>
	);
}

const Main = () => {
	const routeElement = useOutlet();
	const { pathname } = useMatches()[1];
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
