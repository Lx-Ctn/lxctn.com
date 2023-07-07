import { useEffect, useState } from "react";
//import { usePrevious } from "./usePrevious";
import { flushSync } from "react-dom";

// TODO :
// - usePrevious pour stocker les "old" value et éviter de passer par flushSync
// - offsetX / offsetY : coor par rapport à l'élément écouté -> du coup pas besoin de ref ? (du moins pour mousmove event)
// - movementX / movementY : coor par rapport au précédent appel de "mousemove" -> à la place de old ?

export const useParallax = (ref, classname) => {
	const [refCoor, setRefCoor] = useState({ x: 0, y: 0, oldX: 0, oldY: 0 });
	const [mouseCoor, setMouseCoor] = useState(null);

	useEffect(() => {
		const handleScroll = () => {
			const refRect = ref.current.getBoundingClientRect();
			// Get the center of the element :
			const x = (refRect.left + refRect.right) / 2;
			const y = (refRect.top + refRect.bottom) / 2;

			setRefCoor(refCoor => ({ x, y, oldX: refCoor.x, oldY: refCoor.y }));
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [ref]);

	const refHaveMoved = refCoor.x !== refCoor.oldX || refCoor.y !== refCoor.oldY;
	useEffect(() => {
		const handleMouseMove = event => {
			// may try to use reducer to avoid that ?
			flushSync(() => {
				// need to force React to not batch the set function when event fired twice before re-render.
				setMouseCoor(mouseCoor => ({
					x: event.clientX,
					y: event.clientY,
					oldX: mouseCoor?.x ?? 0,
					oldY: mouseCoor?.y ?? 0,
				}));
			});
			if (refHaveMoved) setRefCoor(refCoor => ({ ...refCoor, oldX: refCoor.x, oldY: refCoor.y }));
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [refHaveMoved]);

	// Move origin at the center of the element :
	// Mouse position can't be obtained before a mouse event fired -> Set coor to 0
	const x = mouseCoor ? mouseCoor.x - refCoor.x : 0;
	const y = mouseCoor ? mouseCoor.y - refCoor.y : 0;

	// Keep previous coor for comparaison : If close, just work with the new coor, if far, may need a smooth transition
	const oldX = mouseCoor ? mouseCoor.oldX - refCoor.oldX : 0;
	const oldY = mouseCoor ? mouseCoor.oldY - refCoor.oldY : 0;

	const isTransitionNeeded = Math.abs(x - oldX) > 100 || Math.abs(y - oldY) > 100;

	useEffect(() => {
		const el = ref.current; // Store element to be sure it will be the same when the cleanup fonction is called
		isTransitionNeeded && el.classList.add(classname);

		const removeTransition = () => el.classList.remove(classname);
		el.addEventListener("transitionend", removeTransition);
		return () => el.removeEventListener("transitionend", removeTransition);
	}, [ref, classname, isTransitionNeeded]);

	return { x, y };
};
