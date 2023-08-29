import css from "./Avatar.module.scss";
import ImageWebp from "../ImageWebp";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useParallax } from "../../utils/useParallax";
import { get } from "../../store/selectors";
export const Avatar = () => {
	const reducedMotion = useSelector(get.reducedMotion);
	return reducedMotion ? <FixedAvatar /> : <AnimatedAvatar />;
};

const avatarUrl = "Avatar/Avatar";
const avatarSources = {
	eyesMask: "_layered__Eyes_mask",
	eyes: "_layered__Eyes",
	head: "_layered__Head",
	torso: "_layered__Torso",
	brush: "_layered__Brush",

	webp: { "150w": "@150.webp", "300w": "@300.webp", "500w": "@500.webp" },
	png: { "150w": "@150.png", "300w": "@300.png", "500w": "@500.png" },
	jpg: { "150w": "@150.jpg", "300w": "@300.jpg", "500w": "@500.jpg" },
};

const getSrcset = (url, source) =>
	source
		? Object.keys(source).reduce(
				(srcset, size) => `${srcset}, ${require(`../../assets/${url + source[size]}`)} ${size}`,
				""
		  )
		: "";

const FixedAvatar = () => (
	<div className={css._}>
		<ImageWebp
			webp={getSrcset(avatarUrl, avatarSources.webp)}
			jpg={getSrcset(avatarUrl, avatarSources.jpg)}
			sizes={"30vmin"}
			alt="Lx avatar"
		/>
	</div>
);

const AnimatedAvatar = () => {
	const isIntro = useSelector(get.isIntro);
	const ref = useRef(null);
	// Get mouse coor from the center of the component :
	const coor = useParallax(ref, css.smoothTranslate);

	const translate = ({ top, bottom, left, right, all = 0 }) => {
		const { x, y } = getWindowRatio(coor);
		return {
			translate: `${x > 0 ? x * (right ?? all) : x * (left ?? all)}% ${
				y > 0 ? y * (bottom ?? all) : y * (top ?? all)
			}%`,
		};
	};

	const turnHead = () => {
		const head = ref.current.querySelector("." + css.head);
		head.animate(turnHeadAnimation, { duration: 800 });

		const eyes = ref.current.querySelector(".madEyes");
		eyes.animate(madAnimation, { duration: 1200, delay: 200 });
	};

	return (
		<motion.div
			ref={ref}
			onClick={turnHead}
			className={css._}
			initial={isIntro && { scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
		>
			<ImageWebp
				style={translate({ all: -2.3 })}
				webp={getSrcset(avatarUrl + avatarSources.brush, avatarSources.webp)}
				png={getSrcset(avatarUrl + avatarSources.brush, avatarSources.png)}
				sizes={"30vmin"}
				alt="Brush behind Lx avatar"
			/>
			<ImageWebp
				webp={getSrcset(avatarUrl + avatarSources.torso, avatarSources.webp)}
				png={getSrcset(avatarUrl + avatarSources.torso, avatarSources.png)}
				sizes={"30vmin"}
				alt="Torso of Lx avatar"
			/>
			<div className={css.head}>
				<ImageWebp
					style={translate({ all: 2 })}
					webp={getSrcset(avatarUrl + avatarSources.head, avatarSources.webp)}
					png={getSrcset(avatarUrl + avatarSources.head, avatarSources.png)}
					sizes={"30vmin"}
					alt="head of Lx avatar"
				/>
				<ImageWebp
					className={"madEyes"}
					style={translate({ top: 2.2, bottom: 2.7, all: 3 })}
					webp={getSrcset(avatarUrl + avatarSources.eyes, avatarSources.webp)}
					png={getSrcset(avatarUrl + avatarSources.eyes, avatarSources.png)}
					sizes={"30vmin"}
					alt="Eyes of Lx avatar"
				/>
				<ImageWebp
					style={translate({ all: 2 })}
					webp={getSrcset(avatarUrl + avatarSources.eyesMask, avatarSources.webp)}
					png={getSrcset(avatarUrl + avatarSources.eyesMask, avatarSources.png)}
					sizes={"30vmin"}
					alt="Mask for Lx avatar"
				/>
			</div>
		</motion.div>
	);
};

// Get coor as ratio (0 -> 1) from center of the component (0) to the window edge (1) :
const getWindowRatio = coor => {
	const halfScreenWidth = window.innerWidth / 2;
	const halfScreenHeight = window.innerHeight / 2;
	const x = coor.x / halfScreenWidth;
	const y = coor.y / halfScreenHeight;

	// When scrolling, we go over -> need to limit the height ratio
	return { x, y: y > 1 ? 1 : y < -1 ? -1 : y };
};

const turnHeadAnimation = [
	{ offset: 0.2, rotate: "-3deg" },
	{ offset: 0.4, rotate: "3deg" },
	{ offset: 0.6, rotate: "-3deg" },
	{ offset: 0.8, rotate: "3deg" },
];
const madAnimation = [
	{ offset: 0.11, transform: "translate(0%, 0.7%)" },
	{ offset: 0.22, transform: "translate(-0.9%, 0%)" },
	{ offset: 0.33, transform: "translate(0%, -0.7%)" },
	{ offset: 0.44, transform: "translate(0.7%, 0%)" },
	{ offset: 0.55, transform: "translate(0%, 0.7%)" },
	{ offset: 0.66, transform: "translate(-0.9%, 0%)" },
	{ offset: 0.77, transform: "translate(0%, -0.7%)" },
	{ offset: 0.88, transform: "translate(0.7%, 0%)" },
];
