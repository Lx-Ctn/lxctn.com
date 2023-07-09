import css from "./ParameterMenu.module.scss";
import { motion } from "framer-motion";
import { childVariants, paramMenuVariants } from "./ParameterMenu.motion";
import { animPropsNames } from "../Header/Header.motion";
import { Checkbox } from "../Checkbox/Checkbox";

export const ParameterMenu = ({ paramMenuHeight, setParamMenuHeight, ...props }) => {
	return (
		<motion.div className={css._} variants={paramMenuVariants} {...animPropsNames} {...props}>
			<div className={css.wrapper}>
				{[0, 0, 0, 0].map((_, i) => (
					<Checkbox
						key={i}
						variants={childVariants}
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
