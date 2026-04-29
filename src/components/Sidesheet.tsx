import type { ReactNode } from 'react'
import { Button } from './Button'
import { Pill } from './Pill'
import { ArrowLeftIcon, XIcon } from './icons'
import './Sidesheet.css'

export type SidesheetAction = {
  label: string
  variant?: 'filled' | 'outlined' | 'text'
  onClick?: () => void
}

export type SidesheetProps = {
  title: string
  navLabel?: string
  status?: string
  onBack?: () => void
  onClose?: () => void
  primaryAction?: SidesheetAction
  secondaryAction?: SidesheetAction
  children?: ReactNode
  className?: string
}

export function Sidesheet({
  title,
  navLabel,
  status,
  onBack,
  onClose,
  primaryAction,
  secondaryAction,
  children,
  className,
}: SidesheetProps) {
  const classes = ['ogcr-sidesheet', className].filter(Boolean).join(' ')

  return (
    <aside className={classes} role="dialog" aria-label={title}>
      <div className="ogcr-sidesheet__nav">
        {navLabel ? (
          <Button variant="outlined" iconLeft={<ArrowLeftIcon />} onClick={onBack}>
            {navLabel}
          </Button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="ogcr-sidesheet__close"
          aria-label="Close"
          onClick={onClose}
        >
          <XIcon />
        </button>
      </div>
      <header className="ogcr-sidesheet__header">
        <h2 className="ogcr-sidesheet__title">{title}</h2>
        {status && <Pill tone="neutral">{status}</Pill>}
      </header>
      <div className="ogcr-sidesheet__body">{children}</div>
      {(primaryAction || secondaryAction) && (
        <footer className="ogcr-sidesheet__footer">
          {primaryAction && (
            <Button variant={primaryAction.variant ?? 'filled'} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant={secondaryAction.variant ?? 'outlined'} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </footer>
      )}
    </aside>
  )
}
