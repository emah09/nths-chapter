import Link from "next/link";
import { EventCard, MeetingCard, DateLabel } from "@/components/content";
import chapter from "@/content/chapter.json";
import { getAnnouncements, getEvents, getMeetings } from "@/lib/content";

// Recompute the chapter's local date on each request.
export const dynamic = "force-dynamic";

export default function HomePage() {
  const announcements = getAnnouncements().slice(0, 3);
  const [meeting] = getMeetings().upcoming;
  const events = getEvents().upcoming.slice(0, 3);

  return <>
    <section className="hero">
      <div className="site-width py-12 sm:py-16 lg:py-20">
        <p className="mb-4 text-sm font-semibold tracking-wider text-gold">National Technical Honor Society</p>
        <h1 className="max-w-3xl sm:text-6xl">{chapter.name}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">{chapter.welcome}</p>
      </div>
    </section>
    <div className="site-width space-y-10 py-9 sm:space-y-12 sm:py-12">
      <div className="grid items-start gap-9 lg:grid-cols-[1fr_0.8fr]">
        <section aria-labelledby="news-title">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="news-title" className="section-title">Latest announcements</h2>
            <Link href="/announcements" className="text-link text-sm">All announcements</Link>
          </div>
          {announcements.length ? <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {announcements.map((item) => <li key={item.id} className="px-5 py-4">
              <h3><Link href={`/announcements#${item.id}`} className="hover:underline underline-offset-4">{item.title}</Link></h3>
              <p className="meta mt-1"><DateLabel date={item.date} /></p>
              <p className="copy mt-2 line-clamp-2">{item.body.split(/\n\s*\n/, 1)[0]}</p>
            </li>)}
          </ul> : <p className="copy">There are no announcements yet.</p>}
        </section>
        <section aria-labelledby="meeting-title">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="meeting-title" className="section-title">Next meeting</h2>
            <Link href="/meetings" className="text-link text-sm">All meetings</Link>
          </div>
          {meeting ? <MeetingCard item={meeting} featured /> : <p className="copy">Check back for the next meeting date.</p>}
        </section>
      </div>
      <section aria-labelledby="events-title">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="events-title" className="section-title">Upcoming events</h2>
          <Link href="/events" className="text-link text-sm">All events</Link>
        </div>
        {events.length ? <div className="grid gap-4 md:grid-cols-3">
          {events.map((item) => <EventCard key={`${item.date}-${item.title}`} item={item} />)}
        </div> : <p className="copy">There are no upcoming events on the calendar.</p>}
      </section>
    </div>
  </>;
}
