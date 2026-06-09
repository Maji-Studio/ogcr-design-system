import type { ReactNode } from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { CaretDownIcon } from '../icons'
import { cn } from '../../lib/cn'

export type CollapsibleProps = {
  /** Content rendered inside the default toggle button. */
  trigger: ReactNode
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  /** Hide the default chevron affordance. */
  hideChevron?: boolean
  className?: string
}

export function Collapsible({
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  hideChevron = false,
  className,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      open={open}
      defaultOpen={open === undefined ? defaultOpen : undefined}
      onOpenChange={onOpenChange}
      disabled={disabled}
      data-slot="collapsible"
      className={cn('flex flex-col w-full', className)}
    >
      <BaseCollapsible.Trigger
        data-slot="collapsible-trigger"
        className={cn(
          'group inline-flex items-center justify-between gap-8 w-full py-8 text-left bg-transparent border-0 cursor-pointer outline-none rounded-8',
          'font-standard font-medium text-s leading-[1.4] text-text-primary',
          'transition-colors duration-150 hover:text-interaction-primary-default',
          'focus-visible:shadow-focus-primary',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:text-text-primary',
        )}
      >
        {trigger}
        {!hideChevron && (
          <span
            aria-hidden="true"
            className="inline-flex w-16 h-16 shrink-0 text-icon-secondary transition-transform duration-200 group-data-[panel-open]:rotate-180 [&>svg]:w-full [&>svg]:h-full"
          >
            <CaretDownIcon />
          </span>
        )}
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel
        data-slot="collapsible-panel"
        className={cn(
          'overflow-hidden h-[var(--collapsible-panel-height)]',
          'transition-[height] duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
          'data-[starting-style]:h-0 data-[ending-style]:h-0',
        )}
      >
        <div className="pt-8 font-standard font-normal text-s leading-[1.5] text-text-secondary">
          {children}
        </div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  )
}
