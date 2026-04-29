import type { ReactNode } from 'react'
import { Pill } from './Pill'
import './Kpi.css'

type KpiTone = 'positive' | 'warning' | 'negative' | 'neutral'

export type KpiProps = {
  label: string
  value: ReactNode
  secondaryText?: string
  status?: { label: string; tone?: KpiTone }
  tone?: KpiTone
  className?: string
}

export function Kpi({ label, value, secondaryText, status, tone = 'positive', className }: KpiProps) {
  const classes = ['ogcr-kpi', `ogcr-kpi--${tone}`, className].filter(Boolean).join(' ')

  return (
    <article className={classes}>
      <div className="ogcr-kpi__bar" aria-hidden="true" />
      <header className="ogcr-kpi__header">
        <span className="ogcr-kpi__label">{label}</span>
        {status && <Pill tone={status.tone ?? 'neutral'}>{status.label}</Pill>}
      </header>
      <div className="ogcr-kpi__value">{value}</div>
      {secondaryText && <p className="ogcr-kpi__secondary">{secondaryText}</p>}
    </article>
  )
}
