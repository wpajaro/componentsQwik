import { component$, $, useSignal, Slot } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { JSX } from '@builder.io/qwik';
import Button from '~/components/atoms/Button/Button';

import styles from './accordion2.module.css';

export type AccordionVariant = 
  | 'default' 
  | 'flush'
  | 'dark'
  | 'outline'
  | 'horizontal'
  | 'icon-prefix'
  | 'multi-toggle'
  | 'external-trigger';

export type AccordionColorScheme = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';

export interface AccordionItem {
  key: string;
  title: string;
  content?: string | JSX.Element;
  items?: Array<{ 
    key: string; 
    title: string; 
    href?: string 
    isActive?: boolean;
  }>;
  icon?: any;
  triggerId?: string;
  contentId?: string;
}

interface AccordionProps {
  variant?: AccordionVariant;
  colorScheme?: AccordionColorScheme;
  items: AccordionItem[];
  iconPosition?: 'left' | 'right';
  multiple?: boolean;
  bordered?: boolean;
  iconOpen?: any;
  iconClosed?: any;
  useCustomTriggers?: boolean;
  accordionId?: string;
  defaultOpenKeys?: string[];
  onItemClick$?: PropFunction<(key: string) => void>;
}

export const Acordeon = component$<AccordionProps>(({
  variant = 'default',
  colorScheme = 'primary',
  items: initialItems,
  //iconPosition = 'right',
  multiple = false,
  bordered = true,
  useCustomTriggers = false,
  accordionId = 'accordion-' + Math.random().toString(36).substring(2, 9),
  defaultOpenKeys = [],
  onItemClick$,
  //iconOpen,
  //iconClosed
}) => {

  //const iconOpenClass = "fa fa-chevron-up";
  //const iconClosedClass = "fa fa-chevron-down";

  const itemsSignal = useSignal(
    initialItems.map(item => ({
      ...item,
      triggerId: item.triggerId || `trigger-${item.key}`,
      contentId: item.contentId || `content-${item.key}`,
      content: item.content || (item.items && (
        <ul class="accordion-submenu">
          {item.items.map(subItem => (
            <li key={subItem.key}>
              {subItem.href ? (
                <Link 
                  href={subItem.href}
                  class={[
                    styles.accordionHeader,
                    subItem.isActive && styles.accordionHeaderActive,
                  ]}>
                  {subItem.title}
                </Link>
              ) : (
                <span>{subItem.title}</span>
              )}
            </li>
          ))}
        </ul>
      ))
    }))
  );

  const activeIndices = useSignal<number[]>(
    itemsSignal.value.map((item, i) =>
      defaultOpenKeys.includes(item.key) ? i : -1
    ).filter(i => i !== -1)
  );

  const toggleItem = $((index: number) => {
    if (multiple) {
      activeIndices.value = activeIndices.value.includes(index)
        ? activeIndices.value.filter(i => i !== index)
        : [...activeIndices.value, index];
    } else {
      activeIndices.value = activeIndices.value.includes(index) ? [] : [index];
    }
    onItemClick$?.(itemsSignal.value[index].key);
  });

  const ChevronIcon = component$<{ open : boolean }> (
    ({ open }) => (
      <span class='accordion-toggle-icon'>
        <i class={`fa ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}/>
      </span>
    )
  )

  return (
    <div class={[
      styles.accordion,
      styles[`accordion-${variant}`],
      styles[`scheme-${colorScheme}`],
      bordered && styles.accordionBordered,
    ]} id={accordionId}>
      
      {(variant === 'horizontal' || variant === 'external-trigger' || variant === 'multi-toggle') && (
        <div class={styles.externalTriggers}>
          {itemsSignal.value.map((item, i) => (
            <button
              key={item.triggerId}
              class={styles.externalTrigger}
              onClick$={$(() => toggleItem(i))}
              aria-expanded={activeIndices.value.includes(i)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {itemsSignal.value.map((item, index) => (
        <div 
          key={item.key}
          class={[
            styles.accordionItem,
            activeIndices.value.includes(index) && styles.accordionItemActive
          ]}
        >
          {!useCustomTriggers && (
            <div>
              <Button
                onClick$={$(() => toggleItem(index))}
                label={item.title}
                color={colorScheme as any}
                appearance='accordion'
                fullWidth
                suffix={<ChevronIcon open={activeIndices.value.includes(index)} />}
              />
            </div>
          )}

          <div
            class={[
              styles.accordionContent,
              activeIndices.value.includes(index) && styles.accordionContentVisible
            ]}
            aria-hidden={!activeIndices.value.includes(index)}
          >
            <div class={styles.accordionBody}>
              {item.content || <Slot name={`content-${index}`} />}
            </div>  
          </div>
        </div>
      ))}
    </div>
  );
});
