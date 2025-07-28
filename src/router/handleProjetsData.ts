import projectsDataNoType from "../assets/projectsData.json";
import { redirect, LoaderFunctionArgs } from "react-router-dom";

type ImgData = {
	url: string;
	webp?: { [key: string]: string };
	jpg?: { [key: string]: string };
	png?: { [key: string]: string };
	alt: string;
};
type MetaData = {
	date: string;
	role: string[];
	tools: string[];
	link: string;
};
type ProcessData = {
	design: string[];
	dev: string[];
	challenges: string[];
};
export type ProjectData = {
	id: number;
	tags: string[];
	title: string;
	subtitle: string;
	slug: string;
	img: ImgData;
	logo?: ImgData;
	meta?: MetaData;
	description: string;
	goal?: string;
	process?: ProcessData;
	result?: string;
	next?: string;
};
const projectsData = projectsDataNoType as ProjectData[];

export const projectLoader = ({ params }: LoaderFunctionArgs) => {
	const projectName = params.projectName;
	const project = projectsData.find(project => project.slug === projectName);

	if (project) return project;
	// TODO : Error message "Sorry this project doesn't exist"
	return redirect("/work");
};

const getAllProjects = async () => {
	return projectsData;
};

const getWebProjects = async () => {
	const webProjects = getDataWithTag("web");
	// + info "web" context pour intro ^^
	return webProjects;
};
const getDesignProjects = async () => {
	const designProjects = getDataWithTag("design");
	return designProjects;
};

const getDataWithTag = (tag: string) => projectsData.filter(project => project.tags.includes(tag));

export const projectsListLoader = {
	all: getAllProjects,
	web: getWebProjects,
	design: getDesignProjects,
};
