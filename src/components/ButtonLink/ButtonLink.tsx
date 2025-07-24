import { Link, LinkProps } from "react-router-dom";
import { ShiningFrame } from "../ShiningFrame/ShiningFrame";

type ButtonLinkProps = {
	to: LinkProps["to"];
	children: React.ReactNode;
};
export const ButtonLink = ({ to, children }: ButtonLinkProps) => {
	return (
		<Link className="button" to={to}>
			<ShiningFrame />
			{children}
		</Link>
	);
};
