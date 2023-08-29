import { useEffect, useState } from "react";

export const useParallax = (ref, transitionClassname) => {
	const [refCoor, setRefCoor] = useState({ x: 0, y: 0, oldX: 0, oldY: 0 });
	const [mouseCoor, setMouseCoor] = useState(null);

	useEffect(() => {
		const handleScroll = () => {
			const { x, y } = getRefCoor(ref);
			setRefCoor(refCoor => ({ x, y, oldX: refCoor.x, oldY: refCoor.y }));
		};
		handleScroll();

		const handleResize = () => {
			const { x, y } = getRefCoor(ref);
			let oldX, oldY;
			setRefCoor(refCoor => {
				oldX = refCoor.x;
				oldY = refCoor.y;
				return { x, y, oldX, oldY };
			});

			// When resize, mouse is outside the window -> no coor update -> extrapolate from ref
			setMouseCoor(
				mouseCoor =>
					mouseCoor && {
						x: mouseCoor.x * (x / oldX),
						y: mouseCoor.y * (y / oldY),
						oldX: mouseCoor.x,
						oldY: mouseCoor.y,
					}
			);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [ref]);

	const refHaveMoved = refCoor.x !== refCoor.oldX || refCoor.y !== refCoor.oldY;
	useEffect(() => {
		let needForRAF = true;
		const handleMouseMove = event => {
			setMouseCoor(mouseCoor => ({
				x: event.clientX,
				y: event.clientY,
				oldX: mouseCoor?.x ?? 0,
				oldY: mouseCoor?.y ?? 0,
			}));

			if (refHaveMoved) setRefCoor(refCoor => ({ ...refCoor, oldX: refCoor.x, oldY: refCoor.y }));
			needForRAF = true;
		};
		const rAFHandleMouseMove = event => {
			needForRAF && window.requestAnimationFrame(() => handleMouseMove(event));
			needForRAF = false;
		};

		window.addEventListener("mousemove", rAFHandleMouseMove);
		return () => window.removeEventListener("mousemove", rAFHandleMouseMove);
	}, [refHaveMoved]);

	// Move origin at the center of the element :
	// Mouse position can't be obtained before a mouse event fired -> Set coor to 0
	const x = mouseCoor ? mouseCoor.x - refCoor.x : 0;
	const y = mouseCoor ? mouseCoor.y - refCoor.y : 0;

	// Keep previous coor for comparaison : If close, just work with the new coor, if far, may need a smooth transition
	const oldX = mouseCoor ? mouseCoor.oldX - refCoor.oldX : 0;
	const oldY = mouseCoor ? mouseCoor.oldY - refCoor.oldY : 0;
	const isTransitionNeeded = Math.abs(x - oldX) > 150 || Math.abs(y - oldY) > 150;
	isTransitionNeeded && ref.current.classList.add(transitionClassname);

	useEffect(() => {
		const el = ref.current; // Store element to be sure it will be the same when the cleanup fonction is called

		const removeTransition = () => {
			el.classList.remove(transitionClassname);
			el.removeEventListener("transitionend", removeTransition); // el have many child, all trigger the event
		};

		el && el.addEventListener("transitionend", removeTransition);
		return () => el && el.removeEventListener("transitionend", removeTransition);
	}, [ref, transitionClassname, isTransitionNeeded]);

	return { x, y };
};

// Get the center of the element :
const getRefCoor = ref => {
	if (!ref.current) return { x: 0, y: 0 };

	const refRect = ref.current?.getBoundingClientRect();
	const x = (refRect.left + refRect.right) / 2;
	const y = (refRect.top + refRect.bottom) / 2;
	return { x, y };
};
