import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-800">
            Welcome
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Sacrament Meeting Planner
          </h1>

          <p className="mt-5 leading-7 text-gray-600">
            A simple place to organize sacrament meeting programs and help
            members view upcoming and past meetings.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-lg bg-blue-900 px-5 py-3 font-medium text-white hover:bg-blue-800"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-blue-900 px-5 py-3 font-medium text-blue-900 hover:bg-blue-50"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="relative min-h-64 overflow-hidden rounded-xl">
          <Image
            src="/meeting-placeholder.svg"
            alt="Illustration representing a sacrament meeting program"
            width={600}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Plan Meetings
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Organize hymns, prayers, speakers, announcements, and other
            meeting details.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            View Programs
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Find meeting information in one organized and easy-to-read place.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Print Programs
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Print meeting programs to share with ward and branch members.
          </p>
        </div>
      </section>
    </div>
  );
}
