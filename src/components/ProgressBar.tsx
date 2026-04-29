import type { ReactNode } from 'react'
import './ProgressBar.css'

type ProgressBarTone = 'default' | 'blue' | 'orange' | 'neutral'

export type ProgressBarProps = {
  value: number
  label?: string
  labelIcon?: ReactNode
  showValue?: boolean
  tone?: ProgressBarTone
  className?: string
  ariaLabel?: string
}

export function ProgressBar({
  value,
  label,
  labelIcon,
  showValue = true,
  tone = 'default',
  className,
  ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const classes = ['ogcr-progress', `ogcr-progress--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {(label || showValue) && (
        <div className="ogcr-progress__text">
          {label && (
            <div className="ogcr-progress__label">
              <span>{label}</span>
              {labelIcon && (
                <span className="ogcr-progress__label-icon" aria-hidden="true">
                  {labelIcon}
                </span>
              )}
            </div>
          )}
          {showValue && <span className="ogcr-progress__value">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        className="ogcr-progress__track"
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label}
      >
        <div className="ogcr-progress__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
