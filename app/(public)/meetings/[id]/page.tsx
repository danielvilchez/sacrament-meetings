import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
    await connection();

    const { id } = await params;

    if (!/^\d+$/.test(id)) {
        notFound();
    }

    const meeting = await getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link
                href="/meetings"
                className="inline-block text-sm font-medium text-blue-900 hover:underline"
            >
                ← Back to All Meetings
            </Link>

            <MeetingDetail meeting={meeting} />
        </div>
    );
}
