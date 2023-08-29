import { motion } from "framer-motion";

export const Em = props => {
	return (
		<motion.em
			variants={emAnimation} //whileInView={emAnimation.whileInView}
		>
			{props.children}
		</motion.em>
	);
};

const emAnimation = {
	initial: { backgroundPosition: "0%" },
	whileInView: { backgroundPosition: "100%", transition: { duration: 0.7 } },
};
