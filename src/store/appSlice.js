import { createSlice } from "@reduxjs/toolkit";

const QUERY = "(prefers-reduced-motion: reduce)";
const mediaQueryList = window.matchMedia(QUERY);
export const prefersReducedMotion = mediaQueryList.matches;

const initialAppState = {
	appWidth: window.innerWidth,
	prefersReducedMotion,
};

const appSlice = createSlice({
	name: "app",
	initialState: initialAppState,
	reducers: {
		updateAppWidth: state => {
			state.appWidth = window.innerWidth;
		},
		updatePrefersReducedMotion: (state, action) => {
			state.prefersReducedMotion = action.payload;
		},
	},
});

export const { updateAppWidth, updatePrefersReducedMotion } = appSlice.actions;
export default appSlice.reducer;
