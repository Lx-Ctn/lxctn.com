import css from "./ParameterMenu.module.scss";
import { motion } from "framer-motion";
import { childVariants, paramMenuVariants } from "./ParameterMenu.motion";
import { animPropsNames } from "../Header/Header.motion";
import { Checkbox } from "../Checkbox/Checkbox";
import { useEffect, useRef } from "react";

export const ParameterMenu = ({ paramMenuHeight, setParamMenuHeight, ...props }) => {
	const ref = useRef();
	useEffect(() => {
		console.log("menu : ", ref.current.clientHeight);
		setParamMenuHeight(ref.current.clientHeight);
	}, [setParamMenuHeight]);

	return (
		<motion.div
			ref={ref}
			className={css._}
			variants={paramMenuVariants(paramMenuHeight)}
			{...animPropsNames}
			{...props}
		>
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
		</motion.div>
	);
};
