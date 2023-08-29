import css from "./Footer.module.scss";
import { ShowTheme } from "../../utils/colorTheme";
import { motion, AnimatePresence } from "framer-motion";
import { animPropsNames } from "../../utils/animation";

import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

import LogoLx from "../LogoLx/LogoLx";
import { useLocation, useNavigate } from "react-router-dom";

// If some page are full screen, it's better to cancel footer animation as it's stay displayed.
const FULL_SCREEN_PAGES = ["/contact"];

export const Footer = () => {
	//consoleSignature();

	const isIntro = useSelector(get.isIntro);
	const reducedMotion = useSelector(get.reducedMotion);

	const pathname = useLocation().pathname;
	const animatedPathname = FULL_SCREEN_PAGES.includes(pathname) ? "sameKey=noTransition" : pathname;
	const navigate = useNavigate();

	const thisYear = new Date().getFullYear();

	return (
		<AnimatePresence mode="wait">
			<motion.footer
				layout
				key={animatedPathname}
				className={css._}
				variants={!reducedMotion && footerAnimation(isIntro)}
				{...animPropsNames}
			>
				<button aria-label="Logo Lx : Home button" className={css.sideNav} onClick={() => navigate("/")}>
					<div className={css.logoLx}>
						<LogoLx />
					</div>
				</button>
				<p className={css.copyright}>Lx Design © {thisYear}. All rights reserved.</p>
			</motion.footer>
		</AnimatePresence>
	);
};

const footerAnimation = isIntro => ({
	initial: { opacity: 0, y: "100%" },
	animate: { opacity: 1, y: 0, transition: { type: "spring", delay: isIntro ? 1.4 : 0 } },
	exit: { opacity: 0, y: "100%" },
});

const consoleSignature = () =>
	console.log(
		`%c
 _
|L\\
|L(      __  __
|L|      \\x\\/x/
|L|___/\\  }xx{
(LLLLLL/ /x/\\x\\
 _____            _
(  __ \\          (_)
| (  \\ \\ ___  ___ _  __ _ _ __
| |   } / _ \\/ __| |/ _, | '_ \\
| (__/ |  __/\\__ \\ | (_| | | | |
(_____/ \\___||___/_|\\__, |_| |_|
                  __/ |
                 |___/

                ..
  .          ▄▪▪·
  ▐   .   ▄▄█▀▀
  ▐   ▐▄██▀
  █  ▄███•
  █.██▀ •█▌
 ▐█▐█▌•   ██
.▐██▌      ██▌
`,
		"background: #212121; color: #00b2d1;"
	);
