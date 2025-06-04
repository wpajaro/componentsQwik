import { component$, type QRL } from "@builder.io/qwik";
import styles from "./input.module.css"

interface InputProps {
    id?: string;
    label?: string;
    type?: "text" | "email" | "password" | "number" | "date" | "url" | "select" | "file";
    placeholder?: string;
    options?: string[];
    value?: string;
    onChange$?: QRL<(value: string) => void>;
    disabled?: boolean;
    height?: string;
    radius?: string;
}

export default component$(
    ({id, label, type = "text", placeholder, options, value, onChange$, disabled = false, height, radius}: InputProps) => {
        const personalizedStyles = {
            height: typeof height === "number" ? `${height}px` : height,
            borderRadius: typeof radius === "number" ? `${radius}px` : radius,
        };

    return (
        <div class="mb-3">
            <label class={`form-label fw-light ${styles.smallText}`}>{label}</label>

            {type === "select" ? (
                <select 
                    class={`form-select fw-light ${styles.smallText}`}
                    value={value}
                    onChange$={(e) => onChange$?.((e.target as HTMLSelectElement).value)} 
                    disabled={disabled}
                    style={personalizedStyles}
                >
                    <option value="">Seleccione una opción</option>
                    {options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    type={type}
                    class={`form-control fw-light ${styles.smallText}`}
                    placeholder={placeholder}
                    defaultValue={value}
                    onInput$={(e) => onChange$?.((e.target as HTMLInputElement).value )}
                    disabled={disabled}
                    style={personalizedStyles}
                />
            )}
        </div>
    );
});
