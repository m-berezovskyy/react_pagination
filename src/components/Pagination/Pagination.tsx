import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1, e);
    } else {
      e.preventDefault();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1, e);
    } else {
      e.preventDefault();
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ul className="pagination" data-cy="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#/"
          aria-disabled={currentPage === 1}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#/"
            onClick={e => handlePageClick(page, e)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#/"
          aria-disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
