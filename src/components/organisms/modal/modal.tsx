import { component$, Slot } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { JSXChildren } from "@builder.io/qwik";
import styles from "./modal.module.css"
import Button from "../../atoms/Button/Button";

interface ModalProps {
    show: boolean;
    onClose: PropFunction<() => void>;
    titulo?: string;
    children?: JSXChildren;
    class?: string;
    alignButtons?: "left" | "right" | "center" | "even";
    buttons?: {
        label: string; 
        color: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light";
        onClick$: PropFunction<() => void> } [];
}
    
export default component$(({ show, onClose, titulo, children, class: customClass, alignButtons = "center", buttons = [] }: ModalProps) => {
    if (!show) return null;
    
    return (
        <div class={styles.overlay} onClick$={onClose}>
            <div class={`${styles.modal} ${customClass}`} onClick$={(e) => e.stopPropagation()}>
                <h2>{titulo}</h2>
                <div class={styles.content}>{children}
                    <Slot/>
                </div>
                { buttons.length > 0 && (
                    <div class={[styles.actions, styles[alignButtons]]}>
                        {buttons.map((btn, index) => (
                            <Button key={index} label={btn.label} color={btn.color} onClick$={btn.onClick$} variant="default" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

    