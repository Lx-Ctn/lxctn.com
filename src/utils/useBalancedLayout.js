import { useSelector } from "react-redux";
import { get } from "../store/selectors";
/**
 * Flex or grid layout can leave some solo items at the end.
 *
 * And you don't want them to float alone, neither to stretch and be 4x the others.
 *
 * What you want is some kind of "flex-wrap: wrap-balance"
 * For exemple if you have 4 items lines, but the last have 1 item, it's better to have 3 then 2.
 *
 * Luckly, you have useBalancedLayout, that does just that.
 *
 * Balanced line will be push on top :
 *    - Get your items filtered by importance
 *    - Stretched by flex
 *
 * And now the most important items are bigger.
 * @param {Array} items An array of the items you want to display
 * @returns {Array[]} An array of balanced line.
 * @author lx-ctn <web@lxctn.com>
 */

const useUIParam = () => {
	const containerWidth = useSelector(get.appWidth); // will rerender on change

	const fontsize = parseFloat(window.getComputedStyle(document.body).fontSize);
	const gap = 1 * fontsize; // gap: 1em;
	const fontsizeItemRatio = 0.7; // font-size: 0.7em;
	const itemFontsize = fontsizeItemRatio * fontsize;
	const itemMinWidth = 15 * itemFontsize; // flex-basis: 15em; flex-shrink: 0;

	const maxItemsInOneLine = Math.floor((containerWidth - gap) / (itemMinWidth + gap));

	// Add a custom property to get correct sizes attribute for the img :
	const getItemSizes = itemsByLine => `${(containerWidth - gap) / itemsByLine - gap}px`;

	return { maxItemsInOneLine, getItemSizes };
};

export const useBalancedLayout = items => {
	const itemsNumber = items.length;
	const { maxItemsInOneLine, getItemSizes } = useUIParam();

	const isMultipleLines = itemsNumber > maxItemsInOneLine;
	const soloItemsNumber = itemsNumber % maxItemsInOneLine;
	if (isMultipleLines && soloItemsNumber !== 0) {
		const balancedLayout = getBalancedLayout(items, maxItemsInOneLine, soloItemsNumber, getItemSizes);
		return balancedLayout;
	}

	const itemsWithSizes = items.slice();
	itemsWithSizes.itemSizes = getItemSizes(maxItemsInOneLine);
	return [itemsWithSizes];
};

const getBalancedLayout = (items, maxItemsInOneLine, soloItemsNumber, getItemSizes) => {
	const remainingItems = items.slice();

	if (soloItemsNumber < maxItemsInOneLine - 1) {
		const numberOfItemsToBalance = soloItemsNumber + maxItemsInOneLine;

		const numberOnTopLine = Math.floor(numberOfItemsToBalance / 2);
		const topLine = remainingItems.splice(0, numberOnTopLine);

		const numberOn2ndLine = numberOfItemsToBalance - numberOnTopLine;
		const secondLine = remainingItems.splice(0, numberOn2ndLine);

		topLine.itemSizes = getItemSizes(numberOnTopLine);
		secondLine.itemSizes = getItemSizes(numberOn2ndLine);
		remainingItems.itemSizes = getItemSizes(maxItemsInOneLine);

		return [topLine, secondLine, remainingItems];
	} else {
		const topLine = remainingItems.splice(0, soloItemsNumber);
		topLine.itemSizes = getItemSizes(soloItemsNumber);
		remainingItems.itemSizes = getItemSizes(maxItemsInOneLine);

		return [topLine, remainingItems];
	}
};
