import { useEffect, useState } from "react";

// Delay rendering for better animation control :
export const DelayRender = ({ delay, children }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const setDelay = setTimeout(setShow, delay, true);
		return () => clearTimeout(setDelay);
	}, [delay]);

	return show && children;
};
