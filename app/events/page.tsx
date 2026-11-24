import type { Metadata } from "next";
import { EventCard, PageIntro } from "@/components/content";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = { title: "Events", description: "Explore the NTHS chapter event calendar and past activities." };
export const dynamic = "force-dynamic";

export default function EventsPage() {
  const { upcoming, past } = getEvents();

  return <div className="site-width py-9 sm:py-12">
    <PageIntro title="Events">See what’s coming up on the chapter calendar.</PageIntro>
    <div className="space-y-8">
      <section aria-labelledby="upcoming-title">
        <h2 id="upcoming-title" className="section-title mb-4">Upcoming events</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => <EventCard key={`${item.date}-${item.title}`} item={item} />)}
        </div>
        {!upcoming.length && <p className="copy">There are no upcoming events on the calendar.</p>}
      </section>
      {past.length > 0 && <details className="archive">
        <summary><h2 className="inline text-base">Past events ({past.length})</h2></summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {past.map((item) => <EventCard key={`${item.date}-${item.title}`} item={item} />)}
        </div>
      </details>}
    </div>
  </div>;
}
