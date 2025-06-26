import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducedMotion } from "../utils/handleReducedMotion";
import { currentTheme, preferedTheme } from "../utils/handleTheme";

const initialAppState = {
	isLoaded: false,
	isIntro: !reducedMotion,
	appWidth: window.innerWidth,
	reducedMotion,
	currentTheme,
	preferedTheme,
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
		updateReducedMotion: (state, action: PayloadAction<boolean>) => {
			state.reducedMotion = action.payload;
		},
		updateCurrentTheme: (state, action: PayloadAction<typeof currentTheme>) => {
			state.currentTheme = action.payload;
		},
		updatePreferedTheme: (state, action: PayloadAction<typeof preferedTheme>) => {
			state.preferedTheme = action.payload;
		},
	},
});

export const {
	loadingCompleted,
	introEnded,
	updateAppWidth,
	updateReducedMotion,
	updateCurrentTheme,
	updatePreferedTheme,
} = appSlice.actions;
export default appSlice.reducer;
