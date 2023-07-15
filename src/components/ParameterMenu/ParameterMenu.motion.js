export const paramMenuVariants = {
	initial: { gridTemplateRows: "0fr" },
	animate: {
		gridTemplateRows: "1fr",
		transition: { duration: 0.3, delayChildren: 0.07, staggerChildren: 0.08, staggerDirection: 1 },
	},
	exit: {
		gridTemplateRows: "0fr",
		transition: { type: "tween", delay: 0.1, staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const childVariants = {
	initial: { opacity: 0, y: "-1em" },
	animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 17, stiffness: 500, mass: 1 } },
	exit: { opacity: 0, y: "-1em", transition: { duration: 0.15 } },
};
