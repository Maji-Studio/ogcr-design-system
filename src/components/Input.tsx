import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import './Input.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  helperText?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  error?: boolean
}

export function Input({
  label,
  helperText,
  iconLeft,
  iconRight,
  error = false,
  id,
  className,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = helperText ? `${inputId}-helper` : undefined

  const wrapperClasses = ['ogcr-input', error && 'ogcr-input--error', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="ogcr-input__label">
          {label}
        </label>
      )}
      <div className="ogcr-input__field">
        {iconLeft && <span className="ogcr-input__icon" aria-hidden="true">{iconLeft}</span>}
        <input
          id={inputId}
          className="ogcr-input__control"
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          {...rest}
        />
        {iconRight && <span className="ogcr-input__icon" aria-hidden="true">{iconRight}</span>}
      </div>
      {helperText && (
        <p id={helperId} className="ogcr-input__helper">
          {helperText}
        </p>
      )}
    </div>
  )
}
