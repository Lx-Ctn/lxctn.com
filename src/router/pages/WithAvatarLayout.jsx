import css from "./WithAvatarLayout.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "../../components";

import { useOutlet, useLocation } from "react-router-dom";
import { resetScroll } from "../Router";

import { Fragment } from "react";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

export const WithAvatarLayout = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	const location = useLocation();
	const isContactPage = location.pathname === "/contact";
	const isAboutMePage = location.pathname === "/aboutme";

	return (
		<motion.div
			className={`${css._} ${isContactPage ? css.contact : isAboutMePage ? css.aboutme : ""}`}
			{...(!reducedMotion && withAvatarLayoutAnimation)}
		>
			<div className={`${css.avatar_container} ${reducedMotion ? css.reducedMotion : ""}`}>
				<Avatar />
			</div>
			{/* Outlet to render HomeElement or Contact as sub-route :
				-> to keep Avatar on screen and alow a smooth transition */}
			<Outlet />
		</motion.div>
	);
};

const Outlet = () => {
	const routeElement = useOutlet();
	resetScroll();
	return (
		<AnimatePresence mode="wait">
			<Fragment key={window.location.pathname}>{routeElement}</Fragment>
		</AnimatePresence>
	);
};

const withAvatarLayoutAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
