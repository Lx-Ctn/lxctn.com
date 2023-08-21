import projectsData from "../assets/projectsData";
import { redirect } from "react-router-dom";

export const projectLoader = ({ params }) => {
	const projectName = params.projectName;
	const project = projectsData.find(project => project.slug === projectName);

	if (project) return project;
	// TODO : Error message "Sorry this project doesn't exist"
	return redirect("/work");
};

const getWebProjects = () => {
	const webProjects = getDataWithTag("web");
	// + info "web" context pour intro ^^
	return webProjects;
};
const getDesignProjects = () => {
	const designProjects = getDataWithTag("design");
	return designProjects;
};

const getDataWithTag = tag => projectsData.filter(project => project.tags.includes(tag));

export const projectsListLoader = {
	all: () => projectsData,
	web: getWebProjects,
	design: getDesignProjects,
};
