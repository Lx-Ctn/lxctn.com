import css from "./BackdropGradientBlur.module.scss";
import PropTypes from "prop-types";

/**
 * Simulate a gradient of blur intensity
 *
 * @param {string|number} [blur=10px] - Max blur intensity (ex: "10px", "1em")
 * @param {string} [direction=to bottom] - Gradient direction : Where the blur fade (ex: "to bottom", "45deg")
 * @param {string} [from=60%] - Gradient starting point : Where blur is at full intensity (ex: "60%")
 * @param {string} [fromEnd] - Gradient starting point : Where blur is at full intensity. Calculted from the end ( calc(to - fromEnd) ), to keep a fixed size blur for exemple (ex: "1em" => calc(100% - 1em))
 * @param {string} [to=100%] - Gradient ending point : Where there is no more blur (ex: "100%")
 * @param {number} [steps=3] - Higher number mean smooth gradient, but ! performance (ex: 3)
 * @param {string} [color=#fff0] - Background-color : need alpha to see backdrop bblur (ex: "#ffffff60")
 *
 */

export const BackdropGradientBlur = props => {
	const {
		blur = "10px",
		direction = "to bottom",
		from = "60%",
		fromEnd,
		to = "100%",
		steps = 3,
		color = "#fff0",
		style = {},
	} = props;

	const cssBlur = blur => `blur(${blur}px)`;
	const cssMask = (start, end) =>
		`linear-gradient(${direction}, rgba(0, 0, 0, 1) ${
			fromEnd ? "calc(" + to + " - " + start + "em)" : start + "%"
		}, transparent ${fromEnd ? "calc(" + to + " - " + end + "em)" : end + "%"})`;
	const getStyle = ({ blur, from, to }) => ({
		...style,
		backdropFilter: cssBlur(blur),
		WebkitBackdropFilter: cssBlur(blur),
		mask: cssMask(from, to),
		WebkitMask: cssMask(from, to),
	});

	const lastStyle = {
		...style,
		background: `linear-gradient(${direction}, ${color} ${from}, transparent ${to})`,
	};

	const allDivs = new Array(steps + 1).fill(0);

	const delta = fromEnd ? parseFloat(fromEnd) : parseInt(to) - parseInt(from);
	const interval = delta / (steps + 2);
	const divSize = 2 * interval;

	return (
		<>
			{allDivs.map((_, index) => {
				const start = fromEnd ? parseFloat(fromEnd) - index * interval : parseInt(from) + index * interval;
				const end = fromEnd ? start - divSize : start + divSize;
				const blurStep = parseInt(blur) - index * (parseInt(blur) / steps);
				const isLastElement = index === allDivs.length - 1;
				return (
					<div
						key={index}
						style={isLastElement ? lastStyle : getStyle({ blur: blurStep, from: start, to: end })}
						className={css._}
					/>
				);
			})}
		</>
	);
};

BackdropGradientBlur.propTypes = {
	/** Max blur intensity (ex: "1em", default: "10px") */
	blur: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Gradient direction : Where the blur fade (ex: "45deg", default: "to bottom") */
	direction: PropTypes.string,
	/** Gradient starting point : Where blur is at full intensity (default: "60%") */
	from: PropTypes.string,
	/** Gradient ending point : Where there is no more blur (default: "100%") */
	fromEnd: PropTypes.string,
	/** Gradient starting point : Where blur is at full intensity. Calculted from the end ( calc(to - fromEnd) ), to keep a fixed size blur for exemple (ex: "1em" => calc(100% - 1em)) */
	to: PropTypes.string,
	/** Higher number mean smooth gradient, but ! performance (default: 3) */
	steps: PropTypes.number,
	/** Background-color : need alpha to see backdrop bblur (default: "#fff0") */
	color: PropTypes.string,
};
