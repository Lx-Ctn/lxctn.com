import { ContactCard } from "../../components";
import css from "./Contact.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export const Contact = () => {
	console.log("contact");
	const reducedMotion = useSelector(state => state.app.prefersReducedMotion);
	return (
		<motion.div className={css._} {...(!reducedMotion && animation)}>
			<div className={css.bubble} />
			<ContactCard />
		</motion.div>
	);
};

const animation = {
	initial: { scale: 0.6, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	exit: { scale: 0.4, opacity: 0 },
	transition: { duration: 0.3 },
};
