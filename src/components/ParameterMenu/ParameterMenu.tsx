import css from "./ParameterMenu.module.scss";
import { motion } from "framer-motion";
import { childVariants, paramMenuVariants } from "./ParameterMenu.motion";
import { animPropsNames } from "../../utils/animation";
import { Checkbox, MultiStateToggle, Light, System, Dark } from "components";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { useSetPreferedTheme } from "utils/handleTheme";

export const ParameterMenu = ({ ...props }) => {
	const reducedMotion = useSelector(get.reducedMotion);
	const isMobile = useSelector(get.isMobile);

	const themeOnchange = useSetPreferedTheme();
	const themeDefaultValue = useSelector(get.preferedTheme);

	return (
		<motion.div
			className={`${css._} ${isMobile ? css.mobile : ""}`}
			variants={!reducedMotion && paramMenuVariants}
			{...animPropsNames}
			{...props}
		>
			<div className={css.wrapper}>
				{[0, 0, 0].map((_, i) => (
					<Checkbox
						key={i}
						variants={!reducedMotion && childVariants}
						label="Theme"
						description="Choose the theme : Light or dark."
						on="light"
						off="dark"
					/>
				))}
				<MultiStateToggle
					variants={!reducedMotion && childVariants}
					title="Theme"
					description="Choose the theme : Light, dark, or system default (will follow your device setting)."
					values={[
						{ value: "light", icon: <Light />, label: "light" },
						{ value: "system", icon: <System />, label: "system" },
						{ value: "dark", icon: <Dark />, label: "dark" },
					]}
					defaultValue={themeDefaultValue}
					onChange={themeOnchange}
				/>
			</div>
		</motion.div>
	);
};
