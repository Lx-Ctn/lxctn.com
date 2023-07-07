import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice";
import appReducer from "./appSlice";

const store = configureStore({
	reducer: {
		app: appReducer,
		header: headerReducer,
	},
});

export default store;
