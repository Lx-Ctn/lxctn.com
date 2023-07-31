import css from "./ContactCard.module.scss";
import { motion } from "framer-motion";
import { Pseudo } from "../Pseudo/Pseudo";

export const ContactCard = () => {
	return (
		<motion.div className={css._}>
			<Pseudo inLineLimit={555} />
			<p>
				Tel : <a href="tel:0658529939">06 58 52 99 39</a>
			</p>
			<p>
				Mail : <a href="mailto:design@lxctn.com">design@lxctn.com</a>
			</p>
			<p>
				Github : <a href="https://github.com/Lx-Ctn?tab=repositories">Lx-Ctn</a>
			</p>
		</motion.div>
	);
};
