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
import { useRef, useState } from "react";
import { useParallax } from "../../utils/useParallax";

export const Avatar = () => {
	const prefersReducedMotion = useSelector(state => state.app.prefersReducedMotion);

	const ref = useRef(null);
	const coor = useParallax(ref, css.smoothTranslate);

	const OFFSET = 150;

	const translate = ({ ratio = 1, flee = false } = {}) => ({
		translate: `${(flee ? -coor.x : coor.x) / (OFFSET * ratio)}% ${
			(flee ? -coor.y : coor.y) / (OFFSET * ratio)
		}%`,
	});

	const [isMad, setIsMad] = useState(false);
	const giveMadEyes = () => {
		setIsMad(isMad => !isMad);
	};

	return prefersReducedMotion ? (
		<div className={css._}>
			<ImageWebp webp={webpAvatar} jpg={jpgAvatar} alt="Lx avatar" />
		</div>
	) : (
		<motion.div
			ref={ref}
			onClick={giveMadEyes}
			className={css._}
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
		>
			<ImageWebp
				style={translate({ flee: true })}
				webp={webpBrush}
				jpg={jpgAvatar}
				alt="Brush behind Lx avatar"
			/>
			<ImageWebp webp={webpTorso} jpg={jpgAvatar} alt="Torso of Lx avatar" />
			<ImageWebp style={translate()} webp={webpHead} jpg={jpgAvatar} alt="head of Lx avatar" />
			<ImageWebp
				className={isMad ? css.flash : ""}
				style={translate({ ratio: 0.8 })}
				webp={webpEyes}
				jpg={jpgAvatar}
				alt="Eyes of Lx avatar"
			/>
			<ImageWebp style={translate()} webp={webpEyesMask} jpg={jpgAvatar} alt="Mask for Lx avatar" />
		</motion.div>
	);
};
