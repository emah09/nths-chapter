import type { Metadata } from "next";
import { AnnouncementCard, PageIntro } from "@/components/content";
import { getAnnouncements } from "@/lib/content";

export const metadata: Metadata = { title: "Announcements", description: "Read the latest NTHS chapter news and member reminders." };

export default function AnnouncementsPage() {
  const announcements = getAnnouncements();
  return <div className="site-width py-9 sm:py-12">
    <PageIntro title="Announcements">Chapter news, deadlines, and reminders for members.</PageIntro>
    <div className="max-w-3xl space-y-4">
      {announcements.map((item) => <AnnouncementCard key={item.id} item={item} />)}
      {!announcements.length && <p className="copy">There are no announcements yet.</p>}
    </div>
  </div>;
}
