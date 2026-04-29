import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'filled' | 'outlined' | 'text'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export function Button({
  variant = 'filled',
  iconLeft,
  iconRight,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = ['ogcr-button', `ogcr-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {iconLeft && <span className="ogcr-button__icon" aria-hidden="true">{iconLeft}</span>}
      {children !== undefined && <span className="ogcr-button__label">{children}</span>}
      {iconRight && <span className="ogcr-button__icon" aria-hidden="true">{iconRight}</span>}
    </button>
  )
}
