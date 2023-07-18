//import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "../App";
import { Home, Contact, AboutMe, ErrorPage } from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
			{
				path: "aboutme",
				element: <AboutMe />,
			},
		],
	},
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
