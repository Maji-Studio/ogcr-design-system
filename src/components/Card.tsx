import type { ReactNode } from 'react'
import './Card.css'

export type CardProps = {
  title?: string
  subtitle?: string
  trailing?: ReactNode
  floating?: boolean
  className?: string
  children?: ReactNode
}

export function Card({
  title,
  subtitle,
  trailing,
  floating = false,
  className,
  children,
}: CardProps) {
  const classes = ['ogcr-card', floating && 'ogcr-card--floating', className]
    .filter(Boolean)
    .join(' ')

  const hasHeader = title || subtitle || trailing

  return (
    <section className={classes}>
      {hasHeader && (
        <header className="ogcr-card__header">
          <div className="ogcr-card__titles">
            {title && <h3 className="ogcr-card__title">{title}</h3>}
            {subtitle && <p className="ogcr-card__subtitle">{subtitle}</p>}
          </div>
          {trailing && <div className="ogcr-card__trailing">{trailing}</div>}
        </header>
      )}
      {children && <div className="ogcr-card__body">{children}</div>}
    </section>
  )
}
