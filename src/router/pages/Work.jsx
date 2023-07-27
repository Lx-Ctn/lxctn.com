import css from "./Work.module.scss";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { NavLink, useOutlet } from "react-router-dom";
import projectsData from "../../assets/projectsData";

export const WorkPage = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	return (
		<motion.div className={css._} {...(!reducedMotion && workPageTransition)}>
			<h1>Look at what i've done</h1>
			<nav>
				<CustomLink link={"web"}>Web</CustomLink>
				<CustomLink link={"design"}>Graphic Design</CustomLink>
			</nav>
			<MotionOutlet />
			<p>Voilà....</p>
		</motion.div>
	);
};

const CustomLink = ({ children, motionPosition, link }) => (
	<motion.div
		//className={css.navLink}
		custom={motionPosition}
	>
		<NavLink className={({ isActive }) => (isActive ? css.active : null)} to={link}>
			{children}
		</NavLink>
	</motion.div>
);

const MotionOutlet = () => {
	const routeElement = useOutlet();
	const pathname = window.location.pathname;
	return (
		<AnimatePresence mode="wait">
			<Fragment key={pathname}>{routeElement}</Fragment>
		</AnimatePresence>
	);
};

const CardContainer = ({ getProjects }) => {
	const data = getProjects();
	return (
		<motion.div {...workPageTransition}>
			{data?.map(project => (
				<Card key={project.id} {...project} />
			))}
		</motion.div>
	);
};

const Card = project => {
	return (
		<div>
			<h2>{project.title}</h2>
			<img src={project.img.url} alt={project.img.url}></img>
			<p>{project.description}</p>
		</div>
	);
};

export const Spinner = () => {
	return (
		<motion.div
			className={css.spinner}
			initial={{ rotate: 0 }}
			animate={{ rotate: 360 }}
			transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
		/>
	);
};

const getWebProjects = () => {
	const webProjects = getDataWithTag("web");
	return webProjects;
};
const getDesignProjects = () => {
	const designProjects = getDataWithTag("design");
	return designProjects;
};

const getDataWithTag = tag => projectsData.filter(project => project.tags.includes(tag));

export const projects = {
	web: <CardContainer getProjects={getWebProjects} />,
	design: <CardContainer getProjects={getDesignProjects} />,
};

const workPageTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
