
import Link from "next/link";
import { signOut } from "@/auth";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    async function logout() {
        "use server";
        await signOut({ redirectTo: "/meetings" });
    }

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

                    <div className="flex items-center gap-6">
                        <Link
                            href="/meetings"
                            className="text-sm font-medium text-blue-900 hover:underline"
                        >
                            View Meetings
                        </Link>

                        <form action={logout}>
                            <button
                                type="submit"
                                className="text-sm font-medium text-red-700 hover:underline"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </nav>
            </header>

            <div className="mx-auto max-w-7xl px-6 py-8">
                {children}
            </div>
        </div>
    );
}
