
import { Suspense } from "react";
import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
    getMeetings,
    getMeetingsTotalPages,
} from "@/lib/meetings-db";

interface MeetingsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const { query = "", page } = await searchParams;

    const requestedPage = Math.max(1, Number(page) || 1);

    const totalPages = await getMeetingsTotalPages(query);
    const currentPage = Math.min(
        requestedPage,
        Math.max(totalPages, 1)
    );

    const meetings = await getMeetings(query, currentPage);

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sacrament Meetings
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Browse all available meeting programs.
                    </p>
                </div>

                <Link
                    href="/"
                    className="text-sm font-medium text-blue-900 hover:underline"
                >
                    Back to Home
                </Link>
            </div>

            <Suspense
                fallback={
                    <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
                }
            >
                <MeetingSearch />
            </Suspense>

            {meetings.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
                    No meetings found.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))}
                </div>
            )}

            <Suspense fallback={null}>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </Suspense>
        </div>
    );
}
