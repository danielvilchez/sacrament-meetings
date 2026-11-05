import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
    try {
        const date = request.nextUrl.searchParams.get("date");
        const meetings = getMeetings(date);

        return NextResponse.json(meetings, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to retrieve meetings." },
            { status: 500 }
        );
    }
}
