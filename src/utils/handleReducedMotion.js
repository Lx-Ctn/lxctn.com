import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { updateReducedMotion } from "../store/appSlice";
import { introEnded } from "../store/appSlice";

const QUERY = "(prefers-reduced-motion: reduce)";
const mediaQueryList = window.matchMedia(QUERY);
export const reducedMotion = mediaQueryList.matches;

export const usePrefersReducedMotion = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const updatePrefersReducedMotion = () => {
			const prefersReducedMotion = mediaQueryList.matches;
			dispatch(updateReducedMotion(prefersReducedMotion));
			prefersReducedMotion && dispatch(introEnded);
		};
		mediaQueryList.addEventListener("change", updatePrefersReducedMotion);
		return () => mediaQueryList.removeEventListener("change", updatePrefersReducedMotion);
	}, [dispatch]);
};
