import css from "./Work.module.scss";
import { Fragment, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { animPropsNames, noAnimPropsNames } from "../../utils/animation";

import { useSelector } from "react-redux";
import { get } from "../../store/selectors";
import { NavLink, useLoaderData, useOutlet, useNavigate } from "react-router-dom";
import { resetScroll } from "../Router";

import { ShiningFrame, ImageWebp } from "../../components";

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
			<motion.div className={css.outletContainer} variants={outletContainerTransition}>
				<MotionOutlet />
			</motion.div>
			{/* <p>Voilà !</p> */}
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
	const reducedMotion = useSelector(get.reducedMotion);
	const [projectsList] = useState(useLoaderData());

	return (
		<motion.div
			className={css.cardContainer}
			variants={cardContainerTransition}
			{...(reducedMotion ? noAnimPropsNames : animPropsNames)}
		>
			{projectsList
				?.slice()
				.reverse()
				.map(project => (
					<Card key={project.id} {...project} />
				))}
		</motion.div>
	);
};

const Card = project => {
	const navigate = useNavigate();
	const navigateToProject = e => {
		e.preventDefault();
		navigate(`/work/${project.slug}`);
	};
	return (
		<motion.a
			className={`${css.card} button`}
			href={`/work/${project.slug}`}
			onClick={navigateToProject}
			variants={cardTransition}
		>
			<ShiningFrame angle={{ from: "-40deg", to: "140deg" }} />
			<h2>{project.title}</h2>
			<Img imgData={project.img ?? {}} />
			<p>{project.description}</p>
		</motion.a>
	);
};

const Img = ({ imgData }) => {
	const getSrcset = (url, source) => {
		return source
			? Object.keys(source).reduce(
					(srcset, size) => `${srcset}, ${require(`../../assets/images/${url + source[size]}`)} ${size}`,
					""
			  )
			: "";
	};
	return imgData.webp || imgData.jpg ? (
		<ImageWebp
			webp={getSrcset(imgData.url, imgData.webp)}
			jpg={getSrcset(imgData.url, imgData.jpg)}
			alt={imgData.alt}
			sizes={"15em"}
		/>
	) : (
		<div className={css.noImg}>{imgData.alt}</div>
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

/*



*/ // Motion :

const workPageTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.6, delayChildren: 0.15 } },
	exit: { scale: 0.4, opacity: 0, transition: { duration: 0.18, delay: 0.07 } },
};
const outletContainerTransition = {
	exit: { scale: 2, opacity: 0, transition: { duration: 0.15 } },
};
const cardContainerTransition = {
	initial: { scale: 0.4, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { duration: 0.2, staggerChildren: 0.1, staggerDirection: -1 } },
	exit: {
		scale: 0.4,
		opacity: 0,
		transition: { duration: 0.2, delay: 0.1, staggerChildren: 0.025, staggerDirection: -1 },
	},
};
const cardTransition = {
	initial: { scale: 0.5, rotate: -13, opacity: 0 },
	animate: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", duration: 0.9 } },
	exit: { scale: 0.6, rotate: 13, opacity: 0, transition: { duration: 0.13 } },
};
