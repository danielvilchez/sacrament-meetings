
import { NextRequest, NextResponse } from "next/server";
import {
    getMeetings,
    getMeetingsByDate,
} from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
    try {
        const date = request.nextUrl.searchParams.get("date");

        const meetings = date
            ? await getMeetingsByDate(date)
            : await getMeetings("", 1);

        return NextResponse.json(meetings, { status: 200 });
    } catch (error) {
        console.error("Failed to retrieve meetings:", error);

        return NextResponse.json(
            { error: "Failed to retrieve meetings." },
            { status: 500 }
        );
    }
}
