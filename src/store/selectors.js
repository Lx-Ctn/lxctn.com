export const get = {
	appWidth: state => state.app.appWidth,
	reducedMotion: state => state.app.reducedMotion,
	isIntro: state => state.app.isIntro,
	isMobile: state => state.header.isMobile,
	isMobileMenuOpen: state => state.header.isMobileMenuOpen,
	isParameterMenuOpen: state => state.header.isParameterMenuOpen,
};
