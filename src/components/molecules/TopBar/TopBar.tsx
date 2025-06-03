import { component$, $, useSignal, type QRL } from '@builder.io/qwik';
import Button from '~/components/atoms/Button/Button';
//import { Acordeon, type AccordionItem } from '../Accordion/Acordeon';
//import { Icon } from '~/components/atoms/Icon/Icon';
import styles from './topbar.module.css'

interface TopbarProps {
  userName: string;
  userRole: string;
  avatarUrl: string;
  onLogout$: QRL<() => void>;
  onNavigateToProfile$: QRL<() => void>;
  onOpenSettings$: QRL<() => void>;
  onSearch$: QRL<(query: string) => void>;
}

export default component$(({
  userName,
  userRole,
  avatarUrl,
  onLogout$,
  onNavigateToProfile$,
  onOpenSettings$,
  onSearch$,
}: TopbarProps) => {
  const showDropdown = useSignal(false);

  return (
    <header class={styles.topbar}>
      <div class={styles.leftSection}>
        <input
          type="text"
          placeholder="Type to Search .."
          class={styles.searchInput}
          onInput$={$(e => onSearch$((e.target as HTMLInputElement).value))}
        />
      </div>

      <div class={styles.rightSection}>
        {/* Aquí se podrían agregar íconos adicionales */}

        <div
          class={styles.userInfo}
          onClick$={() => (showDropdown.value = !showDropdown.value)}
        >
          <img src={avatarUrl} alt="Avatar" class={styles.avatar} width="50" height="50"/>
          <div class={styles.userDetails}>
            <div class={styles.name}>{userName}</div>
            <div class={styles.role}>{userRole}</div>
          </div>
        </div>

        {showDropdown.value && (
          <div class={styles.dropdown}>
            <Button onClick$={$(() => onNavigateToProfile$())} />
            <Button onClick$={$(() => onOpenSettings$())}>Configuración</Button>
            <Button onClick$={$(() => onLogout$())}>Cerrar sesión</Button>
          </div>
        )}
      </div>
    </header>
  );
});
