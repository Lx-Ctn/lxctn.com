import css from "./AboutMe.module.scss";
import { motion } from "framer-motion";
import { Pseudo } from "../../components";

export const AboutMe = () => {
	return (
		<motion.div className={css._} {...AboutMePageAnimation}>
			<h1>Hello !</h1>
			<p className={css.prePseudo}>I'm</p>
			<Pseudo />
		</motion.div>
	);
};

const AboutMePageAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
