
import { component$, useSignal, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

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
  title: string;
  content?: string;
  icon?: any;
  isOpen?: boolean;
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
}

export const Accordion = component$<AccordionProps>(({
  variant = 'default',
  colorScheme = 'primary',
  items: initialItems,
  iconPosition = 'right',
  multiple = false,
  bordered = true,
  iconOpen,
  iconClosed,
  useCustomTriggers = false,
  accordionId = 'accordion-' + Math.random().toString(36).substring(2, 9),
}) => {
  const items = initialItems.map(item => ({
    ...item,
    triggerId: item.triggerId || `trigger-${Math.random().toString(36).substring(2, 9)}`,
    contentId: item.contentId || `content-${Math.random().toString(36).substring(2, 9)}`
  }));

  const activeIndices = useSignal<number[]>(
    initialItems.map((item, i) => item.isOpen ? i : []).flat()
  );

  const toggleItem = $((index: number) => {
    if (multiple) {
      activeIndices.value = activeIndices.value.includes(index)
        ? activeIndices.value.filter(i => i !== index)
        : [...activeIndices.value, index];
    } else {
      activeIndices.value = activeIndices.value.includes(index) ? [] : [index];
    }
  });

  return (
    <div class={{
      'accordion': true,
      [`accordion-${variant}`]: true,
      [`scheme-${colorScheme}`]: true,
      'bordered': bordered,
      'dark-accordion': variant === 'dark',
      'accordion-flush': variant === 'flush',
      'accordion-wrapper': variant === 'outline',
      'accordion-horizontal': variant === 'horizontal'
    }} id={accordionId}>
      {/* External triggers for horizontal/external-trigger variants */}
      {(variant === 'horizontal' || variant === 'external-trigger' || variant === 'multi-toggle') && (
        <div class="common-flex mb-3">
          {items.map((_, i) => (
            <button
              class={`btn btn-${colorScheme}`}
              onClick$={() => toggleItem(i)}
              aria-controls={items[i].contentId}
              aria-expanded={activeIndices.value.includes(i)}
            >
              Toggle {i+1}
            </button>
          ))}
          {variant === 'multi-toggle' && (
            <button
              class={`btn btn-${colorScheme}`}
              onClick$={() => activeIndices.value = activeIndices.value.length ? [] : items.map((_, i) => i)}
            >
              Toggle All
            </button>
          )}
        </div>
      )}

      {/* Accordion items */}
      {items.map((item, index) => (
        <div class={{
          'accordion-item': true,
          'active': activeIndices.value.includes(index),
          'collapse-wrapper': variant === 'horizontal'
        }} key={index}>
          {!useCustomTriggers && (
            <h2 class="accordion-header">
              <button
                class={{
                  'accordion-button': true,
                  'collapsed': !activeIndices.value.includes(index),
                  [`bg-light-${colorScheme}`]: true,
                  [`txt-${colorScheme}`]: true,
                  'gap-2': variant === 'icon-prefix'
                }}
                onClick$={() => toggleItem(index)}
                aria-expanded={activeIndices.value.includes(index)}
                aria-controls={item.contentId}
                id={item.triggerId}
              >
                {variant === 'icon-prefix' && item.icon && (
                  <span class="accordion-icon-prefix">
                    {item.icon}
                  </span>
                )}
                {item.title}
                {iconPosition === 'right' && (
                  <span class="accordion-icon ms-auto">
                    {activeIndices.value.includes(index) 
                      ? (iconOpen || '−') 
                      : (iconClosed || '+')}
                  </span>
                )}
              </button>
            </h2>
          )}

          <div
            class={{
              'accordion-collapse': true,
              'collapse': true,
              'show': activeIndices.value.includes(index),
              'collapse-horizontal': variant === 'horizontal'
            }}
            aria-labelledby={item.triggerId}
            id={item.contentId}
          >
            <div class={{
              'accordion-body': true,
              [`bg-light-${colorScheme}`]: variant !== 'horizontal',
              'card': variant === 'horizontal',
              'card-body': variant === 'horizontal'
            }}>
              {item.content || <Slot name={`content-${index}`} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});