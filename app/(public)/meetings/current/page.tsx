
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetingsByDate } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
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

    currentDate.setUTCDate(
        currentDate.getUTCDate() - currentDate.getUTCDay()
    );

    const sunday = currentDate.toISOString().split("T")[0];

    // Search for a meeting on the current Sunday.
    const meetings = await getMeetingsByDate(sunday);

    // Open the meeting if one exists; otherwise show all meetings.
    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}`);
    }

    redirect("/meetings");
}
