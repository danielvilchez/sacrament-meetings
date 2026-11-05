import { connection } from "next/server";
import { redirect } from "next/navigation";
import type { SacramentMeeting } from "@/lib/types";

export default async function CurrentMeetingPage() {
    // Wait for a real request before using the current date.
    await connection();

    // Get today's date in the Peru time zone.
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    // Calculate the date of the current Sunday.
    const [year, month, day] = today.split("-").map(Number);
    const currentDate = new Date(Date.UTC(year, month - 1, day));
    currentDate.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());

    const sunday = currentDate.toISOString().split("T")[0];

    // Build the API address for local development or Vercel.
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    // Search for a meeting on the current Sunday.
    const response = await fetch(
        `${baseUrl}/api/meetings?date=${sunday}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Failed to load current meeting");
    }

    const meetings: SacramentMeeting[] = await response.json();

    // Open the meeting if one exists; otherwise show all meetings.
    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}`);
    }

    redirect("/meetings");
}
