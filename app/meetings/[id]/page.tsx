
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const response = await fetch(
        `${baseUrl}/api/meetings/${id}`,
        { cache: "no-store" }
    );

    if (response.status === 404 || response.status === 400) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Failed to load meeting");
    }

    return response.json();
}

export default async function MeetingPage({ params }: MeetingPageProps) {
    await connection();

    const { id } = await params;

    if (!/^\d+$/.test(id)) {
        notFound();
    }

    const meeting = await getMeeting(id);

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
