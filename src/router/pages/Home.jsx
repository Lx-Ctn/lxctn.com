import { Avatar, AnimatedTitle } from "../../components";
import { DelayRender } from "../../components/utils";

export const Home = () => {
	return (
		<div className="intro-hero">
			<Avatar />
			<DelayRender delay={700}>
				<AnimatedTitle />
			</DelayRender>
		</div>
	);
};
