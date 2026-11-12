import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "@/components/PrintButton";

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    return (
        <article className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm print:border-0 print:shadow-none">
            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-900">
                    Sacrament Meeting Program
                </p>

                <h1 className="mt-2 text-2xl font-bold text-gray-900">
                    {meeting.meetingType} Meeting
                </h1>

                <p className="mt-2 text-gray-600">{meeting.date}</p>
            </div>

            <div className="mt-8 grid gap-3 border-y border-gray-200 py-4 sm:grid-cols-2">
                <p><strong>Presiding:</strong> {meeting.presiding}</p>
                <p><strong>Conducting:</strong> {meeting.conducting}</p>
            </div>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="mt-6">
                    <h2 className="font-bold text-gray-900">Announcements</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                        {meeting.announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="mt-6 space-y-5">
                <div>
                    <h2 className="font-bold text-gray-900">Opening Hymn</h2>
                    <p className="mt-1 text-gray-700">
                        Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-gray-900">Opening Prayer</h2>
                    <p className="mt-1 text-gray-700">{meeting.openingPrayer}</p>
                </div>

                {meeting.wardBusiness.length > 0 && (
                    <div>
                        <h2 className="font-bold text-gray-900">Ward Business</h2>
                        <ul className="mt-1 list-disc space-y-1 pl-6 text-gray-700">
                            {meeting.wardBusiness.map((item, index) => (
                                <li key={index}>{item.description}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {meeting.stakeBusiness && (
                    <div>
                        <h2 className="font-bold text-gray-900">Stake Business</h2>
                        <p className="mt-1 text-gray-700">
                            Stake business will be conducted during this meeting.
                        </p>
                    </div>
                )}

                <div>
                    <h2 className="font-bold text-gray-900">Sacrament Hymn</h2>
                    <p className="mt-1 text-gray-700">
                        Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-gray-900">Speakers and Musical Numbers</h2>
                    <ul className="mt-2 space-y-3">
                        {meeting.speakers.map((speaker, index) => (
                            <li key={index} className="text-gray-700">
                                <strong>{speaker.name}</strong>
                                <span className="block text-sm text-gray-500">
                                    {speaker.type === "speaker" ? "Topic" : "Musical Number"}: {speaker.topic}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-gray-900">Closing Hymn</h2>
                    <p className="mt-1 text-gray-700">
                        Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-gray-900">Closing Prayer</h2>
                    <p className="mt-1 text-gray-700">{meeting.closingPrayer}</p>
                </div>
            </section>

            <div className="mt-8 text-center print:hidden">
                <PrintButton />
            </div>
        </article>
    );
}
