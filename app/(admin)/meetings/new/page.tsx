import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
    return (
        <main className="mx-auto max-w-3xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Create Meeting
                </h1>
                <p className="mt-2 text-gray-600">
                    Complete the form to create a new sacrament meeting program.
                </p>
            </div>

            <MeetingForm />
        </main>
    );
}
