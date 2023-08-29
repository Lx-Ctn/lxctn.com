import css from "./LogoLx.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { LogoColor } from "../../utils/colorTheme"; // // Default brand color
import { introVariants } from "./LogoLx.motion";
/*



*** SVG Path :
*/
const L_PATH = "M0,185.12C7.3,104.22,14.59,23.32,14.59,23.32c0,0,0,80.9,0,161.8";
const X_PATH = "M107.98,185.12C74.85,115.49,41.72,45.86,41.72,45.86c0,0,41.19,69.63,82.38,139.26";

const CURVING_DURATION = 0.7; // Duration of curving animation
const CURVE_INTENSITY = 20;

const CURVED_L_PATH = `M 0 185.12 C 7.3 104.22 ${14.59 + CURVE_INTENSITY} 23.32 ${
	14.59 + CURVE_INTENSITY
} 23.32 c 0 0 -${CURVE_INTENSITY} 80.9 -${CURVE_INTENSITY} 161.8`;
const CURVED_X_PATH = `M107.98,185.12 C74.85,115.49,${41.72 + CURVE_INTENSITY},45.86,${
	41.72 + CURVE_INTENSITY
},45.86 c0,0,${41.19 - CURVE_INTENSITY},69.63,${82.38 - CURVE_INTENSITY},139.26`;
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
const LOGO_COLOR = LogoColor.toHsl();

const RIGHT_COLOR = "rgb(0, 176, 208)"; // To make a ✓
const WRONG_COLOR = "#a10033"; // To make a ✗
const NEUTRAL_COLOR = "#003F5413";

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
			<motion.svg width="100%" viewBox="0 0 185.12 185.12">
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
						d="M7.55,185.12C34.79,123.66,101.77,36.81,185.12,0,106.45,38.78,45.89,125.92,23.6,185.11"
						fill={getLogoColors(color)}
						variants={intro && introVariants.longX}
					/>
				</motion.g>
			</motion.svg>
		</motion.div>
	);
};

export default LogoLx;
