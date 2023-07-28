import css from "./Header.module.scss";
import { LogoLx, GearIcon, BackdropGradientBlur, HamburgerIcon, ParameterMenu, HomeIcon } from "../../components";
import { DelayRender } from "../utils/DelayRender";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { closeMobileMenu, toggleParameterMenu, closeParameterMenu } from "../../store/headerSlice";
import { introEnded } from "../../store/appSlice";
import { get } from "../../store/selectors";
import { NavLink, useNavigate } from "react-router-dom";

//
export const HEADER_MOBILE_BREAKPOINT = 500;

export default function Header() {
	const headerRef = useRef();
	const dispatch = useDispatch();

	const isIntro = useSelector(get.isIntro); // To change animation after the first render
	const isMobile = useSelector(get.isMobile);

	// Handle closeable menus :
	const isMobileMenuOpen = useSelector(get.isMobileMenuOpen);
	const isParameterMenuOpen = useSelector(get.isParameterMenuOpen);

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
	}, [isMobileMenuOpen, isParameterMenuOpen, dispatch]);

	const isAnimating = !useSelector(get.reducedMotion);

	return (
		<motion.header
			ref={headerRef}
			className={`${css._} ${isMobile ? css.mobile : null} ${isIntro ? css.intro : null}`}
		>
			<BackdropGradientBlur blur="12px" color="#fff6" fromEnd="2em" style={{ bottom: "-1.5em" }} />
			<AnimatePresence>{!isMobile && <Nav key="nav" {...{ isIntro, isAnimating }} />}</AnimatePresence>
			<AnimatePresence>
				{isMobile && <Hamburger key="hamburger" {...{ isIntro, isAnimating }} />}
			</AnimatePresence>
			<div className={css.container}>
				<Logo {...{ isIntro, isMobile, isAnimating }} />
				<ParameterButton isAnimating={isAnimating} />
			</div>
			<AnimatePresence>{isMobileMenuOpen && <Nav isMobile isAnimating={isAnimating} />}</AnimatePresence>
			<AnimatePresence>{isParameterMenuOpen && <ParameterMenu />}</AnimatePresence>
		</motion.header>
	);
}

const Hamburger = ({ isIntro, isAnimating }) => (
	<motion.div className={`${css.sideNav} ${css.hamburger}`} {...(isAnimating && hamburgerVariants(isIntro))}>
		<HamburgerIcon />
	</motion.div>
);

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
	return (
		<motion.nav
			className={isMobile ? css.navMobile : ""}
			variants={isAnimating && navVariants(isIntro, isMobile)}
			{...(isAnimating && animPropsNames)}
			onAnimationComplete={() => {
				isIntro && dispatch(introEnded());
			}}
		>
			<div className={css.navContainer}>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="20vw" link="/">
					<HomeIcon />
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="20vw" link="/aboutme">
					Who's Lx ?
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition={0} link="/work">
					Work
				</CustomLink>
				<CustomLink {...{ isIntro, isMobile, isAnimating }} motionPosition="-20vw" link="/contact">
					Contact
				</CustomLink>
			</div>
		</motion.nav>
	);
};

const Logo = ({ isIntro, isMobile, isAnimating }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<motion.div
			className={`${css.sideNav} ${css.logoLx} ${isAnimating ? "" : css.reducedMotion}`}
			onClick={() => navigate("/")}
		>
			{isAnimating ? (
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
			) : (
				<LogoLx color={undefined} />
			)}
		</motion.div>
	);
};

const ParameterButton = ({ isAnimating }) => {
	const dispatch = useDispatch();
	const toggleParam = () => {
		dispatch(toggleParameterMenu());
	};
	return isAnimating ? (
		<motion.div className={`${css.sideNav}`} onClick={toggleParam}>
			<DelayRender delay={SIDE_NAV_DELAY}>
				<GearIcon {...gearVariants} />
			</DelayRender>
		</motion.div>
	) : (
		<div className={`${css.sideNav}`} onClick={toggleParam}>
			<GearIcon />
		</div>
	);
};
