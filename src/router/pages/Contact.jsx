import { ContactCard } from "../../components";
import css from "./Contact.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export const Contact = () => {
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);
	const isIntro = useSelector(state => state.header.isIntro);

	return (
		<motion.div className={css._} {...(!reducedMotion && animation(isIntro))}>
			<div className={css.bubble} />
			<ContactCard />
		</motion.div>
	);
};

const animation = isIntro => ({
	initial: { scale: 0.6, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { duration: 0.2, delay: isIntro ? 0.7 : 0 } },
	exit: { scale: 0.4, opacity: 0 },
	transition: { duration: 0.3 },
});
