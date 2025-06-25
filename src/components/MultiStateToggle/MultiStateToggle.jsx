import css from "./MultiStateToggle.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const defaultValues = [
	{ value: "on", icon: "✅", label: "On" },
	{ value: "auto", icon: "❓", label: "Auto" },
	{ value: "off", icon: "❌", label: "Off" },
];

export const MultiStateToggle = ({ title, description, values = defaultValues, defaultValue, ...props }) => {
	const [currentValue, setCurrentValue] = useState(values.find(({ value }) => value === defaultValue) || "auto");

	const nbOfValues = values.length;
	const currentValueIndex = values.findIndex(({ value }) => value === currentValue.value);

	const handleClick = e => {
		setCurrentValue(values.find(({ value }) => value === e.target.value));
	};

	return (
		<motion.fieldset className={css._} {...props}>
			<div className={css.currentIcon}>{currentValue.icon || currentValue.label}</div>
			<div className={css.content}>
				<div className={css.contentHeader}>
					<div className={css.toggle} style={{ "--nb-of-values": nbOfValues }}>
						{values.map(({ value, icon, label }) => (
							<label key={value}>
								<motion.input
									type="radio"
									name={title}
									value={value}
									checked={value === currentValue.value}
									onChange={handleClick}
								/>
								{icon || label}
							</label>
						))}
						<div className={css.currentValue} style={{ translate: `calc(100% * ${currentValueIndex})` }}>
							{values.map(({ value, icon, label }) => (
								<div key={value} className={value === currentValue.value ? css.active : null}>
									{icon || label}
								</div>
							))}
						</div>
					</div>

					<legend>{`${title ?? ""} (${currentValue.label})`}</legend>
				</div>
				{description && <p>{description}</p>}
			</div>
		</motion.fieldset>
	);
};
