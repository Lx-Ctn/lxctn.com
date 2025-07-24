import css from "./AboutMe.module.scss";
import { contents } from "./AboutMe.content";
import type { AboutMeContent } from "./AboutMe.content";

import { motion } from "framer-motion";
import { animPropsNames, scrollPropsNames } from "../../utils/animation";
import { MultiStateToggle, Pseudo, LangIcons, ButtonLink } from "../../components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

export const AboutMe = () => {
	const [isLauching, setIsLauching] = useState(true);
	const onAnimationComplete = () => setIsLauching(false);

	const reducedMotion = useSelector(get.reducedMotion);
	const appWidth = useSelector(get.appWidth);

	const lang = "fr";
	const [selectedLang, setSelectedLang] = useState(lang);
	const toggleLang = () => {
		setSelectedLang(currentLang => (currentLang === "fr" ? "en" : "fr"));
	};
	const isFr = selectedLang === "fr";

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
			<MultiStateToggle
				title={isFr ? "Langue" : "Lang"}
				description={isFr ? "Changer le language" : "Switch language"}
				values={[
					{ value: "fr", icon: <LangIcons.Fr />, label: "fr" },
					{ value: "en", icon: <LangIcons.En />, label: "en" },
				]}
				defaultValue={lang}
				onChange={toggleLang}
				style={{ display: "inline-flex", margin: "2em auto 0" }}
			/>
			{contents.map((langGroup, i) => {
				const content = langGroup[selectedLang];
				return (
					<Section
						key={appWidth + i} // Force remount on resize to avoid framer-motion bug with IntersectionObserver
						reducedMotion={reducedMotion}
						direction={i % 2 === 0 ? appWidth / 3 : appWidth / -3} // Bug with framer-motion, it doesn't like % values
						delay={isLauching ? 0.3 + i / contents.length : 0} // staggering after main content on launch, then 0 when entering viewport
					>
						{<Content content={content} direction={i % 2 === 0 ? appWidth / 6 : appWidth / -6} />}
						{contents.length - 1 === i && (
							<ButtonLink to="/contact">{isFr ? "Contactez-moi !" : "Get in touch !"}</ButtonLink>
						)}
					</Section>
				);
			})}
		</motion.div>
	);
};

type SectionProps = { direction: number; children: React.ReactNode; delay: number; reducedMotion: boolean };
const Section = ({ direction, children, delay, reducedMotion }: SectionProps) => {
	const variants = slideInAnimation(direction, delay);
	return reducedMotion ? (
		<section>{children}</section>
	) : (
		<motion.section variants={variants} {...scrollPropsNames} viewport={{ margin: "-100px 0px 0px 0px" }}>
			{children}
		</motion.section>
	);
};

const Content = ({ content, direction }: { content: AboutMeContent; direction: number }) => {
	const variants = sectionChildrenAnimation(direction);
	return (
		<>
			<hgroup>
				<h3>{content.title}</h3>
				<motion.p variants={variants}>{content.subTitle}</motion.p>
			</hgroup>
			<div className={css.content}>
				{content.content.map((bloc, i) => (
					<motion.p key={i} variants={variants}>
						{bloc}
					</motion.p>
				))}
			</div>
		</>
	);
};

//
// Animation :

const AboutMePageAnimation = {
	initial: { scale: 0.4, opacity: 0 },
	animate: {
		scale: 1,
		opacity: 1,
		transition: { type: "spring" as const, duration: 0.4 },
	},
	exit: { scale: 0.4, opacity: 0, transition: { delay: 0.05, duration: 0.2 } },
};

const slideInAnimation = (direction: number, delay: number) => ({
	initial: { scale: 0.4, opacity: 0, x: direction },
	whileInView: {
		scale: 1,
		opacity: 1,
		x: 0,
		transition: {
			type: "spring" as const,
			duration: 0.7,
			delay,
			staggerChildren: 0.05,
		},
	},
	exit: { scale: 0.6, opacity: 0, x: direction, transition: { duration: 0.2 } },
});

const sectionChildrenAnimation = (direction: number) => ({
	initial: { scale: 0.6, opacity: 0, x: direction },
	whileInView: { scale: 1, opacity: 1, x: 0 },
});
