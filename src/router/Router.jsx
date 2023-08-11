import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { App } from "../App";
import { WithAvatarLayout, Home, Contact, AboutMe, WorkPage, ErrorPage, projects } from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <WithAvatarLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "contact",
						element: <Contact />,
					},
					{
						path: "contact/*",
						element: <Navigate to="/contact" replace={true} />,
					},
					{
						path: "aboutme",
						element: <AboutMe />,
					},
					{
						path: "aboutme/*",
						element: <Navigate to="/aboutme" replace={true} />,
					},
					{
						path: "*",
						element: <Navigate to="/" replace={true} />,
					},
				],
			},
			{
				path: "work",
				element: <WorkPage />,
				children: [
					{
						index: true,
						element: projects.all,
					},

					{
						path: "web",
						element: projects.web,
					},
					{
						path: "web/*",
						element: <Navigate to="../web" replace={true} />,
					},

					{
						path: "design",
						element: projects.design,
					},
					{
						path: "design/*",
						element: <Navigate to="../design" replace={true} />,
					},

					{
						path: "*",
						element: <Navigate to="" replace={true} />,
					},
				],
			},
			{
				//path: "work/:projectName",
				//element: <Contact />,
			},
		],
	},
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
