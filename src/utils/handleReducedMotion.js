import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { updatePrefersReducedMotion } from "../store/appSlice";
import { introEnded } from "../store/headerSlice";

const QUERY = "(prefers-reduced-motion: reduce)";
const mediaQueryList = window.matchMedia(QUERY);

export const usePrefersReducedMotion = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const updateReducedMotion = () => {
			const prefersReducedMotion = mediaQueryList.matches;
			dispatch(updatePrefersReducedMotion(prefersReducedMotion));
			prefersReducedMotion && dispatch(introEnded);
		};
		mediaQueryList.addEventListener("change", updateReducedMotion);
		return () => mediaQueryList.removeEventListener("change", updateReducedMotion);
	}, [dispatch]);
};
