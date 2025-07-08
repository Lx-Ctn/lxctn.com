import css from "./ParameterMenu.module.scss";
import { motion } from "framer-motion";
import { childVariants, paramMenuVariants } from "./ParameterMenu.motion";
import { animPropsNames } from "../../utils/animation";
import { MultiStateToggle, Light, System, Dark, LogoLx, ReducedMotionIcon } from "components";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { useSetPreferedTheme } from "utils/handleTheme";
import { useSetPreferedReducedMotion } from "utils/handleReducedMotion";

export const ParameterMenu = ({ ...props }) => {
	const reducedMotion = useSelector(get.reducedMotion);
	const isMobile = useSelector(get.isMobile);

	const themeOnchange = useSetPreferedTheme();
	const themeDefaultValue = useSelector(get.preferedTheme);

	const reducedMotionOnChange = useSetPreferedReducedMotion();
	const reducedMotionDefaultValue = useSelector(get.preferedReducedMotion);

	return (
		<motion.div
			className={`${css._} ${isMobile ? css.mobile : ""}`}
			variants={!reducedMotion && paramMenuVariants}
			{...animPropsNames}
			animate={reducedMotion ? false : "animate"}
			{...props}
		>
			<div className={css.wrapper}>
				<MultiStateToggle
					variants={!reducedMotion && childVariants}
					{...animPropsNames}
					animate={reducedMotion ? false : "animate"}
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
				<MultiStateToggle
					variants={!reducedMotion && childVariants}
					{...animPropsNames}
					animate={reducedMotion ? false : "animate"}
					title="Reduced motion"
					description="When on, disables non-essential animations for a more comfortable experience, especially for users with motion sensitivity."
					values={[
						{ value: "on", icon: (<LogoLx color={true} />) as React.ReactNode, label: "on" },
						{ value: "system", icon: <ReducedMotionIcon />, label: "system" },
						{ value: "off", icon: (<LogoLx color={false} />) as React.ReactNode, label: "off" },
					]}
					defaultValue={reducedMotionDefaultValue}
					onChange={reducedMotionOnChange}
				/>
			</div>
		</motion.div>
	);
};
