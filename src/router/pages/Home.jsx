import css from "./Home.module.scss";
import { AnimatedTitle } from "../../components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { Link } from "react-router-dom";
import { ShiningFrame } from "../../components";

export const Home = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	const isIntro = useSelector(get.isIntro);

	return (
		<motion.div className={css._} variants={homeAnimation(isIntro)} {...animNames}>
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

const animNames = {
	initial: "initial",
	animate: "animate",
	exit: "exit",
	transition: "transition",
};
const homeAnimation = isIntro => ({
	initial: { scale: 0.4, opacity: 0 },
	animate: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.4, delay: isIntro ? 0.7 : 0, staggerChildren: 0.1 },
	},
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	//transition: { duration: 0.4, delay: isIntro ? 0.7 : 0 },
});
const sectionAnimation = isIntro => ({
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: isIntro ? { duration: 1.2, delay: 1.5 } : { duration: 0.4 } },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
});
