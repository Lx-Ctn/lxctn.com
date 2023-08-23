import { useEffect, useRef } from "react";
/***
 * Framer motion AnimatePresence component, which allows pages transition, works badly with react router...
 * When fast switching route (for exemple when tap cmd (alt on pc) + arrow for navigate history),
 * AnimatePresence forget or mix outlet content.
 * I haven't find a good solution yet, so i came up with this temporaly fix :
 * If path change under 350 ms since last change -> reload the app at current page.
 */
export const useSafeRouting = () => {
	const isSafe = useRef(true);
	const lastPath = useRef(window.location.pathname);
	useEffect(() => {
		const path = window.location.pathname;
		if (lastPath.current !== path) {
			lastPath.current = path;

			if (isSafe.current) {
				// enter unsafe zone
				isSafe.current = false;
			} else {
				// is unsafe
				window.location.replace(path);
			}
			const safeDelay = setTimeout(() => {
				// safe
				isSafe.current = true;
			}, 350);

			return () => clearTimeout(safeDelay);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.location.pathname]);
};
