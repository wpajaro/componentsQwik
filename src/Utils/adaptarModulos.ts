import type { Modulo } from '@/types/Modulo';
import type { SidebarProps } from '@/components/organisms/Sidebar/Sidebar';

export const adaptarModulosASidebar = (modulos: Modulo[]): SidebarProps['menuItems'] => {
  return modulos.map((modulo) => ({
    key: `modulo-${modulo.id}`,
    title: modulo.name,
    items: modulo.option.map((option) => ({
        key: `option-${option.id}`,
        title: option.name,
        href: option.url,
        icon: 'fa-solid fa-link',
        iconSize: 'sm',
        }))   
    }));
};
