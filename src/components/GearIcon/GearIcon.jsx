import css from "./GearIcon.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

const GearIcon = props => {
	const isOpen = useSelector(get.isParameterMenuOpen);

	return (
		<motion.div className={`${css._} ${isOpen ? css.open : ""}`} {...props}>
			<svg width="100%" viewBox="0 0 200 200">
				<path
					d="m177.38,92.01
					c-.18-1.65-.42-3.3-.71-4.92-.31-1.76-.69-3.53-1.12-5.28-.65-2.6-2.8-4.56-5.45-4.92l-9.55-1.29c-2.25-5.48-5.23-10.58-8.82-15.19l3.69-8.99c1.02-2.49.4-5.34-1.54-7.19-1.2-1.15-2.44-2.25-3.71-3.32-1.37-1.15-2.79-2.26-4.25-3.32-2.17-1.58-5.07-1.69-7.34-.26l-8.25,5.21c-5.1-2.67-10.6-4.68-16.39-5.92l-2.99-9.37c-.82-2.56-3.12-4.35-5.81-4.52-1.66-.11-3.32-.16-4.97-.16-1.79,0-3.59.06-5.39.19-2.67.18-4.97,1.96-5.79,4.52l-3.01,9.44c-5.71,1.27-11.14,3.28-16.18,5.93l-8.44-5.34
					c-2.27-1.44-5.19-1.32-7.35.27-1.34.99-2.64,2.01-3.91,3.07-1.37,1.15-2.71,2.36-4.01,3.61-1.93,1.86-2.55,4.7-1.53,7.18l3.81,9.3c-3.46,4.51-6.34,9.48-8.54,14.8l-10,1.35c-2.66.36-4.83,2.32-5.46,4.93-.39,1.61-.73,3.24-1.02,4.87-.31,1.76-.56,3.55-.75,5.34-.28,2.67,1.07,5.24,3.44,6.49l8.94,4.69c.25,5.83,1.25,11.47,2.93,16.81l-6.79,7.46c-1.81,1.99-2.21,4.88-1.01,7.29.74,1.49,1.52,2.95,2.35,4.38.9,1.55,1.85,3.08,2.86,4.58,1.5,2.22,4.19,3.33,6.81,2.75l9.8-2.14c3.86,4.23,8.27,7.94,13.12,11.04l-.4,10.01
					c-.11,2.69,1.45,5.16,3.91,6.23,1.52.67,3.06,1.28,4.62,1.85,1.68.61,3.4,1.17,5.13,1.67,2.58.74,5.35-.14,6.99-2.27l6.05-7.83c2.89.39,5.84.61,8.84.61s5.7-.21,8.48-.57l6.03,7.81c1.64,2.13,4.42,3.02,7,2.26,1.59-.47,3.17-.99,4.73-1.55,1.68-.61,3.36-1.29,5-2.02,2.45-1.09,4-3.55,3.89-6.23l-.39-9.74c4.97-3.13,9.49-6.9,13.43-11.22l9.5,2.07c2.63.57,5.33-.53,6.82-2.77.92-1.38,1.8-2.8,2.62-4.23.9-1.55,1.74-3.14,2.53-4.76,1.18-2.41.79-5.29-1.02-7.27l-6.48-7.12c1.76-5.5,2.81-11.31,3.05-17.33l8.56-4.49c2.38-1.25,3.74-3.83,3.44-6.5Z
					m-77.2,54.19c-25.29,0-45.8-20.5-45.8-45.8s20.5-45.8,45.8-45.8,45.8,20.5,45.8,45.8-20.5,45.8-45.8,45.8Z"
				/>
				<path
					className={css.closeButton}
					d="m168.25,53.16H31.75c-5.38,0-9.75-4.37-9.75-9.75s4.37-9.75,9.75-9.75h136.5c5.38,0,9.75,4.37,9.75,9.75s-4.37,9.75-9.75,9.75Z"
				/>
				<path
					className={css.closeButton}
					d="m168.25,166.34H31.75c-5.38,0-9.75-4.37-9.75-9.75s4.37-9.75,9.75-9.75h136.5c5.38,0,9.75,4.37,9.75,9.75s-4.37,9.75-9.75,9.75Z"
				/>
			</svg>
		</motion.div>
	);
};

export default GearIcon;
