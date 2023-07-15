import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import { useResponsive } from "./utils/useResponsive";
import { usePrefersReducedMotion } from "./utils/handleReducedMotion";

import { Header, AnimatedTitle, Avatar, ContactCard } from "./components";
import { DelayRender } from "./components/utils";

import { motion } from "framer-motion";
import { ShowTheme } from "./utils/colorTheme";

function App() {
	useResponsive();
	usePrefersReducedMotion();

	return (
		<motion.div className="App" key="app">
			<DelayRender delay={340}>
				<Header />
			</DelayRender>

			<div className="intro-hero">
				<Avatar />
				<DelayRender delay={700}>
					<AnimatedTitle />
				</DelayRender>
			</div>

			<ShowTheme />
			<ShowTheme />
			<ShowTheme />
			<ShowTheme />
			<ShowTheme />
			<ContactCard />
		</motion.div>
	);
}

const AppContainer = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default AppContainer;
