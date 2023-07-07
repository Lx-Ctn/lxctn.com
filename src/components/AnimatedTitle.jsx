import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const displayedWords = ["Design", "Web", "Games", "Branding", "Code", "Design"];
const delayBetweenWords = 500;

const AnimatedTitle = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		if (count < displayedWords.length - 1) {
			const waitNextWord = setTimeout(() => {
				setCount(count => count + 1);
			}, delayBetweenWords);
			return () => {
				clearTimeout(waitNextWord);
			};
		}
	}, [setCount, count]);

	const currentWord = displayedWords[count];

	return (
		<motion.h1 {...titleVariants(currentWord.length)}>
			Lx{" "}
			<AnimatePresence mode="wait">
				<motion.span key={count} {...wordVariants}>
					{currentWord}
				</motion.span>
			</AnimatePresence>
		</motion.h1>
	);
};

export default AnimatedTitle;

// Animation :
const titleVariants = length => ({
	initial: { opacity: 0, y: "-30%", scale: 0.8, width: `${3 + 0.65 * length}ch` },
	animate: { opacity: 1, y: 0, scale: 1, width: `${3 + 0.65 * length}ch` },
	transition: { type: "spring" },
});
const wordVariants = {
	initial: { clipPath: "inset(0 100% 0 0)" },
	animate: { clipPath: "inset(0 0% 0 0)" },
	exit: { clipPath: "inset(0 100% 0 0)" },
	transition: { duration: 0.1 },
};
