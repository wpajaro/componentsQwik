import { component$, type QRL } from "@builder.io/qwik";
import styles from "./button.module.css";

interface ButtonProps {
  label?: string; 
  onClick$?: QRL<() => void>;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light";
  type?: "fill" | "outline";
  variant?: "default" | "large" | "small" | "extra-small" | "bold-border";
  disabled?: boolean;
  icon?: string;
}

export default component$(
    ({ label, onClick$, color = "primary", type = "fill", variant = "default", disabled = false, icon}: ButtonProps) => {
    const buttonLabel = label ? label : `${color.charAt(0).toUpperCase() + color.slice(1)} Button`;
    const computedVariant = disabled ? "disabled" : variant;
    const isIconOnly = icon && !label;

  return (
    <button
        type="button"
        onClick$={onClick$}
        class={[
          styles.btn,
          !isIconOnly && styles[type],
          !isIconOnly && styles[color],
          styles[computedVariant],
          isIconOnly && styles.iconOnly 
        ]}
        disabled={disabled}
      >
        {icon && <i class={icon} />}
        {label && <span>{buttonLabel}</span>}
      </button>
  );
});
