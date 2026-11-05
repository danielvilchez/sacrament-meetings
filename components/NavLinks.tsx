"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/current", label: "Current Meeting" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Main navigation"
            className="border-b border-gray-200 bg-gray-50"
        >
            <div className="mx-auto flex max-w-6xl flex-wrap gap-6 px-6 py-3">
                {links.map((link) => {
                    const isActive =
                        pathname === link.href ||
                        (link.href === "/meetings" &&
                            pathname.startsWith("/meetings/") &&
                            pathname !== "/meetings/current");

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`text-sm font-medium transition-colors ${isActive
                                ? "text-blue-900 underline underline-offset-4"
                                : "text-gray-600 hover:text-blue-900"
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
