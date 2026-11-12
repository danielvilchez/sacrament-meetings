import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-900">
                    {meeting.meetingType} meeting
                </span>

                <time
                    dateTime={meeting.date}
                    className="text-sm text-gray-500"
                >
                    {new Date(`${meeting.date}T12:00:00`).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                    })}
                </time>
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
                Sacrament Meeting
            </h2>

            <p className="mt-2 text-sm text-gray-600">
                Presiding: {meeting.presiding}
            </p>

            <p className="mt-1 text-sm text-gray-600">
                Conducting: {meeting.conducting}
            </p>

            <Link
                href={`/meetings/${meeting.id}`}
                className="mt-5 inline-block rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                View Meeting
            </Link>
        </article>
    );
}
