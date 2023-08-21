import { createBrowserRouter, RouterProvider, Navigate, redirect } from "react-router-dom";

import { App } from "../App";
import {
	WithAvatarLayout,
	Home,
	Contact,
	AboutMe,
	WorkPage,
	ErrorPage,
	CardContainer,
	ProjectPage,
} from "./pages";
import { projectLoader, projectsListLoader } from "./handleProjetsData";

const useServerHashPath = () => {
	// Using a client routing, i need to redirect all page requests from the server to the root where is the app.
	// Resquested path is then add as hash on the url to apply the correct redirection here :

	const { hash } = window.location;
	if (hash) return redirect(hash.split("#").at(-1));
	return null;
};

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
						loader: useServerHashPath,
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
						loader: projectsListLoader.all,
						element: <CardContainer />,
					},

					{
						path: "web",
						loader: projectsListLoader.web,
						element: <CardContainer />,
					},
					{
						path: "web/*",
						element: <Navigate to="../web" replace={true} />,
					},

					{
						path: "design",
						loader: projectsListLoader.design,
						element: <CardContainer />,
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
				path: "work/:projectName",
				loader: projectLoader,
				element: <ProjectPage />,
			},
		],
	},
]);

const Router = () => <RouterProvider router={router} />;
export default Router;

export const resetScroll = () => window.scrollTo({ top: 0, behavior: "smooth" });
