
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);

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

            <div className="mt-5 flex flex-wrap gap-2">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    View Meeting
                </Link>

                <Link
                    href={`/meetings/${meeting.id}/edit`}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Edit Meeting
                </Link>

                <form action={deleteMeetingWithId}>
                    <button
                        type="submit"
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Delete Meeting
                    </button>
                </form>
            </div>
        </article>
    );
}
