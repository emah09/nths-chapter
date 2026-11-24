import Image from "next/image";
import type { ReactNode } from "react";
import type { Announcement, Event, Meeting, Opportunity, Picture } from "@/lib/content";
import { formatDate } from "@/lib/dates";

export function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return <div className="page-intro"><h1>{title}</h1><p>{children}</p></div>;
}

export function DateLabel({ date, time }: { date: string; time?: string }) {
  return <time dateTime={time ? `${date}T${time}` : date}>{formatDate(date, time)}</time>;
}

export function ContentImage({ image, imageAlt, fallback }: Picture & { fallback: string }) {
  if (!image?.startsWith("/images/")) return null;
  return (
    <div className="relative mt-4 aspect-video max-w-xl overflow-hidden rounded-lg bg-tint">
      <Image src={image} alt={imageAlt ?? fallback} fill className="object-contain"
        sizes="(max-width: 640px) 90vw, 576px" />
    </div>
  );
}

export function MarkdownBody({ body }: { body: string }) {
  return <div className="copy mt-3 space-y-3">
    {body.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- "))) {
        return <ul key={index} className="list-disc space-y-1 pl-5">
          {lines.map((line, item) => <li key={item}>{line.slice(2)}</li>)}
        </ul>;
      }
      return <p key={index}>{lines.join(" ")}</p>;
    })}
  </div>;
}

export function AnnouncementCard({ item }: { item: Announcement }) {
  return <article id={item.id} className="card scroll-mt-4">
    <p className="meta"><DateLabel date={item.date} /></p>
    <h2 className="mt-2">{item.title}</h2>
    <MarkdownBody body={item.body} />
    <ContentImage {...item} fallback={item.title} />
  </article>;
}

export function MeetingCard({ item, featured = false }: { item: Meeting; featured?: boolean }) {
  return <article className={`card ${featured ? "featured" : ""}`}>
    <h3>{item.title}</h3>
    <p className="meta mt-2"><DateLabel date={item.date} time={item.time} /> · {item.location}</p>
    <p className="mt-4 font-semibold">Agenda</p>
    <ul className="copy mt-1 list-disc space-y-1 pl-5">
      {item.agenda.map((entry, index) => <li key={index}>{entry}</li>)}
    </ul>
  </article>;
}

export function EventCard({ item }: { item: Event }) {
  return <article className="card">
    <h3>{item.title}</h3>
    <p className="meta mt-2"><DateLabel date={item.date} time={item.time} /> · {item.location}</p>
    <p className="copy mt-3">{item.description}</p>
    <ContentImage {...item} fallback={item.title} />
  </article>;
}

export function VolunteerCard({ item }: { item: Opportunity }) {
  const signup = item.signup ?? "";
  return <article className="card">
    <h2>{item.title}</h2>
    <p className="meta mt-2"><DateLabel date={item.date} /> · {item.location}</p>
    <p className="copy mt-3">{item.description}</p>
    <p className="mt-3 font-semibold">{item.hours} {item.hours === 1 ? "hour" : "hours"} available</p>
    {/^https?:\/\//i.test(signup) && <a className="text-link mt-3 inline-block" href={signup}
      aria-label={`Sign up for ${item.title}`}>Sign up</a>}
  </article>;
}
