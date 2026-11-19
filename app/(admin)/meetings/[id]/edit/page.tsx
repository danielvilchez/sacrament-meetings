
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function EditMeetingContent({
    params,
}: EditMeetingPageProps) {
    await connection();

    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-3xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Meeting
                </h1>
                <p className="mt-2 text-gray-600">
                    Update the information for this sacrament meeting.
                </p>
            </div>

            <MeetingForm meeting={meeting} />
        </main>
    );
}

export default function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    return (
        <Suspense
            fallback={
                <main className="mx-auto max-w-3xl p-6">
                    Loading meeting...
                </main>
            }
        >
            <EditMeetingContent params={params} />
        </Suspense>
    );
}
