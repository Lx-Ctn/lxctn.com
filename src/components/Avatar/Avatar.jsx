import webpAvatar from "../../assets/Avatar/Avatar.webp";
import jpgAvatar from "../../assets/Avatar/Avatar.jpg";
import webpEyesMask from "../../assets/Avatar/Avatar_layered__Eyes_mask.webp";
import webpEyes from "../../assets/Avatar/Avatar_layered__Eyes.webp";
import webpHead from "../../assets/Avatar/Avatar_layered__Head.webp";
import webpTorso from "../../assets/Avatar/Avatar_layered__Torso.webp";
import webpBrush from "../../assets/Avatar/Avatar_layered__Brush.webp";

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

const FixedAvatar = () => (
	<div className={css._}>
		<ImageWebp webp={webpAvatar} jpg={jpgAvatar} alt="Lx avatar" />
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
				webp={webpBrush}
				jpg={jpgAvatar}
				alt="Brush behind Lx avatar"
			/>
			<ImageWebp webp={webpTorso} jpg={jpgAvatar} alt="Torso of Lx avatar" />
			<div className={css.head}>
				<ImageWebp style={translate({ all: 2 })} webp={webpHead} jpg={jpgAvatar} alt="head of Lx avatar" />
				<ImageWebp
					className={"madEyes"}
					style={translate({ top: 2.2, bottom: 2.7, all: 3 })}
					webp={webpEyes}
					jpg={jpgAvatar}
					alt="Eyes of Lx avatar"
				/>
				<ImageWebp
					style={translate({ all: 2 })}
					webp={webpEyesMask}
					jpg={jpgAvatar}
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
