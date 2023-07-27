import { motion } from "framer-motion";
import css from "./HamburgerIcon.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../../store/headerSlice";
import { get } from "../../store/selectors";

export const HamburgerIcon = props => {
	const dispatch = useDispatch();
	const isOpen = useSelector(get.isMobileMenuOpen);
	const handleClick = () => {
		dispatch(toggleMobileMenu());
	};

	return (
		<motion.div className={`${css._} ${isOpen ? css.open : ""}`} onClick={handleClick} {...props}>
			<svg width="100%" viewBox="0 0 200 200">
				<path d="m168.25,53.16H31.75c-5.38,0-9.75-4.37-9.75-9.75s4.37-9.75,9.75-9.75h136.5c5.38,0,9.75,4.37,9.75,9.75s-4.37,9.75-9.75,9.75Z" />
				<path d="m168.25,109.75H31.75c-5.38,0-9.75-4.37-9.75-9.75s4.37-9.75,9.75-9.75h136.5c5.38,0,9.75,4.37,9.75,9.75s-4.37,9.75-9.75,9.75Z" />
				<path d="m168.25,166.34H31.75c-5.38,0-9.75-4.37-9.75-9.75s4.37-9.75,9.75-9.75h136.5c5.38,0,9.75,4.37,9.75,9.75s-4.37,9.75-9.75,9.75Z" />
			</svg>
		</motion.div>
	);
};
