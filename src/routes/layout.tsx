import { component$, Slot, useSignal } from '@builder.io/qwik';
import { Sidebar } from '~/components/organisms/Sidebar/Sidebar';
import { PrimaryNav } from '~/components/molecules/PrimaryNav/PrimaryNav';
import Button from '~/components/atoms/Button/Button';
import styles from '~/components/organisms/Sidebar/sidebar.module.css';

export default component$(() => {
  const isSidebarOpen = useSignal(true); 
  const toggleIcon = isSidebarOpen.value
  ? "fa-solid fa-circle-chevron-left fa-2x"
  : "fa-solid fa-circle-chevron-right fa-2x";

  return (
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
  );
});
