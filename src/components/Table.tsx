import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from '@tanstack/react-table'
import { useState, type ReactNode } from 'react'
import './Table.css'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'right' | 'center'
    numeric?: boolean
  }
}

export type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  caption?: ReactNode
  emptyState?: ReactNode
  initialSorting?: SortingState
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  caption,
  emptyState,
  initialSorting,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting ?? [])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows
  const classes = ['ogcr-table', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div
        className="ogcr-table__scroll"
        role="region"
        aria-label={typeof caption === 'string' ? caption : undefined}
      >
        <table className="ogcr-table__table">
          {caption && (
            <caption className="ogcr-table__caption">{caption}</caption>
          )}
          <thead className="ogcr-table__thead">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const meta = header.column.columnDef.meta
                  const align = meta?.align ?? (meta?.numeric ? 'right' : 'left')
                  const sortable = header.column.getCanSort()
                  const sortDir = header.column.getIsSorted()
                  const ariaSort =
                    sortDir === 'asc'
                      ? 'ascending'
                      : sortDir === 'desc'
                        ? 'descending'
                        : 'none'
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      data-align={align}
                      aria-sort={sortable ? ariaSort : undefined}
                      className="ogcr-table__th"
                    >
                      {header.isPlaceholder ? null : sortable ? (
                        <button
                          type="button"
                          className={`ogcr-table__sort ogcr-table__sort--${sortDir || 'none'}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                          <span className="ogcr-table__sort-icon" aria-hidden="true">
                            {sortDir === 'asc'
                              ? '↑'
                              : sortDir === 'desc'
                                ? '↓'
                                : '↕'}
                          </span>
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="ogcr-table__tbody">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="ogcr-table__empty">
                  {emptyState ?? 'No records'}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="ogcr-table__tr">
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta
                    const align =
                      meta?.align ?? (meta?.numeric ? 'right' : 'left')
                    return (
                      <td
                        key={cell.id}
                        data-align={align}
                        data-numeric={meta?.numeric || undefined}
                        className="ogcr-table__td"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
