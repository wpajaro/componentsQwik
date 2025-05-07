{/*
import { component$, Slot } from "@builder.io/qwik";
import type { JSXChildren } from "@builder.io/qwik";
import styles from "./card.module.css";

interface CardProps {
  children?: JSXChildren;
  style?: {
    borderRadius?: string;
    backgroundColor?: string;
  };
  imageAlign?: "left" | "right" | "center";
  buttonAlign?: "start" | "center" | "end";
  buttonSpacing?: "0" | "2" | "4" | "5";
}

export default component$(
  ({
    style,
    imageAlign = "left",
    buttonAlign = "end",
    buttonSpacing = "4",
  }: CardProps) => {
    const flexDirection =
      imageAlign === "right"
        ? "flex-row-reverse"
        : imageAlign === "center"
        ? "flex-column align-items-center text-center"
        : "flex-row";

    return (
      <div
        class={`card shadow-sm p-4 ${styles.card}`}
        style={{
          borderRadius: style?.borderRadius || "8px",
          backgroundColor: style?.backgroundColor || "white",
        }}
      >
        <div class={`d-flex gap-3 ${flexDirection}`}>
          <Slot name="image" />
          <div class="w-100">
            <Slot />
          </div>
        </div>

        <div class={`w-100 text-${buttonAlign} mb-${buttonSpacing}`}>
          <Slot name="button" />
        </div>
      </div>
    );
  }
);

*/}