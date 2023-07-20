import css from "./Home.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { Avatar, AnimatedTitle } from "../../components";
import { DelayRender } from "../../components/utils";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export const Home = () => {
	console.log("home");
	const location = useLocation();
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);
	const isIntro = useSelector(state => state.header.isIntro);
	return reducedMotion ? (
		<div className={`${css._} ${location.pathname === "/contact" ? css.contact : null}`}>
			<div className={css.avatar_container}>
				<Avatar />
			</div>
			<Outlet />
		</div>
	) : (
		<motion.div className={`${css._} ${location.pathname === "/contact" ? css.contact : null}`} layout>
			<div className={css.avatar_container}>
				<Avatar />
			</div>

			{isIntro ? (
				<DelayRender delay={700}>
					{/* Outlet to render HomeElement or Contact as sub-route :
				-> to keep Avatar on screen and alow a smooth transition */}
					<Outlet />
				</DelayRender>
			) : (
				<Outlet />
			)}
		</motion.div>
	);
};

export const HomeElement = () => {
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);
	return reducedMotion ? (
		<h1>Lx Design</h1>
	) : (
		<motion.div {...homeAnimation}>
			<AnimatedTitle />
		</motion.div>
	);
};

const homeAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
