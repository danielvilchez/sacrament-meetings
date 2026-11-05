import type { ReactNode } from "react";

export default function MeetingsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <section className="space-y-6">
            {children}
        </section>
    );
}
