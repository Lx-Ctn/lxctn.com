import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { updateAppWidth } from "../store/appSlice";
import { setHeaderMobile } from "../store/headerSlice";
import { get } from "../store/selectors";

export const useResponsive = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const updateScreenWidth = () => {
			dispatch(updateAppWidth());
			dispatch(setHeaderMobile());
		};
		window.addEventListener("resize", updateScreenWidth);
		return () => window.removeEventListener("resize", updateScreenWidth);
	}, [dispatch]);

	const appWidth = useSelector(get.appWidth);
	return appWidth;
};
