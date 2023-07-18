import { Avatar, ContactCard } from "../../components";
import css from "./Contact.module.scss";

export const Contact = () => {
	return (
		<div className={css._}>
			<div className={css.bubble}>
				<div className={css.avatar_container}>
					<Avatar />
				</div>
			</div>
			<ContactCard />
		</div>
	);
};
