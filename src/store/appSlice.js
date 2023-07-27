import { createSlice } from "@reduxjs/toolkit";
import { reducedMotion } from "../utils/handleReducedMotion";

const initialAppState = {
	appWidth: window.innerWidth,
	reducedMotion,
	isIntro: !reducedMotion,
};

const appSlice = createSlice({
	name: "app",
	initialState: initialAppState,
	reducers: {
		updateAppWidth: state => {
			state.appWidth = window.innerWidth;
		},
		updateReducedMotion: (state, action) => {
			state.reducedMotion = action.payload;
		},
		introEnded: state => {
			state.isIntro = false;
		},
	},
});

export const { updateAppWidth, updateReducedMotion, introEnded } = appSlice.actions;
export default appSlice.reducer;
