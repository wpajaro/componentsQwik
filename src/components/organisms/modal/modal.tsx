import { component$, Slot } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { JSXChildren } from "@builder.io/qwik";
import styles from "./modal.module.css";
import Button from "../../atoms/button/button";

interface ModalProps {
    show: boolean;
    onClose: PropFunction<() => void>;
    titulo?: string;
    children?: JSXChildren;
}

export default component$(({ show, onClose, titulo, children }: ModalProps) => {
    if (!show) return null;

    return (
        <div class={styles.overlay} onClick$={onClose}>
            <div class={styles.modal} onClick$={(e) => e.stopPropagation()}>
                <h2>{titulo}</h2>
                <div class={styles.content}>{children}
                    <Slot/>
                </div>
                <div class={styles.actions}>
                    <Button label="Seguir explorando →" color="primary" onClick$={() => console.log("Confirmado")} variant="default"/>
                </div>
            </div>
        </div>
    );
});

    