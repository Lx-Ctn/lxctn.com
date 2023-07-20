import { createSlice } from "@reduxjs/toolkit";
import { HEADER_MOBILE_BREAKPOINT } from "../components/Header/Header";
import { prefersReducedMotion } from "./appSlice";

const initialHeaderState = {
	isIntro: !prefersReducedMotion,
	isMobile: window.innerWidth < HEADER_MOBILE_BREAKPOINT,
	isMobileMenuOpen: false,
	isParameterMenuOpen: false,
};

const headerSlice = createSlice({
	name: "header",
	initialState: initialHeaderState,
	reducers: {
		introEnded: state => {
			state.isIntro = false;
		},
		setHeaderMobile: state => {
			if (window.innerWidth < HEADER_MOBILE_BREAKPOINT) {
				state.isMobile = true;
			} else {
				state.isMobile = false;
				state.isMobileMenuOpen = false;
			}
		},
		toggleMobileMenu: state => {
			state.isMobileMenuOpen = !state.isMobileMenuOpen;
		},
		closeMobileMenu: state => {
			state.isMobileMenuOpen = false;
		},
		toggleParameterMenu: state => {
			state.isParameterMenuOpen = !state.isParameterMenuOpen;
		},
		closeParameterMenu: state => {
			state.isParameterMenuOpen = false;
		},
	},
});
export const {
	introEnded,
	setHeaderMobile,
	toggleMobileMenu,
	closeMobileMenu,
	toggleParameterMenu,
	closeParameterMenu,
} = headerSlice.actions;
export default headerSlice.reducer;
