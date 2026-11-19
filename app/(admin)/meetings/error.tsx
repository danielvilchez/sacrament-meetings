
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("An unexpected error occurred:", error);
    }, [error]);

    return (
        <main className="mx-auto mt-16 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
                Something went wrong!
            </h1>

            <p className="mt-3 text-gray-600">
                An unexpected error occurred while loading the meetings.
                Please try again later.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    onClick={reset}
                    className="rounded-md bg-blue-900 px-4 py-2 font-semibold text-white transition hover:bg-blue-800"
                >
                    Try Again
                </button>

                <Link
                    href="/meetings"
                    className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                    Go Back to Meetings
                </Link>
            </div>
        </main>
    );
}
