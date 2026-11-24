import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import meetings from "@/content/meetings.json";
import events from "@/content/events.json";
import volunteer from "@/content/volunteer.json";
import officers from "@/content/officers.json";
import { byDate, splitByDate } from "./dates";

export type Picture = { image?: string; imageAlt?: string };
export type Announcement = Picture & { id: string; title: string; date: string; body: string };
export type Meeting = { title: string; date: string; time: string; location: string; agenda: string[] };
export type Event = Picture & { title: string; date: string; time: string; location: string; description: string };
export type Opportunity = { title: string; date: string; location: string; hours: number; description: string; signup?: string };
export type Officer = Picture & { name: string; role: string };

export const getMeetings = () => splitByDate<Meeting>(meetings);
export const getEvents = () => splitByDate<Event>(events);
export const getVolunteer = () => splitByDate<Opportunity>(volunteer).upcoming;
export const getOfficers = (): Officer[] => officers;

export function getAnnouncements() {
  const folder = path.join(process.cwd(), "content", "announcements");
  const posts = readdirSync(folder).filter((file) => file.endsWith(".md")).map((file): Announcement => {
    const source = readFileSync(path.join(folder, file), "utf8").replace(/\r\n/g, "\n");
    const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
    if (!match) throw new Error(`${file}: add a frontmatter block at the top.`);

    // The chapter format uses one plain key/value per line.
    const fields: Record<string, string> = {};
    for (const line of match[1].split("\n")) {
      const entry = /^(title|date|image|imageAlt):\s*(.*?)\s*$/.exec(line);
      if (entry) fields[entry[1]] = entry[2].replace(/^(["'])(.*)\1$/, "$2");
    }
    if (!fields.title || !/^\d{4}-\d{2}-\d{2}$/.test(fields.date ?? "")) {
      throw new Error(`${file}: add a title and a YYYY-MM-DD date.`);
    }
    return {
      id: file, title: fields.title, date: fields.date,
      image: fields.image, imageAlt: fields.imageAlt, body: match[2].trim(),
    };
  });
  return byDate(posts).reverse();
}
