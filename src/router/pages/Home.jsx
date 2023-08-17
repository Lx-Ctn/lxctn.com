import css from "./Home.module.scss";
import { motion } from "framer-motion";
import { animPropsNames } from "../../utils/animation";

import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { Link } from "react-router-dom";

import { ShiningFrame, AnimatedTitle } from "../../components";

export const Home = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	const isIntro = useSelector(get.isIntro);

	return (
		<motion.div className={css._} variants={homeAnimation(isIntro)} {...(!reducedMotion && animPropsNames)}>
			{reducedMotion ? <h1>Lx Design</h1> : <AnimatedTitle />}
			<motion.section variants={sectionAnimation(isIntro)}>
				<p>I'm a web designer, front-end developer, specialized in React</p>
				<ButtonLink to="aboutme">Learn more about me</ButtonLink>
			</motion.section>

			<motion.section variants={sectionAnimation(isIntro)}>
				<p>I've done terrible things...</p>
				<ButtonLink to="work">Check my work</ButtonLink>
			</motion.section>

			<motion.section variants={sectionAnimation(isIntro)}>
				<p>Want your own terrible thing ?</p>
				<ButtonLink to="contact">Contact me</ButtonLink>
			</motion.section>
		</motion.div>
	);
};

const ButtonLink = ({ to, children }) => {
	return (
		<button>
			<ShiningFrame />
			<Link className="button" to={to}>
				{children}
			</Link>
		</button>
	);
};

const homeAnimation = isIntro => ({
	initial: { scale: 0.4, opacity: 0 },
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.4,
			delay: isIntro ? 0.7 : 0,
			when: isIntro ? "beforeChildren" : false,
			staggerChildren: 0.15,
			delayChildren: isIntro ? 1 : 0.15,
		},
	},
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
});

const sectionAnimation = isIntro => ({
	initial: { scale: 0.4, opacity: 0, y: isIntro ? "150%" : 0 },
	animate: {
		scale: 1,
		opacity: 1,
		y: 0,
		transition: isIntro ? { type: "spring", duration: 1.3 } : { type: "spring" },
	},
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
});
