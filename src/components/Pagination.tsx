"use client";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PastaType } from "@/types/type";

export default function PaginationButton({ data, currentPage, setCurrentPage, itemsPerPage }: { data: PastaType[]; currentPage: number; setCurrentPage: React.Dispatch<React.SetStateAction<number>>; itemsPerPage: number }) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            role="button"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                role="button"
                onClick={() => handlePageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
          .filter((page) => page >= 1 && page <= totalPages)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                role="button"
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage < totalPages - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                role="button"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            role="button"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
