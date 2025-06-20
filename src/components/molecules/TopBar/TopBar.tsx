import { component$, useSignal, $ } from '@builder.io/qwik';
import Button from '@/components/atoms/Button/Button';
import type { QRL } from '@builder.io/qwik';
import styles from './topbar.module.css';

interface TopbarProps {
  userName: string;
  userRole: string;
  avatarUrl: string;
  onLogout$: QRL<() => void>;
  onNavigateToProfile$: QRL<() => void>;
  onOpenSettings$: QRL<() => void>;
  onSearch$: QRL<(query: string) => void>;
}

const icons = [
    { icon: 'fa-solid fa-circle-user' },
    { icon: 'fa-solid fa-gear' },
    { icon: 'fa-solid fa-right-to-bracket' },
    { icon: 'fa-solid fa-calendar-days' },
];

export default component$<TopbarProps>(({
  userName,
  userRole,
  avatarUrl,
  onLogout$,
  onNavigateToProfile$,
  onOpenSettings$,
  onSearch$,
}) => {
  const showDropdown = useSignal(false);
  const closeTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = $(() => {
    if (closeTimeout.value) {
      clearTimeout(closeTimeout.value);
      closeTimeout.value = null;
    }
    showDropdown.value = true;
  });

  const handleMouseLeave = $(() => {
    closeTimeout.value = setTimeout(() => {
      showDropdown.value = false;
    }, 100);
  });

  return (
    <header class={styles.topbar}>
      <div class={styles.leftSection}>
        <input
          type="text"
          placeholder="Type to Search .."
          class={styles.searchInput}
          onInput$={$((e) => onSearch$((e.target as HTMLInputElement).value))}
        />
      </div>

      <div
        class={styles.userInfoWrapper}
        onMouseEnter$={handleMouseEnter}
        onMouseLeave$={handleMouseLeave}
      >
        <div class={styles.userInfo}>
          <img src={avatarUrl} alt="Avatar" class={styles.avatar} width="50" height="50" />
          <div class={styles.userDetails}>
            <div class={styles.name}>{userName}</div>
            <div class={styles.role}>{userRole}</div>
          </div>
        </div>

        <div class={[styles.dropdown, showDropdown.value ? styles.visible : styles.hidden]}>
          <Button 
            onClick$={onNavigateToProfile$} 
            label="Cuenta" 
            color="light" 
            type="outline" 
            icon='fa-solid fa-circle-user'
            class={styles.btnTopBar}
          />

          <Button 
            onClick$={onOpenSettings$} 
            label="Configuración" 
            color="light" 
            type="outline" 
            icon='fa-solid fa-gear'
            class={styles.btnTopBar}
          />

          <Button 
            onClick$={onLogout$} 
            label="Vigencia" 
            color="light" 
            type="outline"
            icon='fa-solid fa-calendar-days' 
            class={styles.btnTopBar}
          />
          
          <Button 
            onClick$={onLogout$} 
            label="Cerrar sesión" 
            color="light" 
            type="outline"
            icon='fa-solid fa-right-to-bracket'
            class={styles.btnTopBar}
          />

        </div>
      </div>
    </header>
  );
});
