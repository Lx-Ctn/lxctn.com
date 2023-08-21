import css from "./Work.module.scss";
import { Fragment, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { animPropsNames } from "../../utils/animation";

import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { NavLink, Link, useOutlet, useLoaderData } from "react-router-dom";
import { resetScroll } from "../Router";

import projectsData from "../../assets/projectsData";
import { ShiningFrame } from "../../components";

export const WorkPage = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	return (
		<motion.div className={css._} variants={workPageTransition} {...(!reducedMotion && animPropsNames)}>
			<h1>Look at what i've done</h1>
			<nav>
				<CustomLink link={""}>All</CustomLink>
				<CustomLink link={"web"}>Web</CustomLink>
				<CustomLink link={"design"}>Graphic Design</CustomLink>
			</nav>
			<MotionOutlet />
			<p>Voilà....</p>
		</motion.div>
	);
};

const CustomLink = ({ children, link }) => (
	<motion.div className={css.navLink}>
		<NavLink className={({ isActive }) => (isActive ? css.active : null)} to={link} end>
			{children}
		</NavLink>
	</motion.div>
);

const MotionOutlet = () => {
	const routeElement = useOutlet();
	const pathname = window.location.pathname;
	resetScroll();
	return (
		<AnimatePresence mode="wait">
			<Fragment key={pathname}>{routeElement}</Fragment>
		</AnimatePresence>
	);
};

export const CardContainer = () => {
	const [projectsList] = useState(useLoaderData());
	return (
		<motion.div className={css.cardContainer} variants={cardContainerTransition}>
			{projectsList?.map(project => (
				<Card key={project.id} {...project} />
			))}
		</motion.div>
	);
};

const Card = project => {
	const getImg = () => false;
	return (
		<motion.div className={css.card} variants={cardTransition}>
			<Link to={`/work/${project.slug}`} className="button">
				<ShiningFrame angle={{ from: "-40deg", to: "140deg" }} />
				<h2>{project.title}</h2>
				{getImg() ? <img src={project.img.url} alt={project.img.alt}></img> : <NoImg alt={project.img.alt} />}
				<p>{project.description}</p>
			</Link>
		</motion.div>
	);
};

const NoImg = ({ alt }) => <div className={css.noImg} />;

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
	all: <CardContainer getProjects={() => projectsData} />,
	web: <CardContainer getProjects={getWebProjects} />,
	design: <CardContainer getProjects={getDesignProjects} />,
};
/*



*/ // Motion :

const workPageTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { duration: 0.3, delayChildren: 0.15 } },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2, when: "afterChildren" } },
};
const cardContainerTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { duration: 0.2, staggerChildren: 0.15 } },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2, delay: 0.1, staggerChildren: 0.04 } },
};
const cardTransition = {
	initial: { scale: 0.4, rotate: -20, opacity: 0 },
	animate: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.3 } },
	exit: { scale: 0.4, rotate: -20, opacity: 0, transition: { duration: 0.15 } },
};
