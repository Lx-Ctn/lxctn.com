import css from "./UnderConstruction.module.scss";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { motion, AnimatePresence } from "framer-motion";
import { animPropsNames } from "../../utils/animation";
import { ShiningFrame } from "../ShiningFrame/ShiningFrame";
import { useState } from "react";

export const UnderConstruction = () => {
	const [isOpen, setIsopen] = useState(true);
	const isIntro = useSelector(get.isIntro);
	const reducedMotion = useSelector(get.reducedMotion);
	const handleClick = e => {
		e.preventDefault();
		setIsopen(false);
	};
	return (
		<AnimatePresence>
			{!isIntro && isOpen && (
				<motion.dialog
					open
					className={css._}
					variants={modalAnimation}
					{...(!reducedMotion && animPropsNames)}
				>
					<form method="dialog" onSubmit={handleClick}>
						<h2>Under construction</h2>
						<p>There's already lots of things to see, but please be tolerant with me</p>
						<button>
							<ShiningFrame /> Ok !
						</button>
						<button className="link">I will juge you</button>
					</form>
				</motion.dialog>
			)}
		</AnimatePresence>
	);
};

const modalAnimation = {
	initial: { opacity: 0, scale: 0.4 },
	animate: { opacity: 1, scale: 1, transition: { type: "spring", duration: 0.8 } },
	exit: { opacity: 0, scale: 0.4 },
};
