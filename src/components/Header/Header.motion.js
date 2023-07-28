export const SIDE_NAV_DELAY = 700; //ms
export const EXIT_DELAY = 0.3; // s

export const animPropsNames = {
	initial: "initial",
	animate: "animate",
	exit: "exit",
};

export const headerVariants = {
	initial: {},
	animate: {},
	exit: {},
};

export const navVariants = (isIntro, isMobile) => ({
	initial: isMobile ? { height: 0 } : { y: 0 },
	animate: {
		// make height transition on mobile to have a blur transition under :
		height: isMobile ? "calc(2.1em * 4)" : "", // link : 1em (font-size) * 1.3 (line-height) + 2 * 0.3em (padding) + 0.2em (visual margin for better lisibility) = 2.1em * 4 link
		transition: isIntro
			? { staggerChildren: 0.08, staggerDirection: -1 }
			: {
					type: "spring",
					bounce: 0.4,
					duration: 0.5,
					staggerChildren: 0.06,
					staggerDirection: 1,
					delayChildren: isMobile ? 0 : 0.3,
			  },
	},
	exit: isMobile
		? { height: 0, transition: { staggerChildren: isIntro ? 0.08 : 0.03, staggerDirection: -1 } }
		: { y: "-100%", transition: { duration: 0.3 } },
});

export const linkVariants = (isIntro, isMobile) => ({
	initial: isIntro ? custom => ({ opacity: 0, y: "40vh", x: custom }) : { opacity: 0, y: "-1.5em" },
	animate: {
		opacity: 1,
		y: 0,
		x: 0,
		transition: {
			type: "spring",
			duration: isIntro ? 1 : 0.3,
		},
	},
	exit: isMobile ? { opacity: 0, y: "-1em", transition: { type: "spring", duration: 0.2 } } : {},
});

export const logoVariants = (isIntro, isMobile) => ({
	initial: isIntro && isMobile ? { y: "45vh" } : isIntro ? { x: "-100%" } : {},
	animate: { x: 0, y: 0 },
	exit: {},
	transition: { type: "spring", duration: 0.7, bounce: isIntro ? 0.3 : 0.4 },
});

export const hamburgerVariants = isIntro => ({
	initial: { x: "-100%" },
	animate: { x: "0", transition: { delay: isIntro ? 0.7 : 0.3 } },
	exit: { x: "-100%" },
	transition: { type: "spring", duration: 0.7, bounce: 0.4 },
});

export const gearVariants = {
	initial: { x: "100%", rotate: 180 },
	animate: { x: 0, rotate: 0 },
	transition: { type: "spring", duration: 0.7, bounce: 0.4 },
};
