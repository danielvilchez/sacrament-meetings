import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingRouteProps {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    { params }: MeetingRouteProps
) {
    try {
        const { id } = await params;
        const meetingId = Number(id);

        if (!Number.isInteger(meetingId) || meetingId <= 0) {
            return NextResponse.json(
                { error: "Invalid meeting ID." },
                { status: 400 }
            );
        }

        const meeting = await getMeetingById(meetingId);

        if (!meeting) {
            return NextResponse.json(
                { error: "Meeting not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(meeting, { status: 200 });
    } catch (error) {
        console.error("Failed to retrieve meeting:", error);

        return NextResponse.json(
            { error: "Failed to retrieve meeting." },
            { status: 500 }
        );
    }
}
