import { useEffect, useRef } from "react";

export const usePrevious = value => {
	const ref = useRef();
	useEffect(() => {
		// Will be called only after the component is mounted
		ref.current = value;
	}, [value]);
	return ref.current; // So this will be the previous value, or undefined for the first render.
};
