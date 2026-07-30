import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@shared/utils/cn';

export function AppPagination({ pagination, onPageChange }) {
  const { page, totalPages, totalItems, hasNext, hasPrev } = pagination;

  if (totalPages <= 1) return null;

  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
      <p className="text-sm text-gray-500">
        Showing page {page} of {totalPages} ({totalItems} items)
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'min-w-[2rem] rounded-lg px-2 py-1 text-sm font-medium',
              p === page
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
