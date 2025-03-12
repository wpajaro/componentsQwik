import { component$, type QRL } from "@builder.io/qwik";
import styles from "./button.module.css";

interface ButtonProps {
  label?: string; 
  onClick$?: QRL<() => void>;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light";
  type?: "fill" | "outline";
  variant?: "default" | "large" | "small" | "extra-small" | "active" | "bold-border";
  disabled?: boolean;
}

export default component$(
    ({ label, onClick$, color = "primary", type = "fill", variant = "default", disabled = false}: ButtonProps) => {
    const buttonLabel = label ? label : `${color.charAt(0).toUpperCase() + color.slice(1)} Button`;
    const computedVariant = disabled ? "disabled" : variant;

  return (
    <button 
        type="button" 
        onClick$ = {onClick$} 
        class={`${styles.btn} ${styles[type]} ${styles[color]} ${styles[computedVariant]}`}
        disabled = {disabled}
    >
        {buttonLabel}
    </button>
  );
});
