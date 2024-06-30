import { cn } from "@/lib/utils";
import React from "react";

const TitleHeader = ({
    children,
    colorless=false
}:{
    children?: React.ReactNode,
    colorless?: boolean
}) => {
	return (
		<h1 className={cn("text-6xl text-center", {
            "themed-color": !colorless
        })}>
            {children}
        </h1>
	);
};

export default TitleHeader;
