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
	<p>
		I'm a <Em>graphic designer</Em>, front-end developer, specialized in <Em>React</Em>
	</p>,
	<p>
		I'm a <Em>motion designer</Em>, front-end developer, specialized in <Em>React</Em>
	</p>,
];

const Section = ({ direction, children, delay, reducedMotion }) => {
	const variants = slideInAnimation(direction, delay);
	return (
		<motion.section variants={variants} {...(!reducedMotion && scrollPropsNames)} viewport={{ amount: 0.5 }}>
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
