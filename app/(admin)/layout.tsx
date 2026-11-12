
import Link from "next/link";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="border-b bg-white px-6 py-4">
                <nav className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link
                        href="/"
                        className="text-lg font-bold text-gray-900"
                    >
                        Sacrament Meeting Planner
                    </Link>

                    <Link
                        href="/meetings"
                        className="text-sm font-medium text-blue-900 hover:underline"
                    >
                        View Meetings
                    </Link>
                </nav>
            </header>

            <div className="mx-auto max-w-7xl px-6 py-8">
                {children}
            </div>
        </div>
    );
}
