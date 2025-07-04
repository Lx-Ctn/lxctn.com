import css from "./LogoLx.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { introVariants } from "./LogoLx.motion";
/*



*** SVG Path :
*/
const L_PATH = "M 0 100 C 3.94 56.3 7.88 12.6 7.88 12.6 c 0 0 0 43.7 0 87.4";
const X_PATH = "M 58.33 100 C 40.43 62.39 22.54 24.77 22.54 24.77 c 0 0 22.25 37.61 44.5 75.23";

const CURVING_DURATION = 0.7; // Duration of curving animation
const CURVE_INTENSITY = 10.8 + 3; // Curvature

// prettier-ignore
const CURVED_L_PATH = `M 0 100 C 3.94 56.3 ${7.88 + CURVE_INTENSITY} 12.6 ${7.88 + CURVE_INTENSITY} 12.6 c 0 0 -${CURVE_INTENSITY} 43.7 -${CURVE_INTENSITY} 87.4`;
// prettier-ignore
const CURVED_X_PATH = `M 58.33 100 C 40.43 62.39 ${22.54 + CURVE_INTENSITY} 24.77 ${22.54 + CURVE_INTENSITY} 24.77 c 0 0 ${22.25 - CURVE_INTENSITY} 37.61 ${44.5 - CURVE_INTENSITY} 75.23`;
/*



*** CSS variables :
*/
const cssVariables = {
	"--l-path": `"${L_PATH}"`,
	"--curved-l-path": `"${CURVED_L_PATH}"`,
	"--x-path": `"${X_PATH}"`,
	"--curved-x-path": `"${CURVED_X_PATH}"`,
	"--curving-duration": `${CURVING_DURATION}s`,
};
/*


 
*** Colors : 
*/
const LOGO_COLOR = "var(--logo-main-color)";

const RIGHT_COLOR = "var(--logo-main-color)"; // To make a ✓
const WRONG_COLOR = "var(--accent-color)"; // To make a ✗
const NEUTRAL_COLOR = "var(--neutral-color-muted)"; // To make a neutral color for the logo

// The logo have its theme color by default, but can take a "color" prop to change it,
//	This prop can be "true" to color the logo as a "✓", or false to make a "✗"
const getLogoColors = (color, { ifWrongColor, ifRightColor } = {}) => {
	if (color === null || color === undefined) return LOGO_COLOR;
	if (color === true) return ifRightColor ?? RIGHT_COLOR;
	if (color === false) return ifWrongColor ?? WRONG_COLOR;
	return color;
};
/*





*/
const LogoLx = ({ color, intro, waving, setIsAnimationEnded, ...props }) => {
	// If the app finish to load before the end of the intro drawing :
	useEffect(() => {
		const timedAnimEnd =
			intro &&
			setTimeout(() => {
				setIsAnimationEnded?.(true);
			}, 600);
		return () => clearTimeout(timedAnimEnd);
	}, [intro, setIsAnimationEnded]);

	const lVariants = {
		initial: waving ? { d: L_PATH } : { d: CURVED_L_PATH },
		animate: waving
			? { d: CURVED_L_PATH, transition: { duration: 0.7, delay: 0.5, repeat: Infinity, repeatType: "mirror" } }
			: { d: L_PATH },
	};
	const smallXVariants = {
		initial: waving ? { d: X_PATH } : { d: CURVED_X_PATH },
		animate: waving
			? { d: CURVED_X_PATH, transition: { duration: 0.7, delay: 0.5, repeat: Infinity, repeatType: "mirror" } }
			: { d: X_PATH },
	};

	return (
		<motion.div // Need a container to scale relatively a svg with motion
			className={intro ? css.intro : css._}
			style={cssVariables}
			key="Logo-Lx"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={intro && introVariants.container}
			{...props}
		>
			<motion.svg width="100%" viewBox="0 0 100 100">
				<motion.g variants={intro && introVariants.lContainer}>
					<motion.path // L
						className={css.lPath}
						d={L_PATH}
						fill={getLogoColors(color, { ifWrongColor: NEUTRAL_COLOR })}
						variants={lVariants}
						transition={{ duration: CURVING_DURATION }}
					/>
				</motion.g>

				<motion.g variants={intro && introVariants.xContainer}>
					<motion.path // X low
						className={css.xPath}
						d={X_PATH}
						fill={getLogoColors(color, { ifRightColor: NEUTRAL_COLOR })}
						variants={smallXVariants}
						transition={{ duration: CURVING_DURATION }}
					/>
				</motion.g>

				<motion.g>
					<motion.path // X high
						d="M 4.08 100 C 18.79 66.8 54.98 19.88 100 0 57.5 20.95 24.79 68.02 12.75 100"
						fill={getLogoColors(color)}
						variants={intro && introVariants.longX}
					/>
				</motion.g>
			</motion.svg>
		</motion.div>
	);
};

export default LogoLx;
