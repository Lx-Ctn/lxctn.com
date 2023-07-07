export const paramMenuVariants = height => ({
	initial: height ? { height: 0 } : { display: "none" },
	animate: {
		height,
		transition: { type: "spring", staggerChildren: 0.08, staggerDirection: 1, delayChildren: 0.15 },
		transitionEnd: { height: "", display: "" },
	},
	exit: {
		height: 0,
		transition: { type: "tween", delay: 0.3, staggerChildren: 0.05, staggerDirection: -1 },
	},
});

export const childVariants = {
	initial: { opacity: 0, y: "-1em" },
	animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
	exit: { opacity: 0, y: "-1em", transition: { duration: 0.15 } },
};
