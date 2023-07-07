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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { introEnded, closeMobileMenu, toggleParameterMenu, closeParameterMenu } from "../../store/headerSlice";

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

	// Get Parameter menu height before display to animate it's arrival :
	const [paramMenuHeight, setParamMenuHeight] = useState(null);
	!isParameterMenuOpen && paramMenuHeight && setParamMenuHeight(null);
	console.log("Header :", paramMenuHeight);

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
			<AnimatePresence>
				{isParameterMenuOpen && (
					<ParameterMenu paramMenuHeight={paramMenuHeight} setParamMenuHeight={setParamMenuHeight} />
				)}
			</AnimatePresence>
		</motion.header>
	);
}

const Hamburger = ({ isIntro }) => (
	<motion.div className={`${css.sideNav} ${css.hamburger}`} {...hamburgerVariants(isIntro)}>
		<HamburgerIcon />
	</motion.div>
);

const Link = ({ children, motionPosition, link, isIntro, isMobile }) => (
	<motion.a
		className="nav-link"
		custom={motionPosition}
		variants={linkVariants(isIntro, isMobile)}
		href={link}
		target="_blank"
		rel="noopener noreferrer"
	>
		{children}
	</motion.a>
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
				<Link {...{ isIntro, isMobile }} motionPosition="20vw" link="https://lxctn.com/">
					Who's Lx ?
				</Link>
				<Link {...{ isIntro, isMobile }} motionPosition={0} link="https://lxctn.com/work">
					Work
				</Link>
				<Link {...{ isIntro, isMobile }} motionPosition="-20vw" link="https://lxctn.com/contact">
					Contact
				</Link>
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
