import { component$, Slot, jsx } from "@builder.io/qwik";
import { type QwikIntrinsicElements } from "@builder.io/qwik";
import clsx from "clsx";
import styles from "./card.module.css";

type BaseDivProps = QwikIntrinsicElements["div"];

export type CardProps = BaseDivProps & {
  as?: keyof HTMLElementTagNameMap;
  bordered?: boolean;
  shaded?: boolean | "hover";
  direction?: "row" | "column";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  classPrefix?: string;
  hoverLift?: boolean;
  contentAlign?: "start" | "center" | "end";
  buttonAlign?: "start" | "center" | "end";
  imagenAling?: "start" | "center" | "end";
  buttonSpacing?: "0" | "2" | "4" | "5";
  background?: string;
};

// Componente base
const CardBase = component$<CardProps>((props) => {
  const {
    as = "div",
    bordered = true,
    shaded = false,
    direction = "column",
    size = "md",
    width,
    classPrefix = "card",
    hoverLift = true,
    contentAlign = "start",
    buttonAlign = "end",
    imagenAling = "start",
    buttonSpacing = "2",
    class: className,
    background,
    ...rest
  } = props;

  const contentAlignClass = `${classPrefix}-content-${contentAlign}`;
  const buttonAlignClass = `${classPrefix}-buttons-${buttonAlign}`;
  const imagenAlignClass = `${classPrefix}-image-${imagenAling}`;
  const buttonSpacingClass = `${classPrefix}-button-spacing-${buttonSpacing}`;
  const Tag = as ?? "div";

  const classes = clsx(
    styles[classPrefix],
    bordered && styles[`${classPrefix}-bordered`],
    shaded && styles[`${classPrefix}-shaded${shaded === "hover" ? "-hover" : ""}`],
    styles[`${classPrefix}-${direction}`],
    styles[`${classPrefix}-${size}`],
    hoverLift && styles[`${classPrefix}-hover-lift`],
    styles[contentAlignClass],
    styles[buttonAlignClass],
    styles[imagenAlignClass],
    styles[buttonSpacingClass],
    background && styles[`${classPrefix}-bg-${background}`],
    className
  );

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
  };

  return jsx(
    Tag as string,
    {
      class: classes,
      style,
      ...rest,
      children: <Slot />,
    }
  );
});

// Subcomponentes
export const CardHeader = component$<QwikIntrinsicElements["div"]>(
  ({ class: className, ...rest }) => (
    <div class={clsx(styles['card-header'], className)} {...rest}>
      <Slot />
    </div>
  )
);

export const CardBody = component$<QwikIntrinsicElements["div"]>(
  ({ class: className, ...rest }) => (
    <div class={clsx(styles['card-body'], className)} {...rest}>
      <Slot />
    </div>
  )
);

export const CardFooter = component$<QwikIntrinsicElements["div"]>(
  ({ class: className, ...rest }) => (
    <div class={clsx(styles['card-footer'], className)} {...rest}>
      <Slot />
    </div>
  )
);

export const CardGroup = component$<{
  class?: string;
}>(({ class: className }) => {
  return (
    <div class={clsx(styles['card-group'], className)}>
      <Slot />
    </div>
  );
});

export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Group: CardGroup,
});