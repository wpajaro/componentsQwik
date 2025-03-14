import { component$, type QRL } from "@builder.io/qwik";
import styles from "./tagPill.module.css"


interface tag_pillProps {
    label?: string;
    onClick?: QRL<() => void>;
    color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
    type?: 
            "contextual" 
            | "pill" 
            | "number_badge" 
            | "number-pill" 
            | "badge_icons" 
            | "pill_icons" 
            | "badge_heading"
            | "badge_button";
    icon?: string;
    headingLevel?: string;
}

const iconMap: Record<string, string> = {
    primary: "fa-solid fa-dollar-sign",  
    secondary: "fa-solid fa-headphones",  
    success: "fa-solid fa-link",  
    info: "fa-solid fa-code-branch",  
    warning: "fa-solid fa-award",  
    danger: "fa-solid fa-circle-user",  
    light: "fa-solid fa-envelope",
    dark: "fa-solid fa-robot"
}

const buttonIconMap: Record<string, string> = {
    primary: "fa-solid fa-envelope",  
    secondary: "fa-solid fa-bell",  
    success: "fa-solid fa-gear",  
    info: "fa-solid fa-music",  
    warning: "fa-solid fa-triangle-exclamation"
}


export default component$(
    ({ label, onClick, color = "primary", type = "contextual", icon, headingLevel }: tag_pillProps) => {
        const tagPillLabel = label ?? "";  
        const mostrarIcono = (type === "badge_icons" || type === "pill_icons" || type === "badge_button");
        const selectedIcon = icon
            ? icon
            : type === "badge_button"
                ? buttonIconMap[color] || "fa-solid fa-hand-pointer"
                : iconMap[color];

    return (
        <span
            class={`${styles.tagPill} ${styles[color]} ${styles[type]}`} 
            style={{
                fontSize: type === "badge_heading" && headingLevel ? `calc(2rem - ${parseInt(headingLevel.replace("h", "")) * 0.2}rem)` : "1rem"
              }}
            onClick$={onClick}>   

            {type !== "badge_button" && mostrarIcono && <i class={selectedIcon}></i>}  
            {tagPillLabel}
            {type === "badge_button" && mostrarIcono && <i class={selectedIcon}></i>}
            
        </span>
    );

});
