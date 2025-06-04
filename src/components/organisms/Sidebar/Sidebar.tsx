import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Icon } from '@/components/atoms/Icon/Icon';
import type { PropFunction } from '@builder.io/qwik';
import { Acordeon } from '@/components/molecules/Accordion/Acordeon';
import styles from './sidebar.module.css';


interface SidebarProps {
  onToggleSidebar$?: PropFunction<() => void>;
  isOpen: boolean;
}

export const Sidebar = component$<SidebarProps>(({ isOpen }) => {

  const menuItems = [
    {
      key: 'atoms',
      title: 'ÁTOMOS',
      items: [
        { key: 'buttons', title: 'Botones', href: '/components/buttons' },
        { key: 'input', title: 'Input', href: '/components/input' },
        { key: 'tag', title: 'Tag & Pill', href: '/components/tagPill' },
      ]
    },
    {
      key: 'molecules',
      title: 'MOLÉCULAS',
      items: [
        { key: 'accordion', title: 'Accordion', href: '/components/accordion' },
        { key: 'alert', title: 'Alerts', href: '/#' },
        { key: 'card', title: 'Tarjetas', href: '/components/card' },
        { key: 'progress', title: 'Progreso', href: '/components/progress' },
      ]
    },
    {
      key: 'organism',
      title: 'ORGANISMOS',
      items: [
        { key: 'loginP', title: 'Login Prueba', href: '/login', newTab: true },
        { key: 'login', title: 'Login', href: '/loginpage', newTab: true },
        { key: 'modals', title: 'Modales', href: '/components/modal' },
        { key: 'sidenav', title: 'Sidenav', href: '/#' },
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
            <Icon name="fa-solid fa-border-all" size='xl'/>
            Componentes 
          </h5>
        </div> 
        <Link href='/'>
          {isOpen && <span>Inicio</span>}
        </Link>
        <section>
          <Acordeon 
            variant='flush'
            colorScheme='light'
            items={menuItems}
            defaultOpenKeys={['components', 'docs']}
            multiple={true}
            bordered={false}
            onItemClick$={(key) => console.log('Item seleccionado:', key)}>
          </Acordeon>
        </section>
      </nav>
    </aside>
  );
});
