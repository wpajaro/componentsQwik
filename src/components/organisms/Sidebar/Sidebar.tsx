import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Icon } from '~/components/atoms/Icon/Icon';
import type { PropFunction } from '@builder.io/qwik';
import { Accordion } from '~/components/molecules/Accordion/Accordion';
import styles from './sidebar.module.css';

interface SidebarProps {
  onToggleSidebar$?: PropFunction<() => void>;
  isOpen: boolean;
}

export const Sidebar = component$<SidebarProps>(({ isOpen }) => {

  const menuItems = [
    {
      key: 'atoms',
      title: 'Atomos',
      items: [
        { key: 'buttons', title: 'Botones', href: '/buttons' },
        { key: 'modals', title: 'Modales', href: '/modal' },
      ]
    },
    {
      key: 'molecules',
      title: 'Moleculas',
      items: [
        { key: 'card', title: 'Tarjetas', href: '/card' },
        { key: 'progress', title: 'Progreso', href: '/progress' },
      ]
    },
  ]
  return (
    <aside class={[
      styles.sidebar,
      isOpen ? styles.expanded : styles.collapsed
    ]}>
      <nav class={styles.sidebarNav}>
        <div class={styles.sectionTitulo}>
          <h5>
            <Icon name="fa-solid fa-border-all" size='xl' />
            Componentes 
          </h5>
        </div> 
        <Link href='/'>
          {isOpen && <span>Inicio</span>}
        </Link>
        <Accordion items={menuItems} appearance='default' defaultOpenKeys={['components', 'docs']}
        onItemClick$={(key) => console.log('Item seleccionado:', key)}>
        </Accordion>
      </nav>
    </aside>
  );
});
