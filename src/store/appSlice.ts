import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentReducedMotion, preferedReducedMotion } from "../utils/handleReducedMotion";
import { currentTheme, preferedTheme } from "../utils/handleTheme";

const initialAppState = {
	isLoaded: false,
	isIntro: !currentReducedMotion,
	appWidth: window.innerWidth,
	currentReducedMotion,
	preferedReducedMotion,
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
		updateCurrentReducedMotion: (state, action: PayloadAction<boolean>) => {
			state.currentReducedMotion = action.payload;
		},
		updatePreferedReducedMotion: (state, action: PayloadAction<typeof preferedReducedMotion>) => {
			state.preferedReducedMotion = action.payload;
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
	updateCurrentReducedMotion,
	updatePreferedReducedMotion,
	updateCurrentTheme,
	updatePreferedTheme,
} = appSlice.actions;
export default appSlice.reducer;
