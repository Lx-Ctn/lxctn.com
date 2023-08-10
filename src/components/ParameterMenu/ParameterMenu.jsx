import css from "./ParameterMenu.module.scss";
import { motion } from "framer-motion";
import { childVariants, paramMenuVariants } from "./ParameterMenu.motion";
import { animPropsNames } from "../Header/Header.motion";
import { Checkbox } from "../Checkbox/Checkbox";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

export const ParameterMenu = ({ ...props }) => {
	const reducedMotion = useSelector(get.reducedMotion);
	const isMobile = useSelector(get.isMobile);
	return (
		<motion.div
			className={`${css._} ${isMobile ? css.mobile : ""}`}
			variants={!reducedMotion && paramMenuVariants}
			{...animPropsNames}
			{...props}
		>
			<div className={css.wrapper}>
				{[0, 0, 0, 0].map((_, i) => (
					<Checkbox
						key={i}
						variants={!reducedMotion && childVariants}
						label="Thème"
						description="Permuter entre le mode sombre ou clair"
						on="clair"
						off="sombre"
					/>
				))}
			</div>
		</motion.div>
	);
};
