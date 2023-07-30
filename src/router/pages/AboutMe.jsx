import { motion } from "framer-motion";

export const AboutMe = () => {
	return (
		<motion.div {...AboutMePageAnimation}>
			<h1>Hello !</h1>
			<p>It's me ^^</p>
		</motion.div>
	);
};

const AboutMePageAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
