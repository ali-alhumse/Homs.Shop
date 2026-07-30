import { cn } from '@shared/utils/cn';

export function AppTable({ columns, data, loading, emptyMessage = 'No data found', onRowClick }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500',
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className={cn(
                'transition-colors hover:bg-gray-50',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn('whitespace-nowrap px-4 py-3 text-sm text-gray-700', col.className)}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
