import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

const CenterContainer = ({
	children,
	className = "",
	hideBackButton = false,
}: {
	children?: string | JSX.Element | JSX.Element[] | ReactNode | null;
	className?: string;
	hideBackButton?: boolean;
}) => {
	return (
		<div className="flex h-screen relative">
			{!hideBackButton && <BackButton/>}
			<div
				className={"m-auto " + className} /* className="m-auto w-1/2" */
			>
				{children}
			</div>
		</div>
	);
};

export default CenterContainer;
