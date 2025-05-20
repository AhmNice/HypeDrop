import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      <button
        onClick={() => {
          // prevPage()
          // currentPage -1
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-indigo-600 hover:bg-indigo-50"
        }`}
        aria-label="previous page"
      >
        <FiChevronLeft size={24} />
      </button>
      {Number.isInteger(totalPages) &&
        totalPages > 0 &&
        [...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            Math.abs(page - currentPage) > 2 &&
            page !== 1 &&
            page !== totalPages
          ) {
            if (Math.abs(page - currentPage) === 3) {
              return (
                <span key={page} className="px-2 py-1 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          }
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-md flex items-center justify-center ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label={`page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

      <button
        onClick={() => {
          // nextPage()
          // currentPage + 1
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-indigo-600 hover:bg-indigo-50"
        }`}
        aria-label="Next page"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
