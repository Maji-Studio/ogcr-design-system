import type { ReactNode } from 'react'
import './Pill.css'

type PillTone = 'neutral' | 'positive' | 'warning' | 'negative'

export type PillProps = {
  tone?: PillTone
  children: ReactNode
  className?: string
}

export function Pill({ tone = 'neutral', children, className }: PillProps) {
  const classes = ['ogcr-pill', `ogcr-pill--${tone}`, className].filter(Boolean).join(' ')
  return <span className={classes}>{children}</span>
}
