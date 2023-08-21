import css from "./ProjectPage.module.scss";

import { motion } from "framer-motion";
import { animPropsNames } from "../../utils/animation";

import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { Link, useLoaderData } from "react-router-dom";

import { useState } from "react";

export const ProjectPage = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	const [project] = useState(useLoaderData()); // need to "cache" the data (AnimatePresence transition + change route => useLoaderData() = undefined)

	const goBack = () => {
		window.history.back();
	};
	return (
		<motion.div className={css._} variants={projectTransition} {...(!reducedMotion && animPropsNames)}>
			<h1>{project.title}</h1>
			<motion.nav>
				<button onClick={goBack}>Go back</button>
				{project.tags.map(tag => (
					<Link to={`/work/${tag}`} key={tag}>
						{tag}
					</Link>
				))}
			</motion.nav>
			<div className={css.content}>
				{project.img.url ? (
					<img src={project.img.url} alt={project.img.alt}></img>
				) : (
					<NoImg alt={project.img.alt} />
				)}
				<motion.p variants={childTransition}>{project.description}</motion.p>
			</div>
		</motion.div>
	);
};

const NoImg = ({ alt }) => <motion.div variants={childTransition} className={css.noImg} alt={alt} />;

const projectTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.7, staggerChildren: 0.1 } },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.2 } },
};

const childTransition = {
	initial: { scale: 0.7, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { type: "spring" } },
	exit: { scale: 0.7, opacity: 0, transition: { duration: 0.2 } },
};
