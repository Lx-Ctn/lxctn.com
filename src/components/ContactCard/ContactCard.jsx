import css from "./ContactCard.module.scss";
import { motion } from "framer-motion";

export const ContactCard = () => {
	return (
		<motion.div className={css._}>
			<motion.h1 whileHover="hover">
				<Lx /> <Ctn />
			</motion.h1>
			<p>
				Tel : <a href="tel:0658529939">06 58 52 99 39</a>
			</p>
			<p>
				Mail : <a href="mailto:design@lxctn.com">design@lxctn.com</a>
			</p>
			<p>
				Github : <a href="https://github.com/Lx-Ctn?tab=repositories">Lx-Ctn</a>
			</p>
		</motion.div>
	);
};

const Lx = () => {
	return (
		<>
			<motion.span variants={fadeVariant} custom={{ x: ["0em", "1.4em"], times: [0.2, 1] }}>
				<motion.span variants={fadeVariant} custom={{ opacity: [1, 0], times: [0.4, 0.6] }}>
					A
				</motion.span>
				<motion.span
					variants={fadeVariant}
					custom={{ x: ["0em", "0.5em"], times: [0.8, 1] }}
					className={css.highlight}
				>
					l
				</motion.span>
				<motion.span variants={fadeVariant} custom={{ opacity: [1, 0], times: [0.6, 0.8] }}>
					e
				</motion.span>
				<motion.span className={css.highlight}>x</motion.span>
			</motion.span>
			<motion.span variants={fadeVariant} custom={{ opacity: [1, 0], times: [0, 0.2] }}>
				andre
			</motion.span>
		</>
	);
};

const Ctn = () => {
	return (
		<motion.span variants={fadeVariant} custom={{ x: ["0em", "-1em"], times: [0.2, 1] }}>
			<motion.span className={css.highlight}>C</motion.span>
			<motion.span variants={fadeVariant} custom={{ opacity: [1, 0], times: [0, 0.5] }}>
				O
			</motion.span>
			<motion.span
				variants={fadeVariant}
				custom={{ x: ["0", "-0.65em"], times: [0.5, 1] }}
				className={css.highlight}
			>
				T
			</motion.span>
			<motion.span variants={fadeVariant} custom={{ opacity: [1, 0], times: [0, 0.5] }}>
				TI
			</motion.span>
			<motion.span
				variants={fadeVariant}
				custom={{ x: ["0", "-1.52em"], times: [0.5, 1] }}
				className={css.highlight}
			>
				N
			</motion.span>
		</motion.span>
	);
};

const fadeVariant = {
	hover: custom => ({
		opacity: custom.opacity,
		left: custom.x,
		transition: { duration: 2.7, delay: 1.0, times: custom.times },
	}),
};
