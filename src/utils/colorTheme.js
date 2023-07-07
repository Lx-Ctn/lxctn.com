import Color from "./Color";

/***   Color theme for Lx Design branding :


2 colors :
- Main : "Celestial", a turquoise-like color
- Secondary : "Hot", a redish color with some bluish feeling



*/

const getVariation = ({ PURE, MAX_BLACK_HUE_OFFSET, MAX_WHITE_HUE_OFFSET }, variationLvl) => {
	// variationLvl : from 0 (full black) to 200 (full white), 100 for pure color.
	const variation = variationLvl < 0 ? 0 : variationLvl > 200 ? 200 : variationLvl;

	/*
         Celestial variation :
         - 8 steps from black to pure :
            - Linear hue offset : +2 by step (+16 total)
            - Growth curve for the  light offset : x + ((x * (x - 100)) / 180)
         - 4 steps from pure to white :
            - Linear hue offset : -2 by step (-8 total)
            - Decline curve for the light offset : x - ((x * (2x - 200)) / 800)     
         */

	const lightOffset =
		variation > 100
			? (variation - 100 - ((variation - 100) * (2 * variation - 400)) / 800) / 2
			: (variation + (variation * (variation - 100)) / 180) / 2 - 50;
	const colorVariation = new Color(PURE, 0, lightOffset);
	const hueOffset =
		variation > 100
			? (MAX_WHITE_HUE_OFFSET * (variation - 100)) / 100 || 0
			: MAX_BLACK_HUE_OFFSET - ((MAX_BLACK_HUE_OFFSET * variation) / 100 || 0);
	colorVariation.hueOffset = hueOffset;
	return colorVariation;
};

const colorTheme = {
	celestial: {
		PURE: new Color(187, 100, 50),
		MAX_BLACK_HUE_OFFSET: 16,
		MAX_WHITE_HUE_OFFSET: -8,
	},
	hot: {
		PURE: new Color(347, 100, 50),
		getVariation: variationLvl => {
			/*
         Hot variation :
         - 8 steps from black to pure :
            - Linear hue offset : -3 by step (-24 total)
            - Growth curve for the  light offset : x + ((x * (x - 100)) / 180)
         - 4 steps from pure to white :
            - Linear hue offset : 3 by step (12 total)
            - Decline curve for the light offset : x - ((x * (x - 100)) / 160)     
         */
			const variation = variationLvl < 0 ? 0 : variationLvl > 200 ? 200 : variationLvl;
			const MAX_BLACK_HUE_OFFSET = -24;
			const MAX_WHITE_HUE_OFFSET = 12;
			const lightOffset =
				variation > 100
					? (variation - 100 - ((variation - 100) * (variation - 200)) / 160) / 2
					: (variation + (variation * (variation - 100)) / 180) / 2 - 50;
			const ColorVariation = new Color(colorTheme.hot.PURE, 0, lightOffset);
			const hueOffset =
				variation > 100
					? (MAX_WHITE_HUE_OFFSET * (variation - 100)) / 100 || 0
					: MAX_BLACK_HUE_OFFSET - ((MAX_BLACK_HUE_OFFSET * variation) / 100 || 0);
			ColorVariation.hueOffset = hueOffset;
			return ColorVariation;
		},
	},
};

export default colorTheme;

export const LogoColor = getVariation(colorTheme.celestial, 75);

/*



*/
// Balanced color set from black to white to visualize all colors variations from the theme :
export const ShowTheme = () => {
	const colorVariationLevels = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100, 125, 150, 175, 200];
	const celestials = colorVariationLevels.map(variationLvl =>
		getVariation(colorTheme.celestial, variationLvl).toHsl()
	);
	const hots = colorVariationLevels.map(variationLvl => colorTheme.hot.getVariation(variationLvl).toHsl());

	return (
		<div>
			<div style={{ display: "flex" }}>
				{celestials.map((color, index) => (
					<div key={index} style={{ width: "50px", height: "50px", backgroundColor: color }}></div>
				))}
			</div>
			<div style={{ display: "flex" }}>
				{hots.map((color, index) => (
					<div key={index} style={{ width: "50px", height: "50px", backgroundColor: color }}></div>
				))}
			</div>
		</div>
	);
};
