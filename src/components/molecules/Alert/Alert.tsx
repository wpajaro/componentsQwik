/*
import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

export interface AlertProps extends QwikIntrinsicElements['div'] {
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
  dismissible?: boolean;
  showIcon?: boolean;
  role?: string;
  iconType?: keyof typeof iconAlerts; // Nueva prop para iconos personalizados
}

const iconAlerts: Record<string, string> = {
  check: "fa-solid fa-dollar-sign",  
  alert: "fa-solid fa-headphones",  
};  

const variantIcons: Record<string, string> = {
  primary: '💡',
  secondary: '🔘',
  success: '✅',
  danger: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  light: '🔆',
  dark: '🌑'
};

export const Alert = component$<AlertProps>(({ 
  color = "primary", 
  dismissible = false, 
  showIcon = true,
  role = "alert",
  iconType,
  class: className,
  ...props
}) => {
  // Determina qué icono usar
  const getIcon = () => {
    if (iconType && iconAlerts[iconType]) {
      return <i class={iconAlerts[iconType]}></i>;
    }
    return variantIcons[color];
  };

  return (
    <div 
      {...props}
      role={role}
      class={[
        'alert',
        `alert-${color}`,
        {
          'alert-dismissible': dismissible,
        },
        className
      ]}
    >
      {showIcon && (
        <span class="alert-icon">
          {getIcon()}
        </span>
      )}
      <div class="alert-content">
        <Slot />
      </div>
      {dismissible && (
        <button 
          type="button" 
          class="btn-close"
          aria-label="Close"
          onClick$={() => {
            // Lógica para cerrar la alerta
            if (props.id) {
              const element = document.getElementById(props.id);
              if (element) {
                element.style.display = 'none';
              }
            }
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
});*/