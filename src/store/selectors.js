export const get = {
	appWidth: state => state.app.appWidth,
	reducedMotion: state => state.app.reducedMotion,
	isLoaded: state => state.app.isLoaded,
	isIntro: state => state.app.isIntro,
	isMobile: state => state.header.isMobile,
	isMobileMenuOpen: state => state.header.isMobileMenuOpen,
	isParameterMenuOpen: state => state.header.isParameterMenuOpen,
};
