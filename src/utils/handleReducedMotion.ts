import { useEffect } from "react";
import { updateCurrentReducedMotion, updatePreferedReducedMotion, introEnded } from "../store/appSlice";
import { useTypedDispatch } from "store";
import { useSelector } from "react-redux";
import { get } from "store/selectors";

type PreferedReducedMotion = "on" | "system" | "off";

const DEFAULT_PREFERED_REDUCED_MOTION = "system";
const LOCAL_STORAGE_KEY = "preferedReducedMotion";

function getPreferedReducedMotion(): PreferedReducedMotion {
	const storedReducedMotion = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (storedReducedMotion === "on" || storedReducedMotion === "off" || storedReducedMotion === "system")
		return storedReducedMotion;
	return DEFAULT_PREFERED_REDUCED_MOTION;
}
export const preferedReducedMotion = getPreferedReducedMotion();

const QUERY = "(prefers-reduced-motion: reduce)";
const mediaQueryList = window.matchMedia(QUERY);

function getCurrentReducedMotion(preferedReducedMotion: PreferedReducedMotion): boolean {
	if (preferedReducedMotion === "system") return mediaQueryList.matches;
	return preferedReducedMotion === "on";
}
export const currentReducedMotion = getCurrentReducedMotion(preferedReducedMotion);

export const usePrefersReducedMotion = () => {
	const dispatch = useTypedDispatch();
	const preferedReducedMotion = useSelector(get.preferedReducedMotion);

	useEffect(() => {
		if (preferedReducedMotion === "system") {
			const updatePrefersReducedMotion = () => {
				const prefersReducedMotion = mediaQueryList.matches;
				dispatch(updateCurrentReducedMotion(prefersReducedMotion));
				prefersReducedMotion && dispatch(introEnded);
			};
			mediaQueryList.addEventListener("change", updatePrefersReducedMotion);
			return () => mediaQueryList.removeEventListener("change", updatePrefersReducedMotion);
		}
	}, [dispatch, preferedReducedMotion]);
};

export function useSetPreferedReducedMotion() {
	const dispatch = useTypedDispatch();
	return (preferedReducedMotion: PreferedReducedMotion) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, preferedReducedMotion);
		const currentTheme = getCurrentReducedMotion(preferedReducedMotion);
		dispatch(updateCurrentReducedMotion(currentTheme));
		dispatch(updatePreferedReducedMotion(preferedReducedMotion));
	};
}
