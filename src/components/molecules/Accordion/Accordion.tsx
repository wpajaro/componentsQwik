import { component$, useSignal, $, Slot } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './accordion.module.css';

export interface AccordionItem {
  key: string;
  title: string;
  icon?: any;
  href?: string;
  content?: string;
  items?: AccordionItem[];
}

export interface AccordionProps {
  appearance?: 'default' | 'inverse' | 'subtle';
  items: AccordionItem[];
  activeKey?: string;
  defaultOpenKeys?: string[];
  onItemClick$?: PropFunction<(key: string) => void>;
  class?: string;
}

export const Accordion = component$<AccordionProps>((props) => {
  const appearance = props.appearance || 'default';
  const openKeys = useSignal<Set<string>>(new Set(props.defaultOpenKeys || []));

  const toggleMenu = $((key: string) => {
    const newOpenKeys = new Set(openKeys.value);
    if (newOpenKeys.has(key)) {
      newOpenKeys.delete(key);
    } else {
      newOpenKeys.add(key);
    }
    openKeys.value = newOpenKeys;
  });

  const isMenuOpen = (key: string) => {
    return openKeys.value.has(key);
  };

  const handleItemClick = $((key: string) => {
    if (props.onItemClick$) {
      props.onItemClick$(key);
    }
  });

  const renderItem = (item: AccordionItem) => {
    if (item.items) {
      return (
        <li class={styles.accordionItem}>
          <div 
            class={[
              styles.accordionMenuHeader,
              props.activeKey === item.key ? styles.accordionHeaderActive : ''
            ]}
            onClick$={() => toggleMenu(item.key)}
          >
            {item.icon && <span class={styles.accordionIcon}><Slot name={`icon-${item.key}`} /></span>}
            <span class={styles.accordionTitle}>{item.title}</span>
            <span class={[
              styles.accordionArrow,
              isMenuOpen(item.key) ? styles.accordionArrowOpen : ''
            ]}>
              <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path fill="currentColor" d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path>
              </svg>
            </span>
          </div>
          <div class={[
            styles.accordionContent,
            isMenuOpen(item.key) ? styles.accordionContentExpanded : styles.accordionContentCollapsed
          ]}>
            <ul>
              {item.items.map(subItem => renderItem(subItem))}
            </ul>
          </div>
        </li>
      );
    }

    return (
      <li class={styles.accordionItem}>
        {item.href ? (
          <Link 
            href={item.href}
            class={[
              styles.accordionHeader,
              props.activeKey === item.key ? styles.accordionHeaderActive : ''
            ]}
            onClick$={() => handleItemClick(item.key)}
          >
            {item.icon && <span class={styles.accordionIcon}><Slot name={`icon-${item.key}`} /></span>}
            <span>{item.title}</span>
          </Link>
        ) : (
          <div 
            class={[
              styles.accordionHeader,
              props.activeKey === item.key ? styles.accordionHeaderActive : ''
            ]}
            onClick$={() => handleItemClick(item.key)}
          >
            {item.icon && <span class={styles.accordionIcon}><Slot name={`icon-${item.key}`} /></span>}
            <span>{item.title}</span>
          </div>
        )}
        {item.content && (
          <div class={[
            styles.accordionContent,
            isMenuOpen(item.key) ? styles.accordionContentExpanded : styles.accordionContentCollapsed
          ]}>
            {item.content}
          </div>
        )}
      </li>
    );
  };

  return (
    <div class={[
      styles.accordion,
      styles[`accordion${appearance.charAt(0).toUpperCase() + appearance.slice(1)}`],
      props.class || ''
    ]}>
      <ul>
        {props.items.map(item => renderItem(item))}
      </ul>
    </div>
  );
});