import { component$, Slot, useSignal } from '@builder.io/qwik';
import { Sidebar } from '~/components/organisms/Sidebar/Sidebar';
import { PrimaryNav } from '~/components/molecules/PrimaryNav/PrimaryNav';
import Button from '~/components/atoms/Button/Button';
import TopBar from '~/components/molecules/TopBar/TopBar';
import styles from '~/components/organisms/Sidebar/sidebar.module.css';
//import stylesLayout from '../styles/layout.css';

export default component$(() => {
  const isSidebarOpen = useSignal(true); 
  const toggleIcon = isSidebarOpen.value
  ? "fa-solid fa-circle-chevron-left fa-2x"
  : "fa-solid fa-circle-chevron-right fa-2x";

  return (
    <div class={styles.layoutPage}>
      <TopBar
        userName="Wilfran Pájaro"
        userRole="Desarrollador"
        avatarUrl="https://via.placeholder.com/50"
        onLogout$={() => console.log('Logout clicked')}
        onNavigateToProfile$={() => console.log('Navigate to Profile clicked')}
        onOpenSettings$={() => console.log('Open Settings clicked')}
        onSearch$={(query) => console.log('Search query:', query)}
      /> 
      <div class={styles.layoutWrapper}>
        <PrimaryNav/>
        <Sidebar isOpen={isSidebarOpen.value} />

        <div class={styles.sidebarToggleWrapper} style={{left: isSidebarOpen.value ? '295px' : '70px'}}>
          <Button icon={toggleIcon} onClick$={() => (isSidebarOpen.value = !isSidebarOpen.value)}/>
        </div>

        <main class={styles.mainContent}>
          <Slot />
        </main>
      </div>
    </div> 
  );
});