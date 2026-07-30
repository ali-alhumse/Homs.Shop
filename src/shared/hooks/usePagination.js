import { useState, useMemo } from 'react';

export function usePagination({ totalItems, pageSize = 20, initialPage = 1 }) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

  const pagination = useMemo(
    () => ({
      page,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      totalPages,
      totalItems,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }),
    [page, pageSize, totalPages, totalItems]
  );

  function nextPage() {
    if (pagination.hasNext) setPage((prev) => prev + 1);
  }

  function prevPage() {
    if (pagination.hasPrev) setPage((prev) => prev - 1);
  }

  function goToPage(p) {
    setPage(Math.max(1, Math.min(p, totalPages)));
  }

  function reset() {
    setPage(1);
  }

  return { pagination, nextPage, prevPage, goToPage, reset };
}
