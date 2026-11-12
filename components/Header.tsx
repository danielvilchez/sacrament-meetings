
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
                <div>
                    <Link
                        href="/"
                        className="text-xl font-bold text-blue-900"
                    >
                        Sacrament Meeting Planner
                    </Link>

                    <p className="mt-1 text-sm text-gray-600">
                        My Ward
                    </p>
                </div>

                <p className="text-sm text-gray-600">
                    Meeting programs for ward and branch members
                </p>
            </div>
        </header>
    );
}
