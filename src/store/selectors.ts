import type { RootState } from "store";
export const get = {
	appWidth: (state: RootState) => state.app.appWidth,
	reducedMotion: (state: RootState) => state.app.reducedMotion,
	isLoaded: (state: RootState) => state.app.isLoaded,
	isIntro: (state: RootState) => state.app.isIntro,
	currentTheme: (state: RootState) => state.app.currentTheme,
	preferedTheme: (state: RootState) => state.app.preferedTheme,
	isMobile: (state: RootState) => state.header.isMobile,
	isMobileMenuOpen: (state: RootState) => state.header.isMobileMenuOpen,
	isParameterMenuOpen: (state: RootState) => state.header.isParameterMenuOpen,
};
