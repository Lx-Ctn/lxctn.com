/**
 * Créé un objet couleur au format hsl + alpha optionnel
 * @class
 *
 * Permet d'intéragir facilement avec la couleur,
 * Par exemple d'accéder facilement aux nuances et ombres d'une couleur en variant la propriétés de luminosité.
 *
 * On peut passer un autre object Color en paramètre :
 * Il sera la référence pour garder un lien dynamique avec ses propriétés :
 * 		const mainColor = new Color(360, 90, 70);
 * 		const darkMainColor = new Color(mainColor, null, -30);
 * 		mainColor.hue = 30;
 * 		=> darkMainColor : (30, 90, 40)
 * La nouvelle instance hérite des changements sur la référence, sauf si la propriété est écrasée sur la nouvelle.
 * Les propriétés Offset permettent un décalage dynamique avec la valeur de référence.
 * => Idéal pour la gestion dynamique de thème de couleurs
 *
 * @param	{Color|string|number}	ColorOrValue - Set values (from a other Color or a CSS color string) or set hue from number
 * @param	{number}	[saturation=100] - Set the saturation value (optional - 100% by default)
 * @param	{number}	[light=50]	- Set the light value (optional - 50% by default)
 * @param	{number}	[alpha=100] - Set the alpha value (optional - 100% by default)
 */

/*
	TODO:
	- gestion des notations racourcies "#fff" -> "#ffffff" && "#ffff" -> "#ffffffff"
	- gestion des autres notations CSS rgb & hsl (% & /1)
	- export to # et rgb


*/
class Color {
	#colorReference;
	#hue;
	#saturation;
	#light;
	#alpha;

	// Les paramètres sont protégés pour assurer les valeurs min et max (propriétés de 0 à 100%)
	// Ainsi que la rotation sur la roue chromatique

	constructor(ColorOrValue, saturation = 100, light = 50, alpha = 100) {
		// init :
		this.hueOffset = 0;
		this.saturationOffset = 0;
		this.lightOffset = 0;
		this.alphaOffset = 0;

		// Si on récupére un format css :
		if (ColorOrValue instanceof String || typeof ColorOrValue === "string") {
			let colors;
			if (ColorOrValue.includes("#")) {
				colors = hexToValue(ColorOrValue);
			}
			({ hue: ColorOrValue, saturation, light, alpha } = rgbToHsl(colors));

			// Si l'instance hérite d'une Color :
		}
		if (ColorOrValue instanceof Color) {
			this.#colorReference = ColorOrValue;
			switch (arguments.length) {
				case 4:
					this.alphaOffset = alpha;
				// eslint-disable-next-line no-fallthrough
				case 3:
					this.lightOffset = light;
				// eslint-disable-next-line no-fallthrough
				case 2:
					this.saturationOffset = saturation;
				// eslint-disable-next-line no-fallthrough
				default:
					break;
			}
			// Si on créé une nouvelle instance de Color :
		} else {
			this.#hue =
				ColorOrValue > 360 ? ColorOrValue % 360 : ColorOrValue < 0 ? (ColorOrValue % 360) + 360 : ColorOrValue;
			this.#saturation = saturation > 100 ? 100 : saturation < 0 ? 0 : saturation;
			this.#light = light > 100 ? 100 : light < 0 ? 0 : light;
			this.#alpha = alpha > 100 ? 100 : alpha < 0 ? 0 : alpha;
		}
	}

	// Hue :
	get hue() {
		return this.#hue ?? this.#colorReference.hue + this.hueOffset;
	}
	set hue(hue) {
		this.#hue = hue > 360 ? hue % 360 : hue < 0 ? (hue % 360) + 360 : hue;
	}

	// Saturation :
	get saturation() {
		return this.#saturation ?? this.#colorReference.saturation + this.saturationOffset;
	}
	set saturation(saturation) {
		this.#saturation = saturation > 100 ? 100 : saturation < 0 ? 0 : saturation;
	}

	// Light :
	get light() {
		return this.#light ?? this.#colorReference.light + this.lightOffset;
	}
	set light(light) {
		this.#light = light > 100 ? 100 : light < 0 ? 0 : light;
	}

	// Alpha :
	get alpha() {
		return this.#alpha ?? this.#colorReference.alpha + this.alphaOffset;
	}
	set alpha(alpha) {
		this.#alpha = alpha > 100 ? 100 : alpha < 0 ? 0 : alpha;
	}

	// Export css :
	toHsl() {
		return this.alpha === 100
			? `hsl(${this.hue}, ${this.saturation}%, ${this.light}%)`
			: `hsla(${this.hue}, ${this.saturation}%, ${this.light}%, ${this.alpha}%)`;
	}
}
export default Color;
/*




*/ // Converts string to values :
const hexToValue = stringColor => {
	const red = parseInt(stringColor.slice(1, 3), 16);
	const green = parseInt(stringColor.slice(3, 5), 16);
	const blue = parseInt(stringColor.slice(5, 7), 16);
	const alpha = parseInt(stringColor.slice(7) || "ff", 16);
	return { red, green, blue, alpha };
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from https://gist.github.com/mjackson/5311256
 */
const rgbToHsl = ({ red, green, blue, alpha = 255 }) => {
	red /= 255;
	green /= 255;
	blue /= 255;
	alpha /= 255;

	const max = Math.max(red, green, blue),
		min = Math.min(red, green, blue);
	let hue,
		saturation,
		light = (max + min) / 2;

	if (max === min) {
		hue = saturation = 0; // achromatic
	} else {
		const delta = max - min;
		saturation = light > 0.5 ? delta / (2 - max - min) : delta / (max + min);

		switch (max) {
			case red:
				hue = (green - blue) / delta + (green < blue ? 6 : 0);
				break;
			case green:
				hue = (blue - red) / delta + 2;
				break;
			case blue:
				hue = (red - green) / delta + 4;
				break;
			default:
				break;
		}

		hue /= 6;
	}

	hue *= 360;
	saturation *= 100;
	light *= 100;
	alpha *= 100;
	return { hue, saturation, light, alpha };
};
