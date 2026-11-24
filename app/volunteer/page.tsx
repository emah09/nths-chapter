import type { Metadata } from "next";
import { PageIntro, VolunteerCard } from "@/components/content";
import { getVolunteer } from "@/lib/content";

export const metadata: Metadata = { title: "Volunteer", description: "Find NTHS service opportunities and sign-up details." };
export const dynamic = "force-dynamic";

export default function VolunteerPage() {
  const opportunities = getVolunteer();
  return <div className="site-width py-9 sm:py-12">
    <PageIntro title="Volunteer">Find ways to help out and earn service hours.</PageIntro>
    <div className="grid gap-4 sm:grid-cols-2">
      {opportunities.map((item) => <VolunteerCard key={`${item.date}-${item.title}`} item={item} />)}
    </div>
    {!opportunities.length && <p className="copy">Check back for new volunteer opportunities.</p>}
  </div>;
}
