export default function MeetingsLoading() {
    return (
        <div
            className="flex min-h-[300px] flex-col items-center justify-center gap-4"
            role="status"
            aria-live="polite"
        >
            <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900"
                aria-hidden="true"
            />

            <p className="text-lg font-medium text-gray-700">
                Loading sacrament meetings...
            </p>
        </div>
    );
}
