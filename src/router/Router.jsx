//import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "../App";
import { Home, HomeElement, Contact, AboutMe, WorkPage, ErrorPage } from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
				children: [
					{
						path: "/",
						element: <HomeElement />,
					},
					{
						path: "contact",
						element: <Contact />,
					},
				],
			},

			{
				path: "aboutme",
				element: <AboutMe />,
			},
			{
				path: "work",
				element: <WorkPage />,
			},
		],
	},
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
