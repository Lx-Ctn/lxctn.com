import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice";
import appReducer from "./appSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
	reducer: {
		app: appReducer,
		header: headerReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
