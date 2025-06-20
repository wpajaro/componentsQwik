import { component$, useStore, useVisibleTask$, useSignal, Slot } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { apiClient } from '@/services/apiClient';
import { getUserFromToken } from '@/services/auth/handleLogin';
import TopBar from '@/components/molecules/TopBar/TopBar';
import { Sidebar } from '@/components/organisms/Sidebar/Sidebar';
import { PrimaryNav } from '@/components/molecules/PrimaryNav/PrimaryNav';
import Button from '@/components/atoms/Button/Button';
import styles from '@/styles/layout.module.css';
import type { Modulo } from '@/types/Modulo';
import { getCachedModulos } from '@/context/contextModule';

export default component$(() => {
  const loc = useLocation();
  const id = loc.params.id;
  const isSidebarOpen = useSignal(true);

  const toggleIcon = isSidebarOpen.value
    ? 'fa-solid fa-circle-chevron-left fa-2x'
    : 'fa-solid fa-circle-chevron-right fa-2x';

  const state = useStore<{
    modulo: Modulo | null;
    loading: boolean;
    error: string;
  }>({
    modulo: null,
    loading: true,
    error: '',
  });

  const user = getUserFromToken();
  const nombre = typeof user?.user === 'object' ? user.user.name : null;

  const todosLosModulos = getCachedModulos() ?? [];

  useVisibleTask$(async ({ track }) => {
    track(() => id);
    
    if (todosLosModulos?.length) {
      const moduloEncontrado = todosLosModulos.find((m) => m.id === parseInt(id));
      if (moduloEncontrado) {
        state.modulo = moduloEncontrado;
        state.loading = false;
        return;
      }
    }

    try {
      const res = await apiClient.get(`/api/modules/${id}`);
      state.modulo = res.data;
      console.log('Módulo desde API', res.data);
    } catch (err: any) {
      state.error = 'No se pudo cargar el módulo.';
    } finally {
      state.loading = false;
    }
  });

  const menuItems = !state.loading && state.modulo
    ? [
        {
          key: 'opciones-actuales',
          title: state.modulo.name.toUpperCase(),
          items: state.modulo.option.map((opt) => ({
            key: `option-${opt.id}`,
            title: opt.name,
            href: opt.url,
            //icon: 'fa-solid fa-arrow-right',
            //iconSize: 'sm' as const,
          })),
        },
        {
          key: 'modulos-usuario',
          title: 'CAMBIAR DE MÓDULO',
          items: todosLosModulos
            .filter((m) => m.id !== state.modulo?.id)
            .map((mod) => ({
              key: `mod-${mod.id}`,
              title: mod.name,
              href: `/modulos/${mod.id}`,
              //icon: 'fa-solid fa-layer-group',
              //iconSize: 'sm' as const,
            })),
        },
      ]
    : [];

  return (
    <div class={styles.layoutPage}>
      <header class={styles.header}>
        <TopBar
          userName={nombre || 'Invitado'}
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
        <Sidebar
          title="Módulos"
          isOpen={isSidebarOpen.value}
          menuItems={menuItems}
        />

        <div
          class={styles.sidebarToggleWrapper}
          style={{ left: isSidebarOpen.value ? '305px' : '70px', top: '5px' }}
        >
          <Button icon={toggleIcon} onClick$={() => (isSidebarOpen.value = !isSidebarOpen.value)} />
        </div>

        <main class={styles.mainContent}>
          <Slot />
        </main>
      </div>
    </div>
  );
});
