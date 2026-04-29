import { useId } from 'react'
import './Checkbox.css'

type CheckboxLayout = 'inline' | 'border-left' | 'border-right'
export type CheckboxValue = boolean | 'indeterminate'

export type CheckboxProps = {
  checked?: CheckboxValue
  onChange?: (next: boolean) => void
  label: string
  secondaryText?: string
  layout?: CheckboxLayout
  error?: boolean
  disabled?: boolean
  id?: string
  className?: string
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  secondaryText,
  layout = 'inline',
  error = false,
  disabled = false,
  id,
  className,
}: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isIndeterminate = checked === 'indeterminate'
  const isChecked = checked === true

  const wrapperClasses = [
    'ogcr-check',
    `ogcr-check--${layout}`,
    isChecked && 'ogcr-check--checked',
    isIndeterminate && 'ogcr-check--indeterminate',
    error && 'ogcr-check--error',
    disabled && 'ogcr-check--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const indicator = (
    <span className="ogcr-check__box" aria-hidden="true">
      {isIndeterminate ? (
        <svg viewBox="0 0 16 16" className="ogcr-check__icon">
          <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : isChecked ? (
        <svg viewBox="0 0 16 16" className="ogcr-check__icon">
          <polyline points="3.5 8.5 6.5 11.5 12.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  )

  const text = (
    <span className="ogcr-check__text">
      <span className="ogcr-check__line1">{label}</span>
      {secondaryText && <span className="ogcr-check__line2">{secondaryText}</span>}
    </span>
  )

  return (
    <label htmlFor={inputId} className={wrapperClasses}>
      <input
        id={inputId}
        type="checkbox"
        className="ogcr-check__input"
        checked={isChecked}
        ref={(node) => {
          if (node) node.indeterminate = isIndeterminate
        }}
        disabled={disabled}
        aria-invalid={error || undefined}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {layout === 'border-right' ? (
        <>
          {text}
          {indicator}
        </>
      ) : (
        <>
          {indicator}
          {text}
        </>
      )}
    </label>
  )
}
