import { useSelector } from "react-redux";
import css from "./Pseudo.module.scss";
import { motion, useAnimation } from "framer-motion";
import { get } from "../../store/selectors";

export const Pseudo = ({ inLineLimit = 0, ...props }) => {
	const reducedMotion = useSelector(get.reducedMotion);
	const appWidth = useSelector(get.appWidth);
	const isInLine = appWidth > inLineLimit;

	// framer motion whileHover event isn't trigger on touch device => switch to mouseEvent
	const controls = useAnimation();
	const handleHoverIn = () => controls.start("hover");
	const handleHoverOut = () => controls.start("initial");

	return reducedMotion ? (
		<h2 className={css._} {...props}>
			Alexandre COTTIN
		</h2>
	) : (
		<motion.h2
			className={css._}
			animate={controls}
			onMouseEnter={handleHoverIn}
			onMouseLeave={handleHoverOut}
			{...props}
		>
			<Lx isInLine={isInLine} /> <Ctn isInLine={isInLine} />
		</motion.h2>
	);
};

const Lx = ({ isInLine }) => {
	const customDirection = isInLine
		? { x: ["0em", "1.4em"], y: [0, 0], times: [0.1, 0.9] }
		: { x: [0, 0], y: ["0em", "0.5em"], times: [0.3, 1] };
	return (
		<>
			<motion.span variants={fadeVariant} custom={customDirection}>
				<motion.span variants={fadeVariant} custom={{ opacity: [1, 0, 0], times: [0.4, 0.6, 1] }}>
					A
				</motion.span>
				<motion.span
					variants={fadeVariant}
					custom={isInLine ? { x: ["0em", "0.5em"], times: [0.65, 1] } : { x: 0 }}
					className={`${css.highlight} ${css.letterSpacing} ${css.l}`}
				>
					l
				</motion.span>
				<motion.span variants={fadeVariant} custom={{ opacity: [1, 0, 0], times: [0.6, 0.8, 1] }}>
					e
				</motion.span>
				<motion.span
					variants={fadeVariant}
					custom={isInLine ? { x: 0 } : { x: ["0em", "-0.5em"], times: [0.65, 1] }}
					className={`${css.highlight} ${css.letterSpacing} ${css.x}`}
				>
					x
				</motion.span>
			</motion.span>
			<motion.span variants={fadeVariant} custom={{ opacity: [1, 0, 0], times: [0, 0.3, 1] }}>
				andre
			</motion.span>
		</>
	);
};

const Ctn = ({ isInLine }) => {
	const customDirection = isInLine
		? { x: ["0em", "-1em"], y: ["0em", "0.02em"], times: [0.1, 0.9] }
		: { x: ["0em", "0em"], y: ["0em", "-0.47em"], times: [0.3, 1] };
	return (
		<motion.span variants={fadeVariant} custom={customDirection} style={{ top: isInLine ? "0.02em" : 0 }}>
			<motion.span
				variants={fadeVariant}
				custom={isInLine ? { x: 0 } : { x: ["0", "1.52em"], times: [0.3, 0.6] }}
				className={css.highlight}
			>
				C
			</motion.span>
			<motion.span variants={fadeVariant} custom={{ opacity: [1, 0, 0], times: [0, 0.4, 1] }}>
				O
			</motion.span>
			<motion.span
				variants={fadeVariant}
				custom={{ x: ["0", isInLine ? "-0.65em" : "0.87em"], times: [0.3, 0.6] }}
				className={`${css.highlight} ${css.letterSpacing} ${css.t}`}
			>
				T
			</motion.span>
			<motion.span variants={fadeVariant} custom={{ opacity: [1, 0, 0], times: [0, 0.4, 1] }}>
				TI
			</motion.span>
			<motion.span
				variants={fadeVariant}
				custom={isInLine ? { x: ["0", "-1.52em"], times: [0.3, 0.6] } : { x: 0 }}
				className={css.highlight}
			>
				N
			</motion.span>
		</motion.span>
	);
};

const fadeVariant = {
	initial: { opacity: 1, x: "0em", y: "0em" },
	hover: custom => ({
		opacity: custom.opacity,
		x: custom.x,
		y: custom.y,
		transition: { duration: 2.3, delay: 1.0, times: custom.times },
	}),
};
