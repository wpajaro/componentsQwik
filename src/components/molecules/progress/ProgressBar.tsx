import { component$ } from '@builder.io/qwik';
import styles from './progress.module.css';

interface ProgressBarProps {
  value?: number;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light';
}

const ProgressBar = component$(({ value, color = "primary" }: ProgressBarProps) => {
  const progressStyle = {
    width: `${value}%`,
    backgroundColor: `var(--${color})`,
  };

  return (
    <div class="progress mb-2">
      <div
        class={`${styles.progressBar} ${styles[color]}`}
        role="progressbar"
        style={progressStyle}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
});

export default ProgressBar;
