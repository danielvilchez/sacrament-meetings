
import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const PAGE_SIZE = 5;

function getSql() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not configured");
    }

    return neon(databaseUrl);
}

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
    return {
        id: Number(row.id),
        date: String(row.date).slice(0, 10),
        meetingType: row.meetingType as SacramentMeeting["meetingType"],
        presiding: String(row.presiding),
        conducting: String(row.conducting),
        announcements: (row.announcements ?? []) as string[],
        openingHymn: row.openingHymn as SacramentMeeting["openingHymn"],
        openingPrayer: String(row.openingPrayer),
        wardBusiness: row.wardBusiness as SacramentMeeting["wardBusiness"],
        stakeBusiness: Boolean(row.stakeBusiness),
        sacramentHymn: row.sacramentHymn as SacramentMeeting["sacramentHymn"],
        speakers: row.speakers as SacramentMeeting["speakers"],
        closingHymn: row.closingHymn as SacramentMeeting["closingHymn"],
        closingPrayer: String(row.closingPrayer),
    };
}

export async function getMeetings(
    query: string = "",
    currentPage: number = 1
): Promise<SacramentMeeting[]> {
    const sql = getSql();
    const searchTerm = query.trim();
    const searchPattern = `%${searchTerm}%`;
    const offset = (Math.max(1, currentPage) - 1) * PAGE_SIZE;

    const rows = await sql`
        SELECT
            id,
            to_char(date, 'YYYY-MM-DD') AS date,
            meeting_type AS "meetingType",
            presiding,
            conducting,
            announcements,
            opening_hymn AS "openingHymn",
            opening_prayer AS "openingPrayer",
            ward_business AS "wardBusiness",
            stake_business AS "stakeBusiness",
            sacrament_hymn AS "sacramentHymn",
            speakers,
            closing_hymn AS "closingHymn",
            closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE (
            ${searchTerm} = ''
            OR presiding ILIKE ${searchPattern}
            OR conducting ILIKE ${searchPattern}
            OR meeting_type ILIKE ${searchPattern}
            OR speakers::text ILIKE ${searchPattern}
        )
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset}
    `;

    return rows.map((row) =>
        mapMeeting(row as Record<string, unknown>)
    );
}

export async function getMeetingsTotalPages(
    query: string = ""
): Promise<number> {
    const sql = getSql();
    const searchTerm = query.trim();
    const searchPattern = `%${searchTerm}%`;

    const result = await sql`
        SELECT COUNT(*) AS total
        FROM meetings
        WHERE (
            ${searchTerm} = ''
            OR presiding ILIKE ${searchPattern}
            OR conducting ILIKE ${searchPattern}
            OR meeting_type ILIKE ${searchPattern}
            OR speakers::text ILIKE ${searchPattern}
        )
    `;

    const total = Number(result[0].total);

    return Math.ceil(total / PAGE_SIZE);
}

export async function getMeetingsByDate(
    date: string
): Promise<SacramentMeeting[]> {
    const sql = getSql();

    const rows = await sql`
        SELECT
            id,
            to_char(date, 'YYYY-MM-DD') AS date,
            meeting_type AS "meetingType",
            presiding,
            conducting,
            announcements,
            opening_hymn AS "openingHymn",
            opening_prayer AS "openingPrayer",
            ward_business AS "wardBusiness",
            stake_business AS "stakeBusiness",
            sacrament_hymn AS "sacramentHymn",
            speakers,
            closing_hymn AS "closingHymn",
            closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE date = ${date}::date
        ORDER BY date DESC
    `;

    return rows.map((row) =>
        mapMeeting(row as Record<string, unknown>)
    );
}

export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | null> {
    const sql = getSql();

    const rows = await sql`
        SELECT
            id,
            to_char(date, 'YYYY-MM-DD') AS date,
            meeting_type AS "meetingType",
            presiding,
            conducting,
            announcements,
            opening_hymn AS "openingHymn",
            opening_prayer AS "openingPrayer",
            ward_business AS "wardBusiness",
            stake_business AS "stakeBusiness",
            sacrament_hymn AS "sacramentHymn",
            speakers,
            closing_hymn AS "closingHymn",
            closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE id = ${id}
        LIMIT 1
    `;

    if (rows.length === 0) {
        return null;
    }

    return mapMeeting(rows[0] as Record<string, unknown>);
}

// Mutation stubs for future database operations.
export async function addMeeting(
    _data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
    throw new Error("addMeeting is not implemented yet.");
}

export async function updateMeeting(
    _id: number,
    _updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
    throw new Error("updateMeeting is not implemented yet.");
}

export async function deleteMeeting(_id: number): Promise<boolean> {
    throw new Error("deleteMeeting is not implemented yet.");
}
