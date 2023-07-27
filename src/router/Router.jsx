//import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "../App";
import { Home, HomeElement, Contact, AboutMe, WorkPage, ErrorPage, projects } from "./pages";
import { Spinner } from "./pages/Work";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
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
				children: [
					{
						path: "web",
						element: projects.web,
					},
					{
						path: "design",
						element: projects.design,
					},
					{
						index: true,
						element: <Spinner />,
					},
				],
			},
		],
	},
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
