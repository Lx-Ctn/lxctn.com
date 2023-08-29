import css from "./ProjectPage.module.scss";

import { motion } from "framer-motion";
import { animPropsNames } from "../../utils/animation";

import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { Link, useLoaderData } from "react-router-dom";

import { useState } from "react";
import { ImageWebp } from "../../components";

export const ProjectPage = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	const [project] = useState(useLoaderData() ?? defaultProject); // need to "cache" the data (AnimatePresence transition + change route => useLoaderData() = undefined)

	const goBack = () => window.history.back();
	return (
		<motion.div className={css._} variants={projectTransition} {...(!reducedMotion && animPropsNames)}>
			{project.logo && <Img className={css.logo} imgData={project.logo} />}
			<h1>{project.title}</h1>
			{project.subtitle && <p>{project.subtitle}</p>}
			<motion.nav>
				<button onClick={goBack}>Go back</button>
				{project.tags.map(tag => (
					<Link to={`/work/${tag}`} key={tag}>
						{capitalize(tag)}
					</Link>
				))}
			</motion.nav>
			<div className={css.content}>
				<Img imgData={project.img} variants={childTransition} />
				<motion.p variants={childTransition}>{project.description}</motion.p>
			</div>
		</motion.div>
	);
};

const Img = ({ imgData, ...props }) => {
	const getSrcset = (url, source) => {
		return source
			? Object.keys(source).reduce(
					(srcset, size) => `${srcset}, ${require(`../../assets/images/${url + source[size]}`)} ${size}`,
					""
			  )
			: "";
	};

	return imgData.webp || imgData.jpg || imgData.png ? (
		<motion.div {...props}>
			<ImageWebp
				webp={getSrcset(imgData.url, imgData.webp)}
				png={getSrcset(imgData.url, imgData.png)}
				jpg={getSrcset(imgData.url, imgData.jpg)}
				alt={imgData.alt}
			/>
		</motion.div>
	) : (
		<motion.div className={css.noImg} {...props}>
			{imgData.alt}
		</motion.div>
	);
};

const defaultProject = {
	id: 0,
	tags: [],
	title: "The fail project",
	slug: "the--fail-project",
	img: {
		alt: "No image here",
	},
	description: "Well... Seems there is a problem (please reload the page)",
};

function capitalize(string = "") {
	const firstLetterCap = string.charAt(0).toUpperCase();
	const rest = string.substring(1);
	return firstLetterCap + rest;
}

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
