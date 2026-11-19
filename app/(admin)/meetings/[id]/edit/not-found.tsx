import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto mt-16 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
                Meeting Not Found
            </h1>

            <p className="mt-3 text-gray-600">
                The meeting you are looking for does not exist.
            </p>

            <div className="mt-6">
                <Link
                    href="/meetings"
                    className="inline-block rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                    Back to Meetings
                </Link>
            </div>
        </main>
    );
}