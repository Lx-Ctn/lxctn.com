import css from "./Home.module.scss";
import { useOutlet, useLocation } from "react-router-dom";
import { Avatar, AnimatedTitle } from "../../components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export const Home = () => {
	const location = useLocation();
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);

	return (
		<div
			className={`${css._} ${location.pathname === "/contact" ? css.contact : null}`}
			{...(!reducedMotion && homePageAnimation)}
		>
			<div className={css.avatar_container}>
				<Avatar />
			</div>
			{/* Outlet to render HomeElement or Contact as sub-route :
				-> to keep Avatar on screen and alow a smooth transition */}
			<Outlet />
		</div>
	);
};

const Outlet = () => {
	const routeElement = useOutlet();
	return (
		<AnimatePresence mode="wait">
			<div key={window.location.pathname}>{routeElement}</div>
		</AnimatePresence>
	);
};

export const HomeElement = () => {
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);
	const isIntro = useSelector(state => state.header.isIntro);
	return reducedMotion ? (
		<h1>Lx Design</h1>
	) : (
		<motion.div {...homeElementAnimation(isIntro)}>
			<AnimatedTitle />
		</motion.div>
	);
};

const homePageAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
const homeElementAnimation = isIntro => ({
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4, delay: isIntro ? 0.7 : 0 },
});
