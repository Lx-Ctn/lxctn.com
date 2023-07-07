import { createSlice } from "@reduxjs/toolkit";
import { prefersReducedMotion } from "../utils/handleReducedMotion";

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
