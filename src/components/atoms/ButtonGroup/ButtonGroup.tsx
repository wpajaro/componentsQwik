import { component$, type PropFunction } from '@builder.io/qwik';

interface ButtonConfig {
  variant: string;            
  label: string;              
  outline?: boolean;          
  disabled?: boolean;         
  onClick$?: PropFunction<() => void>;
}

interface ButtonGroupProps {
  buttons: ButtonConfig[];
}

export const ButtonGroup = component$(({ buttons }: ButtonGroupProps) => {
  return (
    <div class="flex flex-wrap gap-2">
      {buttons.map(({ variant, label, outline, disabled, onClick$ }) => {
        const styleClass = outline
          ? `btn btn-outline-${variant}`
          : `btn btn-${variant}`;
        return (
          <button
            key={variant + label}
            type="button"
            class={styleClass}
            disabled={disabled}
            onClick$={onClick$}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
});
