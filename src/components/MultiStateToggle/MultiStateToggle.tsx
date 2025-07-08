import css from "./MultiStateToggle.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

type MultiStateToggleValue = {
	value: string;
	icon?: React.ReactNode | string;
	label: string;
};

const defaultValues: MultiStateToggleValue[] = [
	{ value: "on", icon: "✅", label: "On" },
	{ value: "auto", icon: "❓", label: "Auto" },
	{ value: "off", icon: "❌", label: "Off" },
];

export const MultiStateToggle = ({
	title,
	description,
	values = defaultValues,
	defaultValue,
	onChange,
	...props
}) => {
	const [currentValue, setCurrentValue] = useState(
		values.find(({ value }) => value === defaultValue) || defaultValues[1]
	);

	const nbOfValues = values.length;
	const currentValueIndex = values.findIndex(({ value }) => value === currentValue.value);

	const handleClick = e => {
		setCurrentValue(values.find(({ value }) => value === e.target.value));
		onChange(e.target.value);
	};

	const transparentBackground = { backgroundColor: "hsl(from var(--background-color-elevated) h s l / 70%)" };

	return (
		<motion.fieldset className={css._} {...props}>
			<div className={css.background} style={transparentBackground} />
			<div className={css.currentIcon} style={transparentBackground}>
				{currentValue.icon || currentValue.label}
			</div>
			<div className={css.content}>
				<div className={css.contentHeader}>
					<div className={css.toggle} style={{ "--nb-of-values": nbOfValues } as React.CSSProperties}>
						{values.map(({ value, icon, label }) => (
							<label key={value}>
								<input
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

					<legend>
						{`${title ?? ""}`}
						<span>{`(${currentValue.label})`}</span>
					</legend>
				</div>
				{description && <p>{description}</p>}
			</div>
		</motion.fieldset>
	);
};
