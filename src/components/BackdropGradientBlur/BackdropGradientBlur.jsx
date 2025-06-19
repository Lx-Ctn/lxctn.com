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
		background,
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

	const backgroundStyle = {
		...style,
		background: getSmoothGradient(background, direction, from, to),
	};
	const allSteps = new Array(steps).fill(0);

	const delta = fromEnd ? parseFloat(fromEnd) : parseInt(to) - parseInt(from);
	const interval = delta / (steps + 2);
	const divSize = 2 * interval;

	return (
		<div className={css._}>
			{allSteps.map((_, index) => {
				const start = fromEnd ? parseFloat(fromEnd) - index * interval : parseInt(from) + index * interval;
				const end = fromEnd ? start - divSize : start + divSize;
				const blurStep = parseInt(blur) - index * (parseInt(blur) / steps);
				return (
					<div
						key={index}
						style={getStyle({ blur: blurStep, from: start, to: end })}
						className={css.blurStep}
					/>
				);
			})}
			{background ? <div style={backgroundStyle} className={css.background} /> : null}
		</div>
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

function toHexa(ratio) {
	const hexaString = Math.round(ratio * 255).toString(16);
	return hexaString.length < 2 ? "0" + hexaString : hexaString;
}

// Easing function : thanks to https://easings.net/ :
function easeInOutSine(ratio) {
	const easeInOutSine = -(Math.cos(Math.PI * ratio) - 1) / 2;
	return Math.round(easeInOutSine * 1000) / 1000;
}

/** CSS gradient have no easing function to smooth the progression and avoid banding artefacts.
 *
 * The idea here is to approche the output of a easing function through a serie of steps in the gradient.
 *
 * More steps : better "smoothness", but be careful for perfomances  */
function getSmoothGradient(background, direction, from = 0, to = 100, smoothLvl = 9) {
	const opacityStart = background.opacity;
	const steps = smoothLvl - 1;
	const stepRatio = 1 / steps;
	const positionDelta = parseInt(to) - parseInt(from);
	const allStepsWithColor = new Array(steps).fill(background.color);
	const allGradientSteps = allStepsWithColor.map((color, index) => {
		const opacityStep = color + toHexa(opacityStart - opacityStart * easeInOutSine(stepRatio * index));
		const positionStep = parseInt(from) + Math.round(positionDelta * stepRatio * index);
		return `${opacityStep} ${positionStep}%`;
	});
	return `linear-gradient(${direction}, ${allGradientSteps.join(", ")}, transparent ${to})`;
}
