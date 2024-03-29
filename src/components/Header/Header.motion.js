import { HEADER_MOBILE_NAV_HIGHT } from "./Header";

export const ANIMATIONS_DELAY = {
	FIRST_APPEARANCE: 0.5, // s
	SIDE_NAV: 1.2, // First appearance delay + wait for nav animation
	EXIT: 0.5, // s
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
		height: isMobile ? HEADER_MOBILE_NAV_HIGHT : "",
		transition: isIntro
			? { staggerChildren: 0.2, staggerDirection: -1, delayChildren: ANIMATIONS_DELAY.FIRST_APPEARANCE }
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
	initial: isIntro && isMobile ? { y: "45vh", opacity: 0 } : isIntro ? { x: "calc(-100% - 1em)" } : {},
	animate: {
		x: 0,
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			duration: 1,
			bounce: isIntro ? 0.3 : 0.4,
			delay: isMobile ? ANIMATIONS_DELAY.FIRST_APPEARANCE : ANIMATIONS_DELAY.SIDE_NAV,
		},
	},
	exit: {},
});

export const hamburgerVariants = isIntro => ({
	initial: { x: "-100%" },
	animate: {
		x: "0",
		transition: {
			type: "spring",
			duration: 0.8,
			bounce: 0.4,
			delay: isIntro ? ANIMATIONS_DELAY.SIDE_NAV : 0.4,
		},
	},
	exit: {
		x: "-100%",
		transition: { duration: ANIMATIONS_DELAY.EXIT },
	},
});

export const gearVariants = {
	initial: { x: "100%", rotate: 180 },
	animate: {
		x: 0,
		rotate: 0,
		transition: { type: "spring", duration: 0.8, bounce: 0.4, delay: ANIMATIONS_DELAY.SIDE_NAV },
	},
};
