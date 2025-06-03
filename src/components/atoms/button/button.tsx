import { component$, type QRL, type JSX } from "@builder.io/qwik";
import styles from "./button.module.css";

interface ButtonProps {
  label?: string; 
  onClick$?: QRL<() => void>;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light";
  type?: "fill" | "outline";
  variant?: "default" | "large" | "small" | "extra-small" | "bold-border";
  appearance?: "clasico" | "accordion";
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
  suffix?: JSX.Element;
}

// Agregar margin 5px de lado y lado
export default component$(
    ({ 
      label, 
      onClick$, 
      color = "primary", 
      type = "fill", 
      variant = "default", 
      appearance = "clasico",
      disabled = false, 
      icon, 
      fullWidth, 
      suffix,
    }: ButtonProps) => {
    const buttonLabel = label ? label : `${color.charAt(0).toUpperCase() + color.slice(1)} Button`;
    const computedVariant = disabled ? "disabled" : variant;
    const isIconOnly = icon && !label;

  return (
    <button
        type="button"
        onClick$={onClick$}
        class={[
          appearance === 'accordion' ? styles.apparienceAccordion : styles.btn,
          styles.btn,
          !isIconOnly && styles[type],
          !isIconOnly && styles[color],
          styles[computedVariant],
          isIconOnly && styles.iconOnly,
          fullWidth && styles.fullWidth
        ]}
        disabled={disabled}
      >
        {icon && <i class={icon} />}
        {label && <span>{buttonLabel}</span>}
        {suffix && <span class={styles.suffix}>{suffix}</span>}
      </button>
  );
});
