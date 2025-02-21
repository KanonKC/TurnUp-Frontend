export function queueCardStyle() {
    let css = "";

    if (active) {
        css = "bg-[#4d4d4d] ";
    }

    if (variant === "TOP") {
        return css + "rounded-t-lg ";
    } else if (variant === "MID") {
        return css + "";
    } else if (variant === "BOTTOM") {
        return css + "rounded-b-lg ";
    } else if (variant === "ROUND") {
        return css + "rounded-lg ";
    }
}