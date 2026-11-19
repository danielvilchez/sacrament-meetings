
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
    addMeeting,
    updateMeeting as updateMeetingInDb,
    deleteMeeting as deleteMeetingInDb,
} from "@/lib/meetings-db";

const hymnSchema = z.object({
    number: z.coerce.number().int().positive("Enter a valid hymn number."),
    title: z.string().trim().min(1, "Hymn title is required."),
});

const MeetingFormSchema = z.object({
    date: z.string().min(1, "Date is required."),
    meetingType: z.enum(["testimony", "regular", "stake", "general"]),
    presiding: z.string().trim().min(1, "Presiding is required."),
    conducting: z.string().trim().min(1, "Conducting is required."),
    announcements: z.array(z.string()),
    openingHymn: hymnSchema,
    openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
    wardBusiness: z.array(
        z.object({
            description: z.string().trim().min(1),
        })
    ),
    stakeBusiness: z.boolean(),
    sacramentHymn: hymnSchema,
    speakers: z.array(
        z.object({
            name: z.string().trim().min(1),
            topic: z.string().trim().min(1),
            type: z.enum(["speaker", "musical-number"]),
        })
    ),
    closingHymn: hymnSchema,
    closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
});

const meetingIdSchema = z.number().int().positive();

export interface MeetingFormState {
    message: string;
    errors?: Record<string, string[]>;
}

function parseMeetingFormData(formData: FormData) {
    const announcements = formData
        .getAll("announcements")
        .map(String)
        .filter((value) => value.trim() !== "");

    const wardBusiness = formData
        .getAll("wardBusiness")
        .map(String)
        .filter((value) => value.trim() !== "")
        .map((description) => ({ description }));

    const speakers = formData
        .getAll("speakerName")
        .map((name, index) => ({
            name: String(name),
            topic: String(formData.getAll("speakerTopic")[index] ?? ""),
            type: String(formData.getAll("speakerType")[index] ?? "speaker"),
        }));

    return {
        date: String(formData.get("date") ?? ""),
        meetingType: String(formData.get("meetingType") ?? ""),
        presiding: String(formData.get("presiding") ?? ""),
        conducting: String(formData.get("conducting") ?? ""),
        announcements,
        openingHymn: {
            number: formData.get("openingHymnNumber"),
            title: String(formData.get("openingHymnTitle") ?? ""),
        },
        openingPrayer: String(formData.get("openingPrayer") ?? ""),
        wardBusiness,
        stakeBusiness: formData.get("stakeBusiness") === "on",
        sacramentHymn: {
            number: formData.get("sacramentHymnNumber"),
            title: String(formData.get("sacramentHymnTitle") ?? ""),
        },
        speakers,
        closingHymn: {
            number: formData.get("closingHymnNumber"),
            title: String(formData.get("closingHymnTitle") ?? ""),
        },
        closingPrayer: String(formData.get("closingPrayer") ?? ""),
    };
}

function getMeetingFieldErrors(
    error: z.ZodError
): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    const fieldMap: Record<string, string> = {
        "openingHymn.number": "openingHymnNumber",
        "openingHymn.title": "openingHymnTitle",
        "sacramentHymn.number": "sacramentHymnNumber",
        "sacramentHymn.title": "sacramentHymnTitle",
        "closingHymn.number": "closingHymnNumber",
        "closingHymn.title": "closingHymnTitle",
    };

    for (const issue of error.issues) {
        const path = issue.path.join(".");
        let field = fieldMap[path] ?? path;

        if (/^wardBusiness\.\d+\.description$/.test(path)) {
            field = "wardBusiness";
        }

        const speakerMatch = path.match(
            /^speakers\.\d+\.(name|topic|type)$/
        );

        if (speakerMatch) {
            field = `speaker${speakerMatch[1][0].toUpperCase()}${speakerMatch[1].slice(1)}`;
        }

        errors[field] ??= [];
        errors[field].push(issue.message);
    }

    return errors;
}

export async function createMeeting(
    _previousState: MeetingFormState,
    formData: FormData
): Promise<MeetingFormState> {
    const validatedFields = MeetingFormSchema.safeParse(
        parseMeetingFormData(formData)
    );

    if (!validatedFields.success) {
        return {
            message: "Please correct the errors below.",
            errors: getMeetingFieldErrors(validatedFields.error),
        };
    }

    try {
        await addMeeting(validatedFields.data);
    } catch (error) {
        console.error("Create meeting error:", error);
        throw new Error(
            "Unable to create the meeting. Please try again later."
        );
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}

export async function updateMeeting(
    id: number,
    _previousState: MeetingFormState,
    formData: FormData
): Promise<MeetingFormState> {
    const validatedId = meetingIdSchema.safeParse(id);

    if (!validatedId.success) {
        return {
            message: "Invalid meeting ID.",
        };
    }

    const validatedFields = MeetingFormSchema.safeParse(
        parseMeetingFormData(formData)
    );

    if (!validatedFields.success) {
        return {
            message: "Please correct the errors below.",
            errors: getMeetingFieldErrors(validatedFields.error),
        };
    }

    try {
        const meeting = await updateMeetingInDb(
            validatedId.data,
            validatedFields.data
        );

        if (!meeting) {
            throw new Error("Meeting not found.");
        }
    } catch (error) {
        console.error("Update meeting error:", error);
        throw new Error(
            "Unable to update the meeting. Please try again later."
        );
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    redirect("/meetings");
}

export async function deleteMeeting(
    id: number,
    _formData: FormData
): Promise<void> {
    void _formData;

    const validatedId = meetingIdSchema.safeParse(id);

    if (!validatedId.success) {
        throw new Error("Invalid meeting ID.");
    }

    try {
        const deleted = await deleteMeetingInDb(validatedId.data);

        if (!deleted) {
            throw new Error("Meeting not found.");
        }
    } catch (error) {
        console.error("Delete meeting error:", error);
        throw new Error(
            "Unable to delete the meeting. Please try again later."
        );
    }

    revalidatePath("/meetings");
}
