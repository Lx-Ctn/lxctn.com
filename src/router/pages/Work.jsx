import css from "./Work.module.scss";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { NavLink, useOutlet } from "react-router-dom";
import projectsData from "../../assets/projectsData";
import { ShiningFrame } from "../../components";

export const WorkPage = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	return (
		<motion.div className={css._} {...(!reducedMotion && workPageTransition)}>
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
	return (
		<AnimatePresence mode="wait">
			<Fragment key={pathname}>{routeElement}</Fragment>
		</AnimatePresence>
	);
};

const CardContainer = ({ getProjects }) => {
	const data = getProjects();
	return (
		<motion.div className={css.cardContainer} variants={cardContainerTransition} {...variantsNames}>
			{data?.map(project => (
				<Card key={project.id} {...project} />
			))}
		</motion.div>
	);
};

const Card = project => {
	const getImg = () => false;
	return (
		<motion.div className={css.card} variants={getCardTransition()} whileHover={{ rotate: 0 }}>
			<ShiningFrame angle={{ from: "-40deg", to: "140deg" }} />
			<h2>{project.title}</h2>
			{getImg() ? <img src={project.img.url} alt={project.img.alt}></img> : <NoImg alt={project.img.alt} />}
			<p>{project.description}</p>
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
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
};
const cardContainerTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { duration: 0.4, staggerChildren: 0.15 } },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
};
const getCardTransition = () => ({
	initial: { scale: 0.4, rotate: -20, opacity: 0 },
	animate: { scale: 1, rotate: 10 * Math.random() - 5, opacity: 1 },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
	transition: { duration: 0.4 },
});
const variantsNames = {
	initial: "initial",
	animate: "animate",
	exit: "exit",
	transition: "transition",
};
