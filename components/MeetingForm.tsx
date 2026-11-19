
"use client";

import { useActionState } from "react";
import {
    createMeeting,
    updateMeeting,
    type MeetingFormState,
} from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

const initialState: MeetingFormState = {
    message: "",
    errors: {},
};

function FieldError({
    name,
    errors,
}: {
    name: string;
    errors?: Record<string, string[]>;
}) {
    const fieldErrors = errors?.[name] ?? [];

    return (
        <div
            id={`${name}-error`}
            className="mt-1"
            aria-live="polite"
            aria-atomic="true"
        >
            {fieldErrors.map((error) => (
                <p key={error} className="text-sm text-red-600">
                    {error}
                </p>
            ))}
        </div>
    );
}

export default function MeetingForm({
    meeting,
}: {
    meeting?: SacramentMeeting;
}) {
    const action = meeting
        ? updateMeeting.bind(null, meeting.id)
        : createMeeting;

    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    return (
        <form action={formAction} className="space-y-8">
            {state.message && (
                <p
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                    role="alert"
                >
                    {state.message}
                </p>
            )}

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Meeting Information
                </h2>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        defaultValue={meeting?.date ?? ""}
                        aria-describedby="date-error"
                        aria-invalid={Boolean(state.errors?.date?.length)}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="date" errors={state.errors} />
                </div>

                <div>
                    <label
                        htmlFor="meetingType"
                        className="block text-sm font-medium"
                    >
                        Meeting Type
                    </label>
                    <select
                        id="meetingType"
                        name="meetingType"
                        required
                        defaultValue={meeting?.meetingType ?? "regular"}
                        aria-describedby="meetingType-error"
                        aria-invalid={Boolean(
                            state.errors?.meetingType?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    >
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                    <FieldError name="meetingType" errors={state.errors} />
                </div>

                <div>
                    <label
                        htmlFor="presiding"
                        className="block text-sm font-medium"
                    >
                        Presiding
                    </label>
                    <input
                        id="presiding"
                        name="presiding"
                        required
                        defaultValue={meeting?.presiding ?? ""}
                        aria-describedby="presiding-error"
                        aria-invalid={Boolean(state.errors?.presiding?.length)}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="presiding" errors={state.errors} />
                </div>

                <div>
                    <label
                        htmlFor="conducting"
                        className="block text-sm font-medium"
                    >
                        Conducting
                    </label>
                    <input
                        id="conducting"
                        name="conducting"
                        required
                        defaultValue={meeting?.conducting ?? ""}
                        aria-describedby="conducting-error"
                        aria-invalid={Boolean(state.errors?.conducting?.length)}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="conducting" errors={state.errors} />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Announcements
                </h2>

                <div>
                    <label
                        htmlFor="announcements"
                        className="block text-sm font-medium"
                    >
                        Announcement
                    </label>
                    <input
                        id="announcements"
                        name="announcements"
                        defaultValue={meeting?.announcements?.[0] ?? ""}
                        aria-describedby="announcements-error"
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="announcements" errors={state.errors} />

                    {meeting?.announcements?.slice(1).map(
                        (announcement, index) => (
                            <input
                                key={index}
                                type="hidden"
                                name="announcements"
                                value={announcement}
                            />
                        )
                    )}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Opening</h2>

                <div>
                    <label
                        htmlFor="openingHymnNumber"
                        className="block text-sm font-medium"
                    >
                        Opening Hymn Number
                    </label>
                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.openingHymn.number ?? ""}
                        aria-describedby="openingHymnNumber-error"
                        aria-invalid={Boolean(
                            state.errors?.openingHymnNumber?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError
                        name="openingHymnNumber"
                        errors={state.errors}
                    />
                </div>

                <div>
                    <label
                        htmlFor="openingHymnTitle"
                        className="block text-sm font-medium"
                    >
                        Opening Hymn Title
                    </label>
                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        required
                        defaultValue={meeting?.openingHymn.title ?? ""}
                        aria-describedby="openingHymnTitle-error"
                        aria-invalid={Boolean(
                            state.errors?.openingHymnTitle?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError
                        name="openingHymnTitle"
                        errors={state.errors}
                    />
                </div>

                <div>
                    <label
                        htmlFor="openingPrayer"
                        className="block text-sm font-medium"
                    >
                        Opening Prayer
                    </label>
                    <input
                        id="openingPrayer"
                        name="openingPrayer"
                        required
                        defaultValue={meeting?.openingPrayer ?? ""}
                        aria-describedby="openingPrayer-error"
                        aria-invalid={Boolean(
                            state.errors?.openingPrayer?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="openingPrayer" errors={state.errors} />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Ward and Stake Business
                </h2>

                <div>
                    <label
                        htmlFor="wardBusiness"
                        className="block text-sm font-medium"
                    >
                        Ward Business
                    </label>
                    <input
                        id="wardBusiness"
                        name="wardBusiness"
                        defaultValue={
                            meeting?.wardBusiness?.[0]?.description ?? ""
                        }
                        aria-describedby="wardBusiness-error"
                        aria-invalid={Boolean(
                            state.errors?.wardBusiness?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="wardBusiness" errors={state.errors} />

                    {meeting?.wardBusiness?.slice(1).map((item, index) => (
                        <input
                            key={index}
                            type="hidden"
                            name="wardBusiness"
                            value={item.description}
                        />
                    ))}
                </div>

                <div>
                    <input
                        id="stakeBusiness"
                        type="checkbox"
                        name="stakeBusiness"
                        defaultChecked={meeting?.stakeBusiness ?? false}
                        aria-describedby="stakeBusiness-error"
                        className="rounded border-gray-300"
                    />
                    <label
                        htmlFor="stakeBusiness"
                        className="ml-2 text-sm font-medium"
                    >
                        Stake business will be conducted
                    </label>
                    <FieldError name="stakeBusiness" errors={state.errors} />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Sacrament
                </h2>

                <div>
                    <label
                        htmlFor="sacramentHymnNumber"
                        className="block text-sm font-medium"
                    >
                        Sacrament Hymn Number
                    </label>
                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.sacramentHymn.number ?? ""}
                        aria-describedby="sacramentHymnNumber-error"
                        aria-invalid={Boolean(
                            state.errors?.sacramentHymnNumber?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError
                        name="sacramentHymnNumber"
                        errors={state.errors}
                    />
                </div>

                <div>
                    <label
                        htmlFor="sacramentHymnTitle"
                        className="block text-sm font-medium"
                    >
                        Sacrament Hymn Title
                    </label>
                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        required
                        defaultValue={meeting?.sacramentHymn.title ?? ""}
                        aria-describedby="sacramentHymnTitle-error"
                        aria-invalid={Boolean(
                            state.errors?.sacramentHymnTitle?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError
                        name="sacramentHymnTitle"
                        errors={state.errors}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Speakers and Musical Numbers
                </h2>

                <div>
                    <label
                        htmlFor="speakerName"
                        className="block text-sm font-medium"
                    >
                        Speaker or Performer
                    </label>
                    <input
                        id="speakerName"
                        name="speakerName"
                        required
                        defaultValue={meeting?.speakers?.[0]?.name ?? ""}
                        aria-describedby="speakerName-error"
                        aria-invalid={Boolean(
                            state.errors?.speakerName?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="speakerName" errors={state.errors} />
                </div>

                <div>
                    <label
                        htmlFor="speakerTopic"
                        className="block text-sm font-medium"
                    >
                        Topic or Musical Number
                    </label>
                    <input
                        id="speakerTopic"
                        name="speakerTopic"
                        required
                        defaultValue={meeting?.speakers?.[0]?.topic ?? ""}
                        aria-describedby="speakerTopic-error"
                        aria-invalid={Boolean(
                            state.errors?.speakerTopic?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="speakerTopic" errors={state.errors} />
                </div>

                <div>
                    <label
                        htmlFor="speakerType"
                        className="block text-sm font-medium"
                    >
                        Participant Type
                    </label>
                    <select
                        id="speakerType"
                        name="speakerType"
                        defaultValue={meeting?.speakers?.[0]?.type ?? "speaker"}
                        aria-describedby="speakerType-error"
                        aria-invalid={Boolean(
                            state.errors?.speakerType?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    >
                        <option value="speaker">Speaker</option>
                        <option value="musical-number">
                            Musical Number
                        </option>
                    </select>
                    <FieldError name="speakerType" errors={state.errors} />
                </div>

                {meeting?.speakers?.slice(1).map((speaker, index) => (
                    <div key={index}>
                        <input
                            type="hidden"
                            name="speakerName"
                            value={speaker.name}
                        />
                        <input
                            type="hidden"
                            name="speakerTopic"
                            value={speaker.topic}
                        />
                        <input
                            type="hidden"
                            name="speakerType"
                            value={speaker.type}
                        />
                    </div>
                ))}
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Closing</h2>

                <div>
                    <label
                        htmlFor="closingHymnNumber"
                        className="block text-sm font-medium"
                    >
                        Closing Hymn Number
                    </label>
                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.closingHymn.number ?? ""}
                        aria-describedby="closingHymnNumber-error"
                        aria-invalid={Boolean(
                            state.errors?.closingHymnNumber?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError
                        name="closingHymnNumber"
                        errors={state.errors}
                    />
                </div>

                <div>
                    <label
                        htmlFor="closingHymnTitle"
                        className="block text-sm font-medium"
                    >
                        Closing Hymn Title
                    </label>
                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        required
                        defaultValue={meeting?.closingHymn.title ?? ""}
                        aria-describedby="closingHymnTitle-error"
                        aria-invalid={Boolean(
                            state.errors?.closingHymnTitle?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError
                        name="closingHymnTitle"
                        errors={state.errors}
                    />
                </div>

                <div>
                    <label
                        htmlFor="closingPrayer"
                        className="block text-sm font-medium"
                    >
                        Closing Prayer
                    </label>
                    <input
                        id="closingPrayer"
                        name="closingPrayer"
                        required
                        defaultValue={meeting?.closingPrayer ?? ""}
                        aria-describedby="closingPrayer-error"
                        aria-invalid={Boolean(
                            state.errors?.closingPrayer?.length
                        )}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    <FieldError name="closingPrayer" errors={state.errors} />
                </div>
            </section>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending
                    ? meeting
                        ? "Updating Meeting..."
                        : "Creating Meeting..."
                    : meeting
                        ? "Update Meeting"
                        : "Create Meeting"}
            </button>
        </form>
    );
}
