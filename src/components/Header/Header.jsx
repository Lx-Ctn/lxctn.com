import css from "./Header.module.scss";
import { LogoLx, GearIcon, BackdropGradientBlur, HamburgerIcon, ParameterMenu } from "../../components";
import { motion, AnimatePresence } from "framer-motion";
import {
	headerVariants,
	logoVariants,
	navVariants,
	hamburgerVariants,
	linkVariants,
	gearVariants,
	animPropsNames,
} from "./Header.motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleMobileMenu,
	closeMobileMenu,
	toggleParameterMenu,
	closeParameterMenu,
} from "../../store/headerSlice";
import { introEnded } from "../../store/appSlice";
import { get } from "../../store/selectors";
import { NavLink, useNavigate } from "react-router-dom";

//
export const HEADER_MOBILE_BREAKPOINT = 500;
export const HEADER_MOBILE_NAV_HIGHT = `${4 * 2.1 * 1.5}rem`; // link : 1em (font-size) * 1.3 (line-height) + 2 * 0.3em (padding) + 0.2em (visual margin for better lisibility) = 2.1em * 4 links

export default function Header() {
	const headerRef = useRef();
	const dispatch = useDispatch();

	const isIntro = useSelector(get.isIntro); // To change animation after the first render
	const isMobile = useSelector(get.isMobile);

	const isAnimating = !useSelector(get.reducedMotion);

	const isMobileMenuOpen = useSelector(get.isMobileMenuOpen);
	const isParameterMenuOpen = useSelector(get.isParameterMenuOpen);

	useEffect(() => {
		// close menus when we click outsite of it :

		const isOutsiteHeader = ({ target }) => !headerRef.current.contains(target);
		const handleCloseOutside = {
			nav: event => isOutsiteHeader(event) && dispatch(closeMobileMenu()),
			param: event => isOutsiteHeader(event) && dispatch(closeParameterMenu()),
		};
		isMobileMenuOpen && window.addEventListener("click", handleCloseOutside.nav);
		isParameterMenuOpen && window.addEventListener("click", handleCloseOutside.param);
		return () => {
			window.removeEventListener("click", handleCloseOutside.nav);
			window.removeEventListener("click", handleCloseOutside.param);
		};
	}, [isMobileMenuOpen, isParameterMenuOpen, dispatch]);

	//
	useEffect(() => {
		// Keep content in view when mobile nav is open to see where we go instead of covering it :

		isMobileMenuOpen && document.body.style.setProperty("--header-mobile-nav-height", HEADER_MOBILE_NAV_HIGHT);
		return () => document.body.style.setProperty("--header-mobile-nav-height", "0em");
	}, [isMobileMenuOpen, dispatch]);

	return (
		<motion.header
			ref={headerRef}
			className={`${css._} ${isMobile ? css.mobile : null} ${isIntro ? css.intro : null}`}
			variants={headerVariants}
			{...animPropsNames}
		>
			<BackdropGradientBlur blur="12px" color="#fff6" fromEnd="2em" style={{ bottom: "-1.5em" }} />
			<AnimatePresence>
				{isMobile ? (
					<Hamburger key="hamburger" {...{ isIntro, isAnimating, isMobileMenuOpen, isParameterMenuOpen }} />
				) : (
					<Nav key="nav" {...{ isIntro, isAnimating }} />
				)}
			</AnimatePresence>
			<div className={css.container}>
				<Logo {...{ isIntro, isMobile, isAnimating }} />
				<ParameterButton isAnimating={isAnimating} />
			</div>
			<AnimatePresence>{isMobileMenuOpen && <Nav isMobile {...{ isAnimating }} />}</AnimatePresence>
			<AnimatePresence>{isParameterMenuOpen && <ParameterMenu />}</AnimatePresence>
		</motion.header>
	);
}

const Hamburger = ({ isIntro, isAnimating, isMobileMenuOpen, isParameterMenuOpen }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		if (isParameterMenuOpen && !isMobileMenuOpen) {
			dispatch(closeParameterMenu());
			setTimeout(() => dispatch(toggleMobileMenu()), 250);
		} else dispatch(toggleMobileMenu());
	};
	return (
		<motion.div
			className={`${css.sideNav} ${css.hamburger}`}
			onClick={handleClick}
			variants={isAnimating && hamburgerVariants(isIntro)}
			{...animPropsNames}
		>
			<HamburgerIcon />
		</motion.div>
	);
};

const CustomLink = ({ children, motionPosition, link, isIntro, isMobile, isAnimating }) => (
	<motion.div
		key={isAnimating} // need to force rerender : a bug in framer-motion keep last initial state when isAnimating prop change
		className={css.navLink}
		custom={motionPosition}
		variants={isAnimating && linkVariants(isIntro, isMobile)}
	>
		<NavLink className={({ isActive }) => (isActive ? css.active : null)} to={link}>
			{children}
		</NavLink>
	</motion.div>
);

const Nav = ({ isIntro, isMobile, isAnimating }) => {
	const dispatch = useDispatch();
	const endIntro = isIntro && (() => dispatch(introEnded()));

	return (
		<motion.nav
			className={isMobile ? css.navMobile : ""}
			variants={isAnimating && navVariants(isIntro, isMobile)}
			{...animPropsNames}
			onAnimationComplete={endIntro}
		>
			<div className={css.navContainer}>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="25vw" link="/">
					Hi !
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="10vw" link="/aboutme">
					Lx ?
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="-10vw" link="/work">
					Work
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="-25vw" link="/contact">
					Contact
				</CustomLink>
			</div>
		</motion.nav>
	);
};

const Logo = ({ isIntro, isMobile, isAnimating }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const endIntro = isIntro && isMobile && (() => dispatch(introEnded()));

	return (
		<motion.div
			className={`${css.sideNav} ${css.logoLx} ${isAnimating ? "" : css.reducedMotion}`}
			onClick={() => navigate("/")}
		>
			{isAnimating ? (
				<motion.div variants={logoVariants(isIntro, isMobile)} onAnimationComplete={endIntro}>
					<LogoLx color={undefined} />
				</motion.div>
			) : (
				<LogoLx color={undefined} />
			)}
		</motion.div>
	);
};

const ParameterButton = ({ isAnimating }) => {
	const dispatch = useDispatch();
	const toggleParam = () => dispatch(toggleParameterMenu());

	return (
		<motion.div className={`${css.sideNav}`} onClick={toggleParam}>
			<GearIcon variants={isAnimating && gearVariants} />
		</motion.div>
	);
};
