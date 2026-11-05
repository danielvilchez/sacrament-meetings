import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingsPageProps {
    searchParams: Promise<{ date?: string }>;
}

async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const query = date ? `?date=${encodeURIComponent(date)}` : "";

    const response = await fetch(
        `${baseUrl}/api/meetings${query}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Failed to load meetings");
    }

    return response.json();
}

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const { date } = await searchParams;
    const meetings = await getMeetings(date);

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

            <form action="/meetings" method="GET" className="flex flex-wrap items-end gap-3">
                <div>
                    <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700">
                        Filter by date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={date || ""}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
                >
                    Search
                </button>

                <Link
                    href="/meetings"
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:underline"
                >
                    Clear filter
                </Link>
            </form>

            {meetings.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
                    No meetings found.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}
        </div>
    );
}
