import { useId } from 'react'
import './Radio.css'

type RadioLayout = 'inline' | 'border-left' | 'border-right'

export type RadioProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label: string
  secondaryText?: string
  layout?: RadioLayout
  error?: boolean
  disabled?: boolean
  name?: string
  value?: string
  id?: string
  className?: string
}

export function Radio({
  checked = false,
  onChange,
  label,
  secondaryText,
  layout = 'inline',
  error = false,
  disabled = false,
  name,
  value,
  id,
  className,
}: RadioProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const wrapperClasses = [
    'ogcr-radio',
    `ogcr-radio--${layout}`,
    checked && 'ogcr-radio--checked',
    error && 'ogcr-radio--error',
    disabled && 'ogcr-radio--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const indicator = (
    <span className="ogcr-radio__box" aria-hidden="true">
      <span className="ogcr-radio__dot" />
    </span>
  )

  const text = (
    <span className="ogcr-radio__text">
      <span className="ogcr-radio__line1">{label}</span>
      {secondaryText && <span className="ogcr-radio__line2">{secondaryText}</span>}
    </span>
  )

  return (
    <label htmlFor={inputId} className={wrapperClasses}>
      <input
        id={inputId}
        type="radio"
        className="ogcr-radio__input"
        name={name}
        value={value}
        checked={checked}
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
