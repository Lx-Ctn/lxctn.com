import type { ProjectData } from "router/handleProjetsData";
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

type UIParams = {
	width?: number; // in px
	maxWidth?: number; // in px
	gap?: number; // in em
	itemScale?: number; // 1 = 100%, 0.8 = 80%, in em
	itemMinWidth?: number; // in em
};
type ItemsWithSizes = ProjectData[] & { itemSizes?: string }; // added for img sizes attribute

function useUIParam(uiParams?: UIParams) {
	const { width = window.innerWidth, maxWidth, gap: emGap = 0, itemScale = 1 } = uiParams ?? {};
	const containerWidth = maxWidth ? (width > maxWidth ? maxWidth : width) : width;

	const fontsize = parseFloat(window.getComputedStyle(document.body).fontSize);
	const gap = emGap * fontsize;
	const itemFontsize = itemScale * fontsize;
	const itemMinWidth = uiParams?.itemMinWidth ? uiParams.itemMinWidth * itemFontsize : 1; // px

	const maxItemsInOneLine = Math.floor((containerWidth - gap) / (itemMinWidth + gap));

	// Add a custom property to get correct sizes attribute for the img :
	const getItemSizes = (itemsByLine: number) => `${(containerWidth - gap) / itemsByLine - gap}px`;

	return { maxItemsInOneLine, getItemSizes };
}

export const useBalancedLayout = (items: ProjectData[], uiParams?: UIParams) => {
	const itemsNumber = items.length;
	const { maxItemsInOneLine, getItemSizes } = useUIParam(uiParams);

	const isMultipleLines = itemsNumber > maxItemsInOneLine;
	const soloItemsNumber = itemsNumber % maxItemsInOneLine;
	if (isMultipleLines && soloItemsNumber !== 0) {
		const balancedLayout = getBalancedLayout(items, maxItemsInOneLine, soloItemsNumber, getItemSizes);
		return balancedLayout;
	}

	const itemsWithSizes: ItemsWithSizes = items.slice();
	itemsWithSizes.itemSizes = getItemSizes(maxItemsInOneLine);
	return [itemsWithSizes];
};

const getBalancedLayout = (
	items: ProjectData[],
	maxItemsInOneLine: number,
	soloItemsNumber: number,
	getItemSizes: (itemsByLine: number) => string
) => {
	const remainingItems: ItemsWithSizes = items.slice();

	if (soloItemsNumber < maxItemsInOneLine - 1) {
		const numberOfItemsToBalance = soloItemsNumber + maxItemsInOneLine;

		const numberOnTopLine = Math.floor(numberOfItemsToBalance / 2);
		const topLine: ItemsWithSizes = remainingItems.splice(0, numberOnTopLine);

		const numberOn2ndLine = numberOfItemsToBalance - numberOnTopLine;
		const secondLine: ItemsWithSizes = remainingItems.splice(0, numberOn2ndLine);

		topLine.itemSizes = getItemSizes(numberOnTopLine);
		secondLine.itemSizes = getItemSizes(numberOn2ndLine);
		remainingItems.itemSizes = getItemSizes(maxItemsInOneLine);

		return [topLine, secondLine, remainingItems];
	} else {
		const topLine: ItemsWithSizes = remainingItems.splice(0, soloItemsNumber);
		topLine.itemSizes = getItemSizes(soloItemsNumber);
		remainingItems.itemSizes = getItemSizes(maxItemsInOneLine);

		return [topLine, remainingItems];
	}
};
