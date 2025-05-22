import { component$ } from '@builder.io/qwik';

type ColoresPredefinidos = 
  |'primary' 
  | 'secondary' 
  | 'success' 
  | 'info' 
  | 'warning' 
  | 'danger' 
  | 'light';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: ColoresPredefinidos | string;
  class?: string;
}

export const Icon = component$<IconProps>(({ name, size = 'md', color = 'inherit', class: extraClass }) => {
  
  const IconColor = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    success: 'var(--success)',
    info: 'var(--info)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
    light: 'var(--light)',
  };
  
  const fontSize = {
    sm: '0.8rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }[size];

  const XColor = 
    typeof color === 'string' && color in IconColor
    ? IconColor[color as ColoresPredefinidos]
    : color;

  return (
    <i 
      class={`${name} ${extraClass ?? ''}`}
      style={{
        fontSize,
        color: XColor
      }}
    />
  );
});
