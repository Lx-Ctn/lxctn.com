import css from "./Avatar.module.scss";
import ImageWebp from "../ImageWebp";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useParallax } from "../../utils/useParallax";
import { get } from "../../store/selectors";
import { loadingCompleted } from "../../store/appSlice";
import { loading } from "../utils/AppLoader";

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
	const dispatch = useDispatch();
	const isIntro = useSelector(get.isIntro);
	const isLoaded = useSelector(get.isLoaded);
	const ref = useRef(null);

	// Get mouse coor from the center of the component :
	const coor = useParallax(ref, css.smoothTranslate);
	useEffect(() => {
		if (!isLoaded) {
			loading.whenAllisLoaded(() => dispatch(loadingCompleted()));
		}
		return () => loading.cleanUp();
	}, [dispatch, isLoaded]);

	return (
		<motion.div
			ref={ref}
			onClick={() => turnHead(ref)}
			className={css._}
			initial={isIntro && { scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
		>
			<ImageWebp
				style={translate({ all: -2.3, coor })}
				webp={getSrcset(avatarUrl + avatarSources.brush, avatarSources.webp)}
				png={getSrcset(avatarUrl + avatarSources.brush, avatarSources.png)}
				sizes={"30vmin"}
				alt="Brush behind Lx avatar"
				loadingListener={loading.listener}
			/>
			<ImageWebp
				webp={getSrcset(avatarUrl + avatarSources.torso, avatarSources.webp)}
				png={getSrcset(avatarUrl + avatarSources.torso, avatarSources.png)}
				sizes={"30vmin"}
				alt="Torso of Lx avatar"
				loadingListener={loading.listener}
			/>
			<div className={css.head}>
				<ImageWebp
					style={translate({ all: 2, coor })}
					webp={getSrcset(avatarUrl + avatarSources.head, avatarSources.webp)}
					png={getSrcset(avatarUrl + avatarSources.head, avatarSources.png)}
					sizes={"30vmin"}
					alt="head of Lx avatar"
					loadingListener={loading.listener}
				/>
				<ImageWebp
					className={"madEyes"}
					style={translate({ top: 2.2, bottom: 2.7, all: 3, coor })}
					webp={getSrcset(avatarUrl + avatarSources.eyes, avatarSources.webp)}
					png={getSrcset(avatarUrl + avatarSources.eyes, avatarSources.png)}
					sizes={"30vmin"}
					alt="Eyes of Lx avatar"
					loadingListener={loading.listener}
				/>
				<ImageWebp
					style={translate({ all: 2, coor })}
					webp={getSrcset(avatarUrl + avatarSources.eyesMask, avatarSources.webp)}
					png={getSrcset(avatarUrl + avatarSources.eyesMask, avatarSources.png)}
					sizes={"30vmin"}
					alt="Mask for Lx avatar"
					loadingListener={loading.listener}
				/>
			</div>
		</motion.div>
	);
};

// Get coor as ratio (0 -> 1) from center of the component (0) to the window edge (1) :
function getWindowRatio(coor) {
	const halfScreenWidth = window.innerWidth / 2;
	const halfScreenHeight = window.innerHeight / 2;
	const x = coor.x / halfScreenWidth;
	const y = coor.y / halfScreenHeight;

	// When scrolling, we go over -> need to limit the height ratio
	return { x, y: y > 1 ? 1 : y < -1 ? -1 : y };
}

function translate({ top, bottom, left, right, all = 0, coor }) {
	const { x, y } = getWindowRatio(coor);
	return {
		translate: `${x > 0 ? x * (right ?? all) : x * (left ?? all)}% ${
			y > 0 ? y * (bottom ?? all) : y * (top ?? all)
		}%`,
	};
}

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

function turnHead(ref) {
	const head = ref.current.querySelector("." + css.head);
	head.animate(turnHeadAnimation, { duration: 800 });

	const eyes = ref.current.querySelector(".madEyes");
	eyes.animate(madAnimation, { duration: 1200, delay: 200 });
}
