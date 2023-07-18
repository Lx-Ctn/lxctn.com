import css from "./Header.module.scss";
import { LogoLx, GearIcon, BackdropGradientBlur, HamburgerIcon, ParameterMenu } from "../../components";
import { DelayRender } from "../utils/DelayRender";
import { motion, AnimatePresence } from "framer-motion";
import {
	headerVariants,
	logoVariants,
	navVariants,
	hamburgerVariants,
	linkVariants,
	gearVariants,
	SIDE_NAV_DELAY,
	animPropsNames,
} from "./Header.motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { introEnded, closeMobileMenu, toggleParameterMenu, closeParameterMenu } from "../../store/headerSlice";
import { Link } from "react-router-dom";

//
export const HEADER_MOBILE_BREAKPOINT = 500;

export default function Header() {
	const headerRef = useRef();
	const dispatch = useDispatch();

	const isIntro = useSelector(state => state.header.isIntro); // To change animation after the first render
	const isMobile = useSelector(state => state.header.isMobile);

	// Handle closeable menus :
	const isMobileMenuOpen = useSelector(state => state.header.isMobileMenuOpen);
	const isParameterMenuOpen = useSelector(state => state.header.isParameterMenuOpen);

	useEffect(() => {
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
	});

	return (
		<motion.header
			ref={headerRef}
			className={`${css._} ${isMobile && css.mobile} ${isIntro && css.intro}`}
			variants={headerVariants}
			{...animPropsNames}
		>
			<BackdropGradientBlur blur="12px" color="#fff6" fromEnd="2em" style={{ bottom: "-1.5em" }} />
			<AnimatePresence>{!isMobile && <Nav key="nav" isIntro={isIntro} />}</AnimatePresence>
			<AnimatePresence>{isMobile && <Hamburger key="hamburger" isIntro={isIntro} />}</AnimatePresence>
			<div className={css.container}>
				<Logo {...{ isIntro, isMobile }} />
				<ParameterButton />
			</div>
			<AnimatePresence>{isMobileMenuOpen && <Nav isMobile />}</AnimatePresence>
			<AnimatePresence>{isParameterMenuOpen && <ParameterMenu />}</AnimatePresence>
		</motion.header>
	);
}

const Hamburger = ({ isIntro }) => (
	<motion.div className={`${css.sideNav} ${css.hamburger}`} {...hamburgerVariants(isIntro)}>
		<HamburgerIcon />
	</motion.div>
);

const CustomLink = ({ children, motionPosition, link, isIntro, isMobile }) => (
	<motion.div className={css.navLink} custom={motionPosition} variants={linkVariants(isIntro, isMobile)}>
		<Link to={link}>{children}</Link>
	</motion.div>
);

const Nav = ({ isIntro, isMobile }) => {
	const dispatch = useDispatch();

	return (
		<motion.nav
			className={isMobile ? css.navMobile : ""}
			variants={navVariants(isIntro, isMobile)}
			{...animPropsNames}
			onAnimationComplete={() => {
				isIntro && dispatch(introEnded());
			}}
		>
			<div className={css.navContainer}>
				<CustomLink {...{ isIntro, isMobile }} motionPosition="20vw" link="/">
					Who's Lx ?
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile }} motionPosition={0} link="/work">
					Work
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile }} motionPosition="-20vw" link="/contact">
					Contact
				</CustomLink>
			</div>
		</motion.nav>
	);
};

const Logo = ({ isIntro, isMobile }) => {
	const dispatch = useDispatch();
	return (
		<motion.div className={`${css.sideNav} ${css.logoLx}`}>
			<DelayRender delay={SIDE_NAV_DELAY}>
				<motion.div
					{...logoVariants(isIntro, isMobile)}
					onAnimationComplete={() => {
						isIntro && dispatch(introEnded());
					}}
				>
					<LogoLx color={undefined} />
				</motion.div>
			</DelayRender>
		</motion.div>
	);
};

const ParameterButton = () => {
	const dispatch = useDispatch();
	const toggleParam = () => {
		dispatch(toggleParameterMenu());
	};
	return (
		<motion.div className={`${css.sideNav}`}>
			<DelayRender delay={SIDE_NAV_DELAY}>
				<GearIcon {...gearVariants} onClick={toggleParam} />
			</DelayRender>
		</motion.div>
	);
};
