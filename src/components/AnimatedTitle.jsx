import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../store/selectors";

const displayedWords = ["Design", "Web", "Games", "Branding", "Code", "Design"];
const delayBetweenWords = 700;
const maxWords = displayedWords.length - 1;

const AnimatedTitle = () => {
	const isIntro = useSelector(get.isIntro);
	const [count, setCount] = useState(isIntro ? 0 : maxWords);

	useEffect(() => {
		if (count < maxWords) {
			const waitNextWord = setTimeout(() => {
				setCount(count => count + 1);
			}, delayBetweenWords);
			return () => {
				clearTimeout(waitNextWord);
			};
		}
	}, [setCount, count]);

	const restartAnimation = () => {
		if (count === maxWords) setCount(0);
	};

	const currentWord = displayedWords[count];
	console.log({ currentWord, displayedWords, count });

	return (
		<motion.h1 {...titleVariants(currentWord.length)} onHoverStart={restartAnimation}>
			Lx{" "}
			<AnimatePresence mode="sync">
				<motion.span
					key={count}
					{...wordVariants}
					style={{ position: "absolute", left: "2ch", paddingBottom: "0.1em" }}
				>
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
	animate: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.25, delay: 0.09 } },
	exit: { clipPath: "inset(0 0 0 100%)" },
	transition: { duration: 0.25 },
};
