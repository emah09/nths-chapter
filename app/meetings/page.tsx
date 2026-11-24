import type { Metadata } from "next";
import { MeetingCard, PageIntro } from "@/components/content";
import { getMeetings } from "@/lib/content";

export const metadata: Metadata = { title: "Meetings", description: "Find NTHS meeting dates, locations, and agendas." };
export const dynamic = "force-dynamic";

export default function MeetingsPage() {
  const { upcoming, past } = getMeetings();
  const [next, ...later] = upcoming;

  return <div className="site-width py-9 sm:py-12">
    <PageIntro title="Meetings">Check the agenda and find out when and where we’re meeting.</PageIntro>
    <div className="max-w-3xl space-y-8">
      <section aria-labelledby="next-title">
        <h2 id="next-title" className="section-title mb-4">Next meeting</h2>
        {next ? <MeetingCard item={next} featured /> : <p className="copy">Check back for the next meeting date.</p>}
      </section>
      {later.length > 0 && <section aria-labelledby="later-title">
        <h2 id="later-title" className="section-title mb-4">Future meetings</h2>
        <div className="space-y-4">{later.map((item) => <MeetingCard key={`${item.date}-${item.title}`} item={item} />)}</div>
      </section>}
      <details className="archive">
        <summary><h2 className="inline text-base">Past meetings ({past.length})</h2></summary>
        <div className="mt-4 space-y-4">
          {past.map((item) => <MeetingCard key={`${item.date}-${item.title}`} item={item} />)}
          {!past.length && <p className="copy">There are no past meetings yet.</p>}
        </div>
      </details>
    </div>
  </div>;
}
