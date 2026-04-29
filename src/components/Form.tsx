import {
  useId,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import './Form.css'

export type FormProps = FormHTMLAttributes<HTMLFormElement>

export function Form({ className, ...rest }: FormProps) {
  const classes = ['ogcr-form', className].filter(Boolean).join(' ')
  return <form className={classes} {...rest} />
}

export type FormSectionProps = HTMLAttributes<HTMLElement> & {
  step?: string
  title: string
  description?: string
}

export function FormSection({
  step,
  title,
  description,
  children,
  className,
  ...rest
}: FormSectionProps) {
  const classes = ['ogcr-form__section', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <header className="ogcr-form__section-head">
        {step && <span className="ogcr-form__section-step">{step}</span>}
        <h3 className="ogcr-form__section-title">{title}</h3>
        {description && (
          <p className="ogcr-form__section-description">{description}</p>
        )}
      </header>
      <div className="ogcr-form__section-body">{children}</div>
    </section>
  )
}

export function FormRow({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const classes = ['ogcr-form__row', className].filter(Boolean).join(' ')
  return <div className={classes} {...rest} />
}

export type FormFieldProps = {
  label?: string
  helperText?: string
  errorText?: string
  required?: boolean
  htmlFor?: string
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  helperText,
  errorText,
  required,
  htmlFor,
  children,
  className,
}: FormFieldProps) {
  const id = useId()
  const helperId = helperText || errorText ? `${id}-helper` : undefined
  const error = Boolean(errorText)
  const classes = [
    'ogcr-form__field',
    error && 'ogcr-form__field--error',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes}>
      {label && (
        <label htmlFor={htmlFor} className="ogcr-form__label">
          {label}
          {required && (
            <span className="ogcr-form__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {(errorText || helperText) && (
        <p id={helperId} className="ogcr-form__helper">
          {errorText ?? helperText}
        </p>
      )}
    </div>
  )
}

export type FormFieldsetProps = {
  legend: string
  helperText?: string
  errorText?: string
  required?: boolean
  inline?: boolean
  children: ReactNode
  className?: string
}

export function FormFieldset({
  legend,
  helperText,
  errorText,
  required,
  inline = false,
  children,
  className,
}: FormFieldsetProps) {
  const id = useId()
  const helperId = helperText || errorText ? `${id}-helper` : undefined
  const error = Boolean(errorText)
  const classes = [
    'ogcr-form__fieldset',
    inline && 'ogcr-form__fieldset--inline',
    error && 'ogcr-form__fieldset--error',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <fieldset className={classes} aria-describedby={helperId}>
      <legend className="ogcr-form__legend">
        {legend}
        {required && (
          <span className="ogcr-form__required" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="ogcr-form__fieldset-body">{children}</div>
      {(errorText || helperText) && (
        <p id={helperId} className="ogcr-form__helper">
          {errorText ?? helperText}
        </p>
      )}
    </fieldset>
  )
}

export type FormFooterProps = {
  note?: ReactNode
  children: ReactNode
  className?: string
}

export function FormFooter({ note, children, className }: FormFooterProps) {
  const classes = ['ogcr-form__footer', className].filter(Boolean).join(' ')
  return (
    <footer className={classes}>
      {note && <p className="ogcr-form__footer-note">{note}</p>}
      <div className="ogcr-form__footer-actions">{children}</div>
    </footer>
  )
}
