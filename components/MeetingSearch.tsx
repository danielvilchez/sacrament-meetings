
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        params.set("page", "1");

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex-1">
            <label
                htmlFor="meeting-search"
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                Search meetings
            </label>

            <input
                id="meeting-search"
                type="search"
                placeholder="Search by presiding, conducting, type, or speaker..."
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(event) => handleSearch(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}
