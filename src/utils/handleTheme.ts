import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "store";
import { updateCurrentTheme, updatePreferedTheme } from "../store/appSlice";
import { get } from "store/selectors";

type PreferedTheme = "light" | "dark" | "system";
type CurrentTheme = "light" | "dark";

const DEFAULT_PREFERED_THEME = "system";
const LOCAL_STORAGE_KEY = "preferedTheme";

function getPreferedTheme(): PreferedTheme {
	const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") return storedTheme;
	return DEFAULT_PREFERED_THEME;
}
export const preferedTheme = getPreferedTheme();

const QUERY = "(prefers-color-scheme: dark)";
const mediaQueryList = window.matchMedia(QUERY);

function getCurrentTheme(preferedTheme: PreferedTheme): CurrentTheme {
	if (preferedTheme === "system") return mediaQueryList.matches ? "dark" : "light";
	return preferedTheme;
}
export const currentTheme = getCurrentTheme(preferedTheme);

export const usePrefersColorScheme = () => {
	const dispatch = useTypedDispatch();
	const preferedTheme = useSelector(get.preferedTheme);
	const currentTheme = useSelector(get.currentTheme);

	useEffect(() => {
		setCurrentTheme(currentTheme);
	}, [currentTheme]);

	useEffect(() => {
		if (preferedTheme === "system") {
			const updatePrefersColorScheme = () => {
				const prefersColorScheme = mediaQueryList.matches ? "dark" : "light";
				dispatch(updateCurrentTheme(prefersColorScheme));
			};
			mediaQueryList.addEventListener("change", updatePrefersColorScheme);
			return () => mediaQueryList.removeEventListener("change", updatePrefersColorScheme);
		}
	}, [dispatch, preferedTheme]);
};

export function useSetPreferedTheme() {
	const dispatch = useTypedDispatch();
	return (theme: PreferedTheme) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, theme);
		const currentTheme = getCurrentTheme(theme);
		dispatch(updateCurrentTheme(currentTheme));
		dispatch(updatePreferedTheme(theme));
	};
}

function setCurrentTheme(theme: CurrentTheme) {
	theme === "light" && document.documentElement.classList.remove("dark");
	theme === "dark" && document.documentElement.classList.add("dark");
}
