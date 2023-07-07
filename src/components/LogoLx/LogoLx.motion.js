export const introVariants = {
	container: {
		initial: { scale: 1, opacity: 1, originX: 0.2 },
		animate: {},
		exit: { scale: 1.5, opacity: 1, transition: { duration: 0.25 } },
	},
	lContainer: {
		initial: { clipPath: "circle(0% at 0 100%)" },
		animate: { clipPath: "circle(150% at 0 100%)", transition: { duration: 0.3, delay: 0.2 } },
	},
	xContainer: {
		initial: { clipPath: "circle(0% at 100% 100%)" },
		animate: { clipPath: "circle(150% at 100% 100%)", transition: { duration: 0.3, delay: 0.3 } },
	},
	longX: {
		initial: { clipPath: "circle(0% at 0 100%)" },
		animate: { clipPath: "circle(150% at 0 100%)", transition: { duration: 0.5 } },
	},
};
