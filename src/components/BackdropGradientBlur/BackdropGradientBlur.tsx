import css from "./BackdropGradientBlur.module.scss";

interface BackgroundProps {
	/** background.color : The CSS property of your theme (ex: "--background-color") */
	color: string;

	/** background.opacity : Without opacity, the background will mask the backdrop blur (from 0 to 1 | ex: 0.6) */
	opacity: number;
}

export interface BGBProps {
	/** Max blur intensity (ex: "1em", default: "10px") */
	blur?: string;

	/** CSS Gradient direction : Where the blur fade (ex: "45deg", default: "to bottom") */
	direction?: string;

	/** Gradient starting point : Where blur is at full intensity (in CSS length units | default: "60%" | ex: "1em") */
	from?: string;

	/** Gradient ending point : Where there is no more blur (in CSS length units | default: "100%" | ex: "1em") */
	to?: string;

	/** Gradient starting point : Where blur is at full intensity. Calculted from the end ( calc(to - fromEnd) ), to keep a fixed size blur for exemple (in CSS length units | ex: "1em" => calc(100% - 1em)) */
	fromEnd?: string;

	/** Higher number mean smooth gradient, but ! performance (int | default: 3) */
	steps?: number;

	/** Background to color or cover the content below (ex: {color: "--background-color", opacity: 0.6}) */
	background?: BackgroundProps;

	/** Custom style to apply on the main div */
	style?: React.CSSProperties;
}

/**
 * Simulate a gradient of blur intensity
 *
 * @param {object} props
 *
 * @param {string} [props.blur] - Max blur intensity (default: "10px" | ex: "1em")
 * @param {string} [props.direction] - CSS Gradient direction: Where the blur fade (default: "to bottom" | ex: "45deg")
 * @param {string} [props.from] - Gradient starting point: Where blur is at full intensity (in CSS length units | default: "60%"" | ex: "1em")
 * @param {string} [props.fromEnd] - Gradient starting point: Where blur is at full intensity. Calculted from the end ( calc(to - fromEnd) ), to keep a fixed size blur for exemple (in CSS length units | ex: "1em" -> calc(100% - 1em))
 * @param {string} [props.to] - Gradient ending point: Where there is no more blur (in CSS length units | default: "100%"" | ex: "100%")
 * @param {number} [props.steps] - Higher number mean smooth gradient, but ! performance (int | default: 3)
 * @param {object} [props.background] - Background to color or cover the content below (ex: {color: "--background-color", opacity: 0.6})
 * @param {string} [props.background.color] - The CSS property of your theme (ex: "--background-color")
 * @param {number} [props.background.opacity] - Without opacity, the background will mask the backdrop blur (from 0 to 1 | ex: 0.6)
 * @param {React.CSSProperties} [props.style] - Custom style to apply on the main div
 *
 */

export const BackdropGradientBlur = ({
	blur = "10px",
	direction = "to bottom",
	from = "60%",
	fromEnd,
	to = "100%",
	steps = 3,
	background,
	style = {},
}: BGBProps) => {
	const cssBlur = (blur: number) => `blur(${blur}px)`;
	const cssMask = (start: number, end: number) =>
		`linear-gradient(${direction}, rgba(0, 0, 0, 1) ${
			fromEnd ? "calc(" + to + " - " + start + "em)" : start + "%"
		}, transparent ${fromEnd ? "calc(" + to + " - " + end + "em)" : end + "%"})`;

	const getStyle = ({ blur, from, to }: { blur: number; from: number; to: number }) => ({
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

// Easing function : thanks to https://easings.net/ :
function easeInOutSine(ratio: number) {
	const easeInOutSine = -(Math.cos(Math.PI * ratio) - 1) / 2;
	return Math.round(easeInOutSine * 1000) / 1000;
}

/** CSS gradient have no easing function to smooth the progression and avoid banding artefacts.
 * The idea here is to approche the output of a easing function through a serie of steps in the gradient.
 * More steps : better "smoothness", but be careful for perfomances  */
function getSmoothGradient(background: BackgroundProps, direction: string, from = "0", to = "100", smoothLvl = 9) {
	const opacityStart = background.opacity;
	const steps = smoothLvl - 1;
	const stepRatio = 1 / steps;
	const positionDelta = parseInt(to) - parseInt(from);
	const allStepsWithColor = new Array(steps).fill(background.color);
	const allGradientSteps = allStepsWithColor.map((color, index) => {
		const opacityStep = (opacityStart - opacityStart * easeInOutSine(stepRatio * index)).toFixed(4);
		const positionStep = parseInt(from) + Math.round(positionDelta * stepRatio * index);
		return `hsl(from var(${color}) h s l / ${opacityStep}) ${positionStep}%`;
	});
	return `linear-gradient(${direction}, ${allGradientSteps.join(", ")}, transparent ${to})`;
}
