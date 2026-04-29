import type { ReactNode } from 'react'
import { Pill } from './Pill'
import './ContextMenu.css'

export type ContextMenuItem = {
  id: string
  label: string
  icon?: ReactNode
  onSelect?: () => void
  disabled?: boolean
  destructive?: boolean
}

export type ContextMenuProps = {
  header?: string
  status?: string
  items: ContextMenuItem[]
  className?: string
}

export function ContextMenu({ header, status, items, className }: ContextMenuProps) {
  const classes = ['ogcr-menu', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="menu">
      {(header || status) && (
        <header className="ogcr-menu__header">
          {header && <span className="ogcr-menu__title">{header}</span>}
          {status && <Pill tone="neutral">{status}</Pill>}
        </header>
      )}
      <ul className="ogcr-menu__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={item.onSelect}
              className={[
                'ogcr-menu__item',
                item.destructive && 'ogcr-menu__item--destructive',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.icon && <span className="ogcr-menu__item-icon">{item.icon}</span>}
              <span className="ogcr-menu__item-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
