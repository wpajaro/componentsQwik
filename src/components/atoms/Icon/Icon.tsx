import { component$ } from '@builder.io/qwik';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  class?: string;
}

export const Icon = component$<IconProps>(({ name, size = 'md', color = 'inherit', class: extraClass }) => {
  const fontSize = {
    sm: '0.8rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }[size];

  return (
    <i 
      class={`${name} ${extraClass ?? ''}`}
      style={{
        fontSize,
        color,
      }}
    />
  );
});
