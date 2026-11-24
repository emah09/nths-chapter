import type { Metadata } from "next";
import { ContentImage, PageIntro } from "@/components/content";
import chapter from "@/content/chapter.json";
import { getOfficers } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "Learn about NTHS, chapter membership, and the officers who lead the chapter." };

export default function AboutPage() {
  return <div className="site-width py-9 sm:py-12">
    <PageIntro title="About">{chapter.name}</PageIntro>
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-7">
        <section>
          <h2 className="section-title mb-2">What is NTHS?</h2>
          <p className="copy">{chapter.about}</p>
        </section>
        <section>
          <h2 className="section-title mb-2">Our mission</h2>
          <p className="copy">{chapter.mission}</p>
        </section>
        <section>
          <h2 className="section-title mb-2">Membership requirements</h2>
          <ul className="copy list-disc space-y-1 pl-5">
            {chapter.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
          </ul>
        </section>
      </div>
      <div className="space-y-6">
        <section className="card">
          <h2 className="section-title mb-3">Chapter officers</h2>
          <ul className="divide-y divide-line">
            {getOfficers().map((officer) => <li key={officer.name} className="py-3">
              <h3>{officer.name}</h3>
              <p className="copy">{officer.role}</p>
              <ContentImage {...officer} fallback={officer.name} />
            </li>)}
          </ul>
        </section>
        <section className="card">
          <h2 className="section-title mb-2">Contact</h2>
          <a className="text-link" href={`mailto:${chapter.email}`}>{chapter.email}</a>
        </section>
      </div>
    </div>
  </div>;
}
