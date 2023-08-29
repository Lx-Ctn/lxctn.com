import css from "./AboutMe.module.scss";
import { motion } from "framer-motion";
import { animPropsNames, scrollPropsNames } from "../../utils/animation";
import { Pseudo, Em } from "../../components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

export const AboutMe = () => {
	const [isLauching, setIsLauching] = useState(true);
	const onAnimationComplete = () => setIsLauching(false);

	const reducedMotion = useSelector(get.reducedMotion);

	return (
		<motion.div
			className={css._}
			variants={AboutMePageAnimation}
			{...(!reducedMotion && animPropsNames)}
			onAnimationComplete={onAnimationComplete}
		>
			<h1>Hello !</h1>
			<p className={css.prePseudo}>I'm</p>
			<Pseudo />
			{contents.map((content, i) => (
				<Section
					key={i}
					reducedMotion={reducedMotion}
					direction={i % 2 === 0 ? "50%" : "-50%"}
					delay={isLauching ? 0.3 + i / contents.length : 0} // staggering after main content on launch, then 0 when entering viewport
				>
					{content}
				</Section>
			))}
		</motion.div>
	);
};

const contents = [
	<p>
		I'm a <Em>web designer</Em>, front-end developer, specialized in <Em>React</Em>
	</p>,
	<p>
		I'm a <Em>graphic designer</Em>, front-end developer, specialized in <Em>React</Em>
	</p>,
	<p>
		I'm a <Em>motion designer</Em>, front-end developer, specialized in <Em>React</Em>
	</p>,
	<p>
		I'm a <Em>web designer</Em>, front-end developer, specialized in <Em>React</Em>
	</p>,
	<div>
		<p>
			En provenance du monde du <Em>graphisme</Em>, j'ai embrassé le domaine du <Em>web design</Em> il y a
			quelques années. Ma fascination pour la <Em>programmation</Em> remonte à longtemps, et tandis que je
			poursuivais ma carrière de graphiste, j'ai entrepris une formation en ligne accélérée pour me rapprocher
			du domaine du web. Cependant, ce n'est qu'après avoir réalisé des projets de sites web avec WordPress
			suite à des commandes que j'ai réellement plongé dans cette discipline.
		</p>
		<p>
			Je me suis trouvé profondément frustré en tant que designer de ne pas avoir de compétences en
			développement. Cela m'a poussé à stopper mon activité de graphiste et à m'immerger dans une formation
			intensive en <Em>développement web</Em>, une démarche qui perdure depuis. Je nourris une grande impatience
			à l'idée de faire de cette passion mon métier et à rejoindre une équipe où je pourrais partager mes
			compétences et les faire évoluer.
		</p>
		<p>Au plaisir,</p>
		<p>Alexandre Cottin</p>
	</div>,
];

const Section = ({ direction, children, delay, reducedMotion }) => {
	const variants = slideInAnimation(direction, delay);
	return reducedMotion ? (
		<section>{children}</section>
	) : (
		<motion.section variants={variants} {...scrollPropsNames} viewport={{ amount: 0.5 }}>
			{children}
		</motion.section>
	);
};

//
// Animation :

const AboutMePageAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: {
		scale: 1,
		opacity: 1,
		transition: { type: "spring", duration: 0.4 },
	},
	exit: { scale: 0.4, opacity: 0, transition: { delay: 0.05, duration: 0.2 } },
};

const slideInAnimation = (direction, delay) => ({
	initial: { scale: 0.4, opacity: 0, x: direction },
	whileInView: {
		scale: 1,
		opacity: 1,
		x: 0,
		transition: { type: "spring", duration: 0.7, delay, delayChildren: delay + 0.2, staggerChildren: 0.2 },
	},
	exit: { scale: 0.6, opacity: 0, x: direction, transition: { duration: 0.2 } },
});
