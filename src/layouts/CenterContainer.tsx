import { ReactNode } from "react";

const CenterContainer = ({
	children,
	className = "",
}: {
	children?: string | JSX.Element | JSX.Element[] | ReactNode | null;
	className?: string;
}) => {
	return (
		<div className="flex h-screen">
			<div
				className={"m-auto " + className} /* className="m-auto w-1/2" */
			>
				{children}
			</div>
		</div>
	);
};

export default CenterContainer;
