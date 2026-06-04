import type { ReactElement, ReactNode } from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cn } from '../../lib/cn'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'center' | 'end'

export type TooltipProps = {
  /** The hovered/focused element. Cloned via Base UI's `render`. */
  trigger: ReactElement
  /** Tooltip contents. */
  children: ReactNode
  side?: TooltipSide
  align?: TooltipAlign
  sideOffset?: number
  showArrow?: boolean
  /** Delay before opening, ms. */
  delay?: number
  /** Delay before closing, ms. */
  closeDelay?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function Tooltip({
  trigger,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 8,
  showArrow = true,
  delay = 200,
  closeDelay = 0,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay}>
      <BaseTooltip.Root
        open={open}
        defaultOpen={open === undefined ? defaultOpen : undefined}
        onOpenChange={onOpenChange}
      >
        <BaseTooltip.Trigger render={trigger} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50">
            <BaseTooltip.Popup
              data-slot="tooltip"
              className={cn(
                'px-12 py-8 max-w-[260px] bg-surface-strong text-surface-light rounded-8 shadow-elevation-l',
                'font-standard font-medium text-s leading-[1.4]',
                'outline-none origin-[var(--transform-origin)] transition-[transform,opacity] duration-150',
                'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
                'data-[starting-style]:scale-95 data-[ending-style]:scale-95',
                className,
              )}
            >
              {showArrow && (
                <BaseTooltip.Arrow
                  data-slot="tooltip-arrow"
                  className={cn(
                    'data-[side=bottom]:top-[-8px] data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180',
                    'data-[side=left]:right-[-13px] data-[side=left]:rotate-90',
                    'data-[side=right]:left-[-13px] data-[side=right]:-rotate-90',
                  )}
                >
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                    <path
                      d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                      className="fill-surface-strong"
                    />
                  </svg>
                </BaseTooltip.Arrow>
              )}
              {children}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  )
}
