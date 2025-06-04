import { component$, Slot, useSignal } from '@builder.io/qwik';
import { Sidebar } from '@/components/organisms/Sidebar/Sidebar';
import { PrimaryNav } from '@/components/molecules/PrimaryNav/PrimaryNav';
import Button from '@/components/atoms/Button/Button';
import TopBar from '@/components/molecules/TopBar/TopBar';
import styles from '@/styles/layout.module.css'


export default component$(() => {
  const isSidebarOpen = useSignal(true);

  const toggleIcon = isSidebarOpen.value
    ? 'fa-solid fa-circle-chevron-left fa-2x'
    : 'fa-solid fa-circle-chevron-right fa-2x';

  return (
    <div class={styles.layoutPage}>
  <header class={styles.header}>
    <TopBar
      userName="Wilfran Pájaro"
      userRole="Desarrollador"
      avatarUrl="/images/deadpool-pro.png"
      onLogout$={() => console.log('Logout clicked')}
      onNavigateToProfile$={() => console.log('Navigate to Profile clicked')}
      onOpenSettings$={() => console.log('Open Settings clicked')}
      onSearch$={(query) => console.log('Search query:', query)}
    />
  </header>

  <div class={styles.bodyContainer}>
    <PrimaryNav />
    <Sidebar isOpen={isSidebarOpen.value} />

    <div class={styles.sidebarToggleWrapper} style={{ left: isSidebarOpen.value ? '305px' : '70px', top: '5px' }}>
      <Button icon={toggleIcon} onClick$={() => (isSidebarOpen.value = !isSidebarOpen.value)} />
    </div>

    <main class={styles.mainContent}>
      <Slot />
    </main>
  </div>
</div>

  );
});
