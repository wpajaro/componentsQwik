// /src/components/atoms/Logo.tsx
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  url?: string; 
}

export const Logo = component$<LogoProps>(({ src, alt, width = 120, height = 40, url }) => {
  const image = (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      style={{ objectFit: 'contain' }} 
    />
  );

  return url ? (
    <Link href={url} title={alt}>
      {image}
    </Link>
  ) : (
    image
  );
});
