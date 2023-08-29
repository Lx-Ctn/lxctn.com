import { useState, useEffect } from "react";
import LogoLx from "../LogoLx/LogoLx";
import { AnimatePresence } from "framer-motion";

const AppLoader = ({ LazyApp }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isAnimationCompleted, setIsAnimationEnded] = useState(false);

	useEffect(() => {
		const loadApp = async () => {
			try {
				await LazyApp;
				setIsLoaded(true);
			} catch (error) {
				console.error("AppLoader : ", error);
			}
		};
		loadApp();
	}, [LazyApp]);

	return (
		<AnimatePresence>
			{isLoaded && isAnimationCompleted ? (
				<LazyApp />
			) : (
				<LogoLx key="intro" intro waving setIsAnimationEnded={setIsAnimationEnded} />
			)}
		</AnimatePresence>
	);
};

export default AppLoader;
