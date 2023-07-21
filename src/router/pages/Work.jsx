import css from "./Work.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const WorkPage = () => {
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);
	return (
		<motion.div className={css._} {...(!reducedMotion && workPageTransition)}>
			<h1>Look at what i've done</h1>
			<nav>
				<CustomLink link={"/web"}>Web</CustomLink>
				<CustomLink link={"/design"}>Graphic Design</CustomLink>
			</nav>
			<p>Voilà....</p>
		</motion.div>
	);
};

const CustomLink = ({ children, motionPosition, link, isIntro, isMobile, isAnimating }) => (
	<motion.div
		//className={css.navLink}
		custom={motionPosition}
	>
		<NavLink className={({ isActive }) => (isActive ? css.active : null)} to={link}>
			{children}
		</NavLink>
	</motion.div>
);

const workPageTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
