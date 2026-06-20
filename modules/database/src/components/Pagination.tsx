import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems
}) => {
  const pageSizes = [10, 20, 50, 100];

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-d4-card rounded-lg p-4 mt-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-d4-label text-sm">显示</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-d4-input border border-d4-border rounded-lg px-3 py-1.5 text-d4-text text-sm focus:outline-none focus:border-d4-accent transition-colors"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="text-d4-label text-sm">条/页</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-d4-label text-sm">
            共 {totalItems} 条记录
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 bg-d4-input border border-d4-border rounded-lg text-d4-text hover:bg-d4-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一页
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={typeof page !== 'number'}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                typeof page === 'number'
                  ? page === currentPage
                    ? 'bg-d4-accent text-white font-semibold'
                    : 'bg-d4-input border border-d4-border text-d4-text hover:bg-d4-hover'
                  : 'bg-transparent text-d4-label cursor-default'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 bg-d4-input border border-d4-border rounded-lg text-d4-text hover:bg-d4-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;