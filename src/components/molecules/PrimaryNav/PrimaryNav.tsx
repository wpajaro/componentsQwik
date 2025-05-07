import { component$ } from '@builder.io/qwik';
import { Logo } from '~/components/atoms/Logo/Logo';
import { Icon } from '~/components/atoms/Icon/Icon';
import TagPill from '~/components/atoms/TagPill/TagPill';
import styles from '../../organisms/Sidebar/sidebar.module.css';

export const PrimaryNav = component$(() => {
  const icons = [
    { icon: 'fa-solid fa-house', label: 'Inicio' },
    { icon: 'fa-solid fa-search', label: 'Buscar' },
    { icon: 'fa-solid fa-book', label: 'Docs' },
    { icon: 'fa-solid fa-wrench', label: 'Tools' },
    { icon: 'fa-brands fa-github', label: 'GitHub' }
  ];

  return (
    <nav class={styles.primaryNav}>
      <div>
        <div class={styles.sidebarHeader}>
          <Logo src="/images/logo_siud_nt_1.png" alt="Imagen del Logo" width={70} height={60} />
        </div>
      </div>
      {icons.map((item) => (
        <div key={item.label} class={styles.navIconWrapper}>
          <Icon name={item.icon} class={styles.navIcon}/>
          <div class={styles.tooltip}>
            <TagPill label={item.label} type="pill" color="secondary"/>
          </div>
        </div>
      ))}
    </nav>
  );
});
