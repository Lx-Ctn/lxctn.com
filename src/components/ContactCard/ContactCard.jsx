import css from "./ContactCard.module.scss";
import { motion } from "framer-motion";
import { Pseudo } from "../Pseudo/Pseudo";

export const ContactCard = () => {
	return (
		<motion.div className={css._}>
			<Pseudo inLineLimit={358} />
			<address>
				<dl>
					<div className={css.contactLine}>
						<dt>Tel : </dt>{" "}
						<dd>
							<a href="tel:0658529939">06 58 52 99 39</a>
						</dd>
					</div>
					<div className={css.contactLine}>
						<dt>Mail : </dt>{" "}
						<dd>
							<a href="mailto:design@lxctn.com?subject=Demande de contact | lxctn.com&body=Bonjour !%0A%0AJe souhaiterais m’entretenir avec vous à propos d'un projet,%0AMerci de recontacter : %0A%0AMr / Mme : %0ATéléphone : %0AMail : %0AObjet : %0A%0ABien cordialement,">
								design@lxctn.com
							</a>
						</dd>
					</div>
					<div className={css.contactLine}>
						<dt>Github : </dt>{" "}
						<dd>
							<a href="https://github.com/Lx-Ctn?tab=repositories">Lx-Ctn</a>
						</dd>
					</div>
				</dl>
			</address>
		</motion.div>
	);
};
