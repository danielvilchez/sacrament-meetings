
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({
    totalPages,
    currentPage,
}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className="flex items-center justify-center gap-2"
            aria-label="Pagination"
        >
            <Link
                href={createPageURL(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage <= 1}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                    currentPage <= 1
                        ? "pointer-events-none border-gray-200 text-gray-400"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
                Previous
            </Link>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                    <Link
                        key={page}
                        href={createPageURL(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                            currentPage === page
                                ? "border-blue-900 bg-blue-900 text-white"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </Link>
                )
            )}

            <Link
                href={createPageURL(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage >= totalPages}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                    currentPage >= totalPages
                        ? "pointer-events-none border-gray-200 text-gray-400"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
                Next
            </Link>
        </nav>
    );
}
