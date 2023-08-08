//import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "../App";
import { HomeContainer, Home, Contact, AboutMe, WorkPage, ErrorPage, projects } from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomeContainer />,
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
						element: projects.all,
					},
				],
			},
		],
	},
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
