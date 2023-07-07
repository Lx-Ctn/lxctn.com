import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { updatePrefersReducedMotion } from "../store/appSlice";

const QUERY = "(prefers-reduced-motion: reduce)";
const mediaQueryList = window.matchMedia(QUERY);

export const prefersReducedMotion = mediaQueryList.matches;

export const usePrefersReducedMotion = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const updateReducedMotion = () => {
			dispatch(updatePrefersReducedMotion(mediaQueryList.matches));
		};
		mediaQueryList.addEventListener("change", updateReducedMotion);
		return () => mediaQueryList.removeEventListener("change", updateReducedMotion);
	}, [dispatch]);

	const prefersReducedMotion = useSelector(state => state.app.prefersReducedMotion);
	return prefersReducedMotion;
};
