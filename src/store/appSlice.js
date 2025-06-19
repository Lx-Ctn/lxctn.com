import { createSlice } from "@reduxjs/toolkit";
import { reducedMotion } from "../utils/handleReducedMotion";

const initialAppState = {
	isLoaded: false,
	isIntro: !reducedMotion,
	appWidth: window.innerWidth,
	reducedMotion,
};

const appSlice = createSlice({
	name: "app",
	initialState: initialAppState,
	reducers: {
		loadingCompleted: state => {
			state.isLoaded = true;
		},
		introEnded: state => {
			state.isIntro = false;
		},
		updateAppWidth: state => {
			state.appWidth = window.innerWidth;
		},
		updateReducedMotion: (state, action) => {
			state.reducedMotion = action.payload;
		},
	},
});

export const { loadingCompleted, introEnded, updateAppWidth, updateReducedMotion } = appSlice.actions;
export default appSlice.reducer;
