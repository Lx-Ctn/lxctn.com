import css from "./Checkbox.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import LogoLx from "../LogoLx/LogoLx";

export const Checkbox = ({ description, label, on = "On", off = "Off", ...props }) => {
	const [isChecked, setIsCheck] = useState(false);
	const handleClick = () => {
		setIsCheck(isChecked => !isChecked);
	};

	return (
		<motion.label className={css._} {...props}>
			<LogoLx className={css.logo} color={isChecked} />
			<div className={css.content}>
				<div className={css.contentHeader}>
					<motion.input type="checkbox" checked={isChecked} onChange={handleClick} />
					<span>{`${label ?? ""} (${isChecked ? on : off})`}</span>
				</div>
				{description && <p>{description}</p>}
			</div>
		</motion.label>
	);
};
