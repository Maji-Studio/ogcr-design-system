import type { ReactNode } from 'react'
import { Button } from './Button'
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  WarningOctagonIcon,
  XIcon,
} from './icons'
import './Message.css'

export type MessageState = 'neutral' | 'success' | 'warning' | 'error'
export type MessageType = 'inline' | 'floating'

const STATE_ICONS: Record<MessageState, ReactNode> = {
  neutral: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <WarningIcon />,
  error: <WarningOctagonIcon />,
}

export type MessageProps = {
  title: string
  description?: string
  state?: MessageState
  type?: MessageType
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  className?: string
}

export function Message({
  title,
  description,
  state = 'neutral',
  type = 'inline',
  actionLabel,
  onAction,
  onDismiss,
  className,
}: MessageProps) {
  const classes = [
    'ogcr-message',
    `ogcr-message--${state}`,
    `ogcr-message--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role={state === 'error' ? 'alert' : 'status'}>
      <div className="ogcr-message__content">
        <span className="ogcr-message__icon" aria-hidden="true">{STATE_ICONS[state]}</span>
        <div className="ogcr-message__text">
          <p className="ogcr-message__title">{title}</p>
          {description && <p className="ogcr-message__description">{description}</p>}
        </div>
      </div>
      {actionLabel && (
        <Button variant="outlined" onClick={onAction} className="ogcr-message__action">
          {actionLabel}
        </Button>
      )}
      {type === 'floating' && (
        <button
          type="button"
          className="ogcr-message__close"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <XIcon />
        </button>
      )}
    </div>
  )
}
