import css from "./ShiningFrame.module.scss";

export const ShiningFrame = ({ angle = {}, ...props }) => {
	return (
		<div className={css._} style={{ "--rotate-from": angle?.from, "--rotate-to": angle?.to }} {...props}>
			<div className={css.halo} />
			<div className={css.spinning_frame} />
			{props.children}
		</div>
	);
};
